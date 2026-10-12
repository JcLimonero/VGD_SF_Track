# Servicio de acceso

Valida la contraseña de los dos perfiles compartidos del portal y devuelve un
token firmado (JWT HS256) con el perfil y su caducidad.

| Perfil | Id | Pestañas |
|---|---|---|
| CRABI | `crabi` | Solo Crabi |
| SALES FORCE | `sales_force` | Todas las demás, sin Crabi |

No hay un usuario por persona: cada perfil tiene una contraseña compartida.
Eso significa que no se sabe quién hizo qué y que, si alguien deja de usar el
portal, hay que cambiar la contraseña de todo el perfil.

## Variables de entorno

| Variable | Obligatoria | Descripción |
|---|---|---|
| `AUTH_SECRET` | Sí | Llave de firma, mínimo 32 caracteres aleatorios |
| `PASSWORD_CRABI` | Sí | Contraseña del perfil CRABI |
| `PASSWORD_SALES_FORCE` | Sí | Contraseña del perfil SALES FORCE |
| `SESSION_HOURS` | No | Duración de la sesión (8 por defecto) |
| `PORT` | No | Puerto (3000 por defecto) |

Si falta una obligatoria, el servicio **no arranca**. Los valores reales van en
el vault y en las variables del despliegue, nunca en el repositorio.

## Endpoints

- `POST /auth/login` con `{ "profile": "crabi" | "sales_force", "password": "..." }`
  devuelve `{ token, profile, expiresAt }`. Responde 401 si la contraseña es
  incorrecta (igual para perfil inexistente) y 429 con `Retry-After` tras 5
  intentos fallidos en 15 minutos desde la misma IP real, y un tope de 30 fallos
  por perfil sumando todos los orígenes (las contraseñas son compartidas). La IP
  sale de `X-Real-IP`, que fija nginx: `X-Forwarded-For` no se usa porque el
  cliente puede escribirlo. nginx además limita `/auth/login` a 10 por minuto.
- `GET /auth/me` con `Authorization: Bearer <token>` devuelve el perfil.
- `GET /auth/verify` lo consulta nginx (`auth_request`) antes de reenviar cada
  llamada a `/api`: 401 si la sesión no vale, 403 si el perfil no puede usar ese
  recurso, 200 si puede. CRABI solo llega a `orderscrabi` y `agenciesfilter`;
  SALES FORCE llega a todo menos a `orderscrabi`. Solo acepta rutas
  `/api/vgd/<recurso>` con letras, números, `-` y `_`, y solo los métodos GET y
  PUT: PUT únicamente sobre `inventoryfilter`, `customerfilter`,
  `servicefilter`, `leadsfilter`, `invoice` y `orderscrabi` (lo único que el
  portal modifica). El resto de la API es de solo lectura y nada puede crear ni
  borrar con el token de proveedor. Sin el método original, rechaza. No es
  alcanzable desde fuera (nginx lo marca `internal`).
- `GET /auth/health` para el healthcheck.

## Local

```bash
PORT=3100 AUTH_SECRET=$(openssl rand -hex 32) PASSWORD_CRABI=prueba1 \
PASSWORD_SALES_FORCE=prueba2 node auth/server.js
npm start   # el portal manda /auth al puerto 3100 (proxy.conf.json)
```

Pruebas: `npm test --prefix auth`.

## Proxy de la API (nginx)

El token de proveedor de la API (`API_PROVIDER_TOKEN`) vive solo en nginx, como
variable de entorno del despliegue. El portal llama a `/api/...`, el navegador
manda la sesión, nginx la valida con `/auth/verify` y solo entonces agrega el
token y reenvía a la API. La sesión del portal no llega a la API, el token no
vuelve al cliente en las respuestas y nginx verifica el certificado TLS de la API.

`nginx/docker-entrypoint.d/10-validate-env.sh` revisa `API_PROVIDER_TOKEN` y
`API_UPSTREAM` antes de arrancar: un valor con comillas, `;` o `$` impediría el
arranque en lugar de alterar la configuración.

Prueba de punta a punta (necesita Docker): `bash nginx/test-proxy.sh`. Corre
nginx real, el servicio de acceso real y una API falsa, y comprueba perfiles,
métodos, trucos de ruta, el token, los errores y el límite de intentos.

En desarrollo, `proxy.conf.js` hace lo mismo sin validar la sesión:

```bash
API_PROVIDER_TOKEN=<token> npm start
```

## Operación

- **Si se filtra una contraseña:** cámbiala en Coolify **y rota también
  `AUTH_SECRET`**. Cambiar solo la contraseña no invalida las sesiones ya
  emitidas (duran hasta `SESSION_HOURS`); rotar la llave sí.
- **Token de proveedor:** pide al dueño de la API un token nuevo, de uso solo
  para este portal, y da de baja los anteriores. Los valores viejos siguen en el
  historial público del repositorio; reescribirlo no sustituye la revocación.
- **Registros:** el log de acceso de nginx guarda las consultas (`vin=`,
  `order_dms=`...). `Authorization` y el token no se registran. Define cuánto
  tiempo se conservan los logs del servidor.

## Límite que hay que conocer

Con esto, cada llamada a la API exige una sesión válida y el perfil solo llega a
lo suyo. Sigue siendo un modelo de contraseñas **compartidas**: no se sabe quién
hizo qué y la sesión vive en `localStorage` (8 h), así que un XSS en el portal
podría robarla.
