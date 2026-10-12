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
  intentos fallidos en 15 minutos desde la misma IP.
- `GET /auth/me` con `Authorization: Bearer <token>` devuelve el perfil.
- `GET /auth/health` para el healthcheck.

## Local

```bash
PORT=3100 AUTH_SECRET=$(openssl rand -hex 32) PASSWORD_CRABI=prueba1 \
PASSWORD_SALES_FORCE=prueba2 node auth/server.js
npm start   # el portal manda /auth al puerto 3100 (proxy.conf.json)
```

Pruebas: `npm test --prefix auth`.

## Límite que hay que conocer

Ocultar pestañas en el portal es control de pantalla. Mientras el token de la
API (`X-Provider-Token`) viaje en el código del portal, un perfil podría llamar
directamente a endpoints que no ve. Cerrarlo exige que la API valide el perfil
en cada endpoint, o que nginx inyecte el token del lado del servidor.
