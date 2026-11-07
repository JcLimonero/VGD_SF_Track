# Documentación técnica — Portal de Integraciones (VGD_SF_Track)

Índice y visión general. Esta carpeta (`docs/tecnica/`) es independiente de `docs/adr/`.

## Índice

- [arquitectura.md](arquitectura.md): componentes, capas, dependencias externas y diagramas.
- [workflows.md](workflows.md): flujos de negocio, CI/CD, contenedores y despliegue.
- [codigo.md](codigo.md): estructura de carpetas, módulos, endpoints, modelos y variables de entorno.
- Contexto previo: [../adr/ADR-001-estado-y-arquitectura-vigente.md](../adr/ADR-001-estado-y-arquitectura-vigente.md) y `CLAUDE.md` en la raíz.

## Propósito

Portal web de Grupo Vanguardia para consultar y reenviar a Salesforce los datos del DMS: órdenes (facturas), inventario, servicios, clientes, leads, DWH, Crabi, Integración SF y Honda SF, además de una herramienta "Validar demos" por VIN. Lee y escribe en la API de Vanguardia (`/vgd/...`).

> El repositorio es público: no debe contener datos reales, contraseñas ni tokens. Esta documentación solo menciona nombres de variables, nunca sus valores.

## Stack

| Capa | Tecnología |
|---|---|
| Portal | Angular 20, plantilla Vex, Angular Material, Tailwind CSS 3, RxJS, Luxon, `xlsx` (exportar a Excel) |
| Servicio de acceso | Node 22 sin dependencias (`auth/`), JWT HS256 |
| Proxy / servidor web | nginx 1.27 (Alpine) con `auth_request` |
| Contenedores | Dockerfile multi-etapa + `docker-compose.yml` (servicios `web` y `auth`) |
| CI | GitHub Actions (`.github/workflows/ci.yml`) |
| Despliegue | Coolify (app `integration_monitor`), automático al mezclar a `main` |
| Pruebas | Karma + Jasmine (portal), `node --test` (auth), `nginx/test-proxy.sh` (proxy, requiere Docker) |

Node se fija en `.nvmrc` (22).

## Correr localmente

Según `CLAUDE.md` y `auth/README.md`:

```bash
npm ci                                    # Node 22
# Terminal 1: servicio de acceso (puerto 3100, valores de prueba propios)
PORT=3100 AUTH_SECRET=<32+ caracteres aleatorios> PASSWORD_CRABI=<prueba> PASSWORD_SALES_FORCE=<prueba> node auth/server.js
# Terminal 2: portal en :4200 con proxy de desarrollo (proxy.conf.js)
API_PROVIDER_TOKEN=<token> npm start
```

Otros comandos: `npm run typecheck`, `npm run test:ci`, `npm test --prefix auth`, `bash nginx/test-proxy.sh`, `npm run build` (sale a `dist/vex`, ignorado por git).

Notas:
- Sin `API_PROVIDER_TOKEN`, las llamadas a `/api` responden 401 en desarrollo.
- `auth/README.md` menciona `proxy.conf.json`, pero el archivo real es `proxy.conf.js`. **Por confirmar** que `angular.json` lo referencia (no se verificó esta relación).
- `start-dev.bat` está obsoleto (apunta a un `api-mock/` inexistente).
- `src/README.md` y `src/CHANGELOG.md` son de la plantilla Vex, no del proyecto.

## Producción

https://integraciones.appsvanguardia.com (según `CLAUDE.md`).
