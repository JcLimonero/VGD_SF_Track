#!/usr/bin/env bash
# Prueba de punta a punta del proxy /api: nginx real + servicio de acceso real
# + una API falsa que repite lo que recibe. Necesita Docker.
#
#   bash nginx/test-proxy.sh
#
# Comprueba que sin sesión no pasa nada, que cada perfil solo llega a lo suyo,
# que los trucos de ruta no esquivan la regla, que el token de proveedor lo
# pone siempre el servidor y que la sesión del portal no llega a la API.
set -u
cd "$(dirname "$0")/.."

NET=vgdproxytest
PORT=${TEST_PORT:-18080}
TOKEN=TOKEN-DE-PRUEBA-DEL-SERVIDOR
BASE=http://127.0.0.1:$PORT
fail=0

cleanup() {
  docker rm -f ${NET}-nginx ${NET}-auth ${NET}-api >/dev/null 2>&1
  docker network rm $NET >/dev/null 2>&1
}
trap cleanup EXIT
cleanup

docker network create $NET >/dev/null || exit 1
docker build -q -t ${NET}-auth ./auth >/dev/null || exit 1

docker run -d --name ${NET}-api --network $NET --network-alias fakeapi node:22-alpine node -e "
require('http').createServer((q,s)=>{
  s.setHeader('content-type','application/json');
  if (q.url.includes('forzar401')) { s.statusCode=401; return s.end(JSON.stringify({message:'invalid provider token'})); }
  if (q.url.includes('filtrar')) s.setHeader('X-Provider-Token', q.headers['x-provider-token']||'');
  s.end(JSON.stringify({method:q.method,url:q.url,token:q.headers['x-provider-token']||null,auth:q.headers['authorization']||null}))
}).listen(4000)" >/dev/null || exit 1
docker run -d --name ${NET}-auth --network $NET --network-alias auth \
  -e AUTH_SECRET=$(printf 'k%.0s' {1..40}) -e PASSWORD_CRABI=pc -e PASSWORD_SALES_FORCE=ps \
  ${NET}-auth >/dev/null || exit 1
docker run -d --name ${NET}-nginx --network $NET -p $PORT:80 \
  -e API_PROVIDER_TOKEN=$TOKEN -e API_UPSTREAM=http://fakeapi:4000 \
  -v "$PWD/nginx/default.conf.template:/etc/nginx/templates/default.conf.template:ro" \
  -v "$PWD/nginx/docker-entrypoint.d/10-validate-env.sh:/docker-entrypoint.d/10-validate-env.sh:ro" \
  nginx:1.27-alpine >/dev/null || exit 1

for _ in $(seq 1 30); do
  curl -s -o /dev/null "$BASE/auth/health" && break
  sleep 1
done

login() {
  curl -s -X POST -H 'Content-Type: application/json' \
    -d "{\"profile\":\"$1\",\"password\":\"$2\"}" $BASE/auth/login |
    sed -n 's/.*"token":"\([^"]*\)".*/\1/p'
}
CRABI=$(login crabi pc)
SALES=$(login sales_force ps)
[ -n "$CRABI" ] && [ -n "$SALES" ] || { echo "No se pudo iniciar sesión"; exit 1; }

# esperado <código> <descripción> <token> <ruta> [encabezado extra] [método]
esperado() {
  local want=$1 label=$2 tk=$3 uri=$4 extra=${5:-} method=${6:-GET} got
  local args=(-s -o /tmp/proxy-out -w '%{http_code}' -X "$method")
  [ -n "$tk" ] && args+=(-H "Authorization: Bearer $tk")
  [ -n "$extra" ] && args+=(-H "$extra")
  got=$(curl "${args[@]}" "$BASE$uri")
  if [ "$got" = "$want" ]; then
    echo "  ok   $label"
  else
    echo "  FALLA $label  (esperaba $want, dio $got)"
    fail=1
  fi
}

echo "Sin sesión"
esperado 401 "sin token" "" /api/vgd/dwh
esperado 401 "token falso" a.b.c /api/vgd/dwh

echo "SALES FORCE"
esperado 200 "puede usar dwh" "$SALES" /api/vgd/dwh
esperado 200 "puede usar inventario con id" "$SALES" /api/vgd/inventoryfilter/7
esperado 403 "no puede usar Crabi" "$SALES" /api/vgd/orderscrabi

echo "CRABI"
esperado 200 "puede usar sus órdenes" "$CRABI" /api/vgd/orderscrabi/3
esperado 200 "puede usar agencias" "$CRABI" /api/vgd/agenciesfilter
esperado 403 "no puede usar dwh" "$CRABI" /api/vgd/dwh

echo "Trucos de ruta (SALES FORCE hacia Crabi)"
for uri in /api/vgd/OrdersCrabi /api/vgd/%6frderscrabi /api/vgd/orderscrabi%2f1 \
  /api/vgd//orderscrabi /api/vgd/x/../orderscrabi /api/vgd/./orderscrabi \
  '/api/vgd/orderscrabi;a' /api/%76gd/orderscrabi '/api/vgd/orderscrabi/?x=1' \
  /api/vgd/orderscrabi/; do
  esperado 403 "bloquea $uri" "$SALES" "$uri"
done
esperado 400 "bloquea %00" "$SALES" /api/vgd/orderscrabi%00

echo "Trucos de ruta (CRABI hacia otros recursos)"
for uri in /api/vgd/orderscrabi/../dwh /api/vgd/%64wh /api/vgd/orderscrabi%2f..%2fdwh; do
  esperado 403 "bloquea $uri" "$CRABI" "$uri"
done

echo "Lo que ve la API"
seen=$(curl -s -H "Authorization: Bearer $SALES" -H 'X-Provider-Token: ROBADO' "$BASE/api/vgd/dwh?x=1")
case "$seen" in *"\"token\":\"$TOKEN\""*) echo "  ok   el token lo pone el servidor y pisa el del cliente" ;;
  *) echo "  FALLA el token que llegó a la API no es el del servidor: $seen"; fail=1 ;; esac
case "$seen" in *'"auth":null'*) echo "  ok   la sesión del portal no llega a la API" ;;
  *) echo "  FALLA la sesión del portal llegó a la API: $seen"; fail=1 ;; esac
case "$seen" in *'"url":"/vgd/dwh?x=1"'*) echo "  ok   se quita el prefijo /api y se conserva la consulta" ;;
  *) echo "  FALLA ruta inesperada en la API: $seen"; fail=1 ;; esac


echo "Métodos: solo GET y PUT, y PUT solo donde el portal escribe"
esperado 200 "SALES FORCE hace PUT en inventario" "$SALES" /api/vgd/inventoryfilter/7 "" PUT
esperado 200 "CRABI hace PUT en sus órdenes" "$CRABI" /api/vgd/orderscrabi/3 "" PUT
esperado 403 "SALES FORCE no hace POST en inventario" "$SALES" /api/vgd/inventoryfilter "" POST
esperado 403 "SALES FORCE no hace DELETE" "$SALES" /api/vgd/inventoryfilter/7 "" DELETE
esperado 403 "SALES FORCE no hace PATCH" "$SALES" /api/vgd/inventoryfilter/7 "" PATCH
esperado 403 "SALES FORCE no escribe en dwh" "$SALES" /api/vgd/dwh "" PUT
esperado 403 "SALES FORCE no escribe en Honda SF" "$SALES" /api/vgd/portalhondaleads "" PUT
esperado 403 "CRABI no hace DELETE" "$CRABI" /api/vgd/orderscrabi/3 "" DELETE
esperado 403 "CRABI no hace POST" "$CRABI" /api/vgd/orderscrabi "" POST
esperado 403 "CRABI no escribe en agencias" "$CRABI" /api/vgd/agenciesfilter "" PUT

echo "Errores y encabezados"
body=$(curl -s "$BASE/api/vgd/dwh")
case "$body" in *session_expired*) echo "  ok   la sesión vencida responde session_expired" ;;
  *) echo "  FALLA sin sesión no responde session_expired: $body"; fail=1 ;; esac
code=$(curl -s -o /tmp/proxy-out -w '%{http_code}' -H "Authorization: Bearer $SALES" "$BASE/api/vgd/forzar401")
body=$(cat /tmp/proxy-out)
case "$code$body" in 401*"invalid provider token"*) echo "  ok   un 401 de la API pasa tal cual (no es sesión vencida)" ;;
  *) echo "  FALLA el 401 de la API se alteró: $code $body"; fail=1 ;; esac
hdrs=$(curl -s -D - -o /dev/null -H "Authorization: Bearer $SALES" "$BASE/api/vgd/filtrar")
case "$hdrs" in *X-Provider-Token*|*x-provider-token*) echo "  FALLA la respuesta devuelve el token al cliente"; fail=1 ;;
  *) echo "  ok   el token no vuelve al cliente en las respuestas" ;; esac
case "$hdrs" in *no-store*) echo "  ok   /api no se guarda en caché" ;; *) echo "  FALLA /api sin no-store"; fail=1 ;; esac

echo "Validación de variables de entorno"
VALIDATE=nginx/docker-entrypoint.d/10-validate-env.sh
valida() {
  local want=$1 label=$2 token=$3 up=$4 got
  API_PROVIDER_TOKEN=$token API_UPSTREAM=$up sh $VALIDATE >/dev/null 2>&1; got=$?
  if { [ "$want" = ok ] && [ $got = 0 ]; } || { [ "$want" = no ] && [ $got != 0 ]; }; then
    echo "  ok   $label"
  else echo "  FALLA $label"; fail=1; fi
}
valida ok "valores correctos" "abc-123_DEF.x~" "https://apisvanguardia.com:400"
valida no "token con comillas" 'abc"; add_header X-X y;' "https://apisvanguardia.com:400"
valida no "token con punto y coma" "abc;def" "https://apisvanguardia.com:400"
valida no "token con \$" 'abc$uri' "https://apisvanguardia.com:400"
valida no "token con salto de línea" "$(printf 'abc\ndef')" "https://apisvanguardia.com:400"
valida no "token vacío" "" "https://apisvanguardia.com:400"
valida no "upstream con ruta" "abc" "https://apisvanguardia.com:400/x"
valida no "upstream con esquema raro" "abc" "ftp://apisvanguardia.com"
valida no "upstream con punto y coma" "abc" "https://a.com;x"

echo "IP real del cliente (el límite de intentos no se salta con X-Forwarded-For)"
login_ip() { # <XFF> <contraseña>
  curl -s -o /dev/null -w '%{http_code}' -X POST -H 'Content-Type: application/json' \
    -H "X-Forwarded-For: $1" -d "{\"profile\":\"crabi\",\"password\":\"$2\"}" "$BASE/auth/login"
}
# Se simula a Traefik: la IP real queda al final de la cadena; lo de la izquierda lo escribe el atacante
for i in 1 2 3 4 5; do login_ip "10.0.0.$i, 203.0.113.50" mala >/dev/null; done
got=$(login_ip "10.9.9.9, 203.0.113.50" pc)
[ "$got" = 429 ] && echo "  ok   mismo origen real con X-Forwarded-For distinto: bloqueado" || { echo "  FALLA el límite se saltó con X-Forwarded-For ($got)"; fail=1; }
got=$(login_ip "10.9.9.9, 203.0.113.77" pc)
[ "$got" = 200 ] && echo "  ok   otro origen real no se ve afectado" || { echo "  FALLA otro origen quedó bloqueado ($got)"; fail=1; }

echo "Rutas internas"
esperado 404 "/auth/verify no se alcanza desde fuera" "$SALES" /auth/verify "X-Original-URI: /api/vgd/dwh"

[ $fail = 0 ] && echo "Todo bien" || echo "HAY FALLAS"
exit $fail
