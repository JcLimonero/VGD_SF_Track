#!/bin/sh
# Se ejecuta antes de arrancar nginx (como root). Prepara la carpeta de logs
# diarios y lanza el borrado de los que pasen de LOG_RETENTION_DAYS (15 por
# defecto). Docker solo rota por tamaño, no por días: por eso se hace aquí.
set -eu

DIR=/var/log/nginx/portal
DAYS=${LOG_RETENTION_DAYS:-15}
INTERVAL=${LOG_PURGE_INTERVAL_SECONDS:-21600}

fail() { echo "ERROR: $1" >&2; exit 1; }

case "$DAYS" in ''|*[!0-9]*) fail "LOG_RETENTION_DAYS debe ser un entero" ;; esac
case "$INTERVAL" in ''|*[!0-9]*) fail "LOG_PURGE_INTERVAL_SECONDS debe ser un entero" ;; esac
[ "$DAYS" -ge 1 ] || fail "LOG_RETENTION_DAYS debe ser al menos 1"
[ "$INTERVAL" -ge 1 ] || fail "LOG_PURGE_INTERVAL_SECONDS debe ser al menos 1"

mkdir -p "$DIR"
chown nginx:nginx "$DIR"

# `find -mtime +N` borra lo que tiene más de N días enteros: con N = DAYS-1 se
# conservan los logs de los últimos DAYS días y se borra lo más viejo.
nohup sh -c '
  while true; do
    find "$0" -type f -name "access-*.log" -mtime +"$1" -delete
    sleep "$2"
  done' "$DIR" "$((DAYS - 1))" "$INTERVAL" >/dev/null 2>&1 &

echo "Logs de acceso: un archivo por día en $DIR, se conservan $DAYS días"
