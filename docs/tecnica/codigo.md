# Código: estructura, endpoints, modelos y configuración

Se omiten `node_modules`, `dist`, `coverage` y artefactos generados.

## Estructura

```
.
├── src/
│   ├── main.ts, index.html, styles.scss
│   ├── @vex/                    plantilla Vex (layout, componentes, config de tema)
│   ├── environments/            environment.ts / environment.prod.ts (api.baseUrl = '/api')
│   ├── testing/                 utilidades de prueba (auth-testing)
│   ├── assets/
│   └── app/
│       ├── app.config.ts        providers (router, HttpClient + authInterceptor, Vex)
│       ├── app.routes.ts        /login, /home, /app (AuthGuard)
│       ├── guards/auth.guard.ts
│       ├── home/                HomeComponent: orquesta pestañas, filtros y tablas
│       ├── core/auth/           AuthService, profiles.ts, auth.interceptor.ts
│       ├── core/{icons,luxon,navigation}/
│       ├── layouts/             layout de la plantilla Vex
│       ├── services/            vanguardia-api, mock-data, notification
│       └── components/          un directorio por módulo (ver abajo)
├── auth/                        servicio de acceso Node (auth.js, server.js, test/)
├── nginx/                       default.conf.template, docker-entrypoint.d/, test-proxy.sh
├── bin/vgd                      CLI de publicación (PR)
├── .github/workflows/ci.yml
├── Dockerfile, docker-compose.yml, proxy.conf.js, .env.example
├── docs/adr/                    decisiones; docs/tecnica/ esta documentación
├── CLAUDE.md, VANGUARDIA_API_README.md
└── start-dev.bat                obsoleto
```

## Módulos de `src/app/components/`

| Directorio | Contenido |
|---|---|
| `login`, `menu`, `tabs`, `modal-generic` | Acceso, menú, pestañas por perfil, modal genérico |
| `invoice-filter`, `invoice-table` | Órdenes / facturas |
| `inventory/`, `customer/`, `servicios/`, `leads/`, `dwh/` | Filtro + tabla (+ modal) por módulo |
| `crabi/` | Órdenes Crabi |
| `salesforce/` | Integración SF (subpestañas, datos de prueba) |
| `honda-sf/` | Siete tablas Honda; `honda-sf.catalog.ts` define columnas, filtros y `lockedFilters` |
| `demo-validation/` | Validar demos por VIN (`demo-validation.util.ts`) |
| `generic-table/` | Tabla reutilizable, columnas dinámicas, modal de detalle JSON |
| `shared/` | `salesforce-link.ts`, `_sf-icons.scss`, `_filter-bar.scss` |

Casi cada componente tiene su `.spec.ts`.

## Cliente de la API (`services/vanguardia-api.service.ts`)

Base: `environment.api.baseUrl` = `/api` (nginx lo reenvía a la API). El portal no lleva ningún token de proveedor.

| Método | HTTP | Recurso |
|---|---|---|
| `getInventory` / `updateInventory(id)` | GET / PUT | `/vgd/inventoryfilter[/id]` |
| `getCustomers` / `updateCustomer(id)` | GET / PUT | `/vgd/customerfilter[/id]` |
| `getServices` / `updateService(id)` | GET / PUT | `/vgd/servicefilter[/id]` |
| `getLeads` / `updateLead(id)` | GET / PUT | `/vgd/leadsfilter[/id]` |
| `getDWH` | GET | `/vgd/dwh` |
| `getCrabiOrders` / `updateCrabiOrder(id)` | GET / PUT | `/vgd/orderscrabi[/id]` |
| `getHondaPortal(endpoint)` | GET | `/vgd/portalhondacustomers`, `portalhondaleads`, `portalhondaopportunities`, `portalhondademos`, `portalhondasales`, `portalhondaquotes`, `portalhondafinances` |
| `getInvoices`, `getInvoicesPaged`, `getInvoicesby*` / `updateInvoice(id)` | GET / PUT | `/vgd/invoice[/id]` (filtros `order_dms`, `vin`, `invoice_reference`, `agencyName`, `sendedSalesForce`, `insertCorrect`) |
| `getAgencies` | GET | `/vgd/agenciesfilter?perpage=100` |

Respuesta esperada: `res.data.data` (filas) y `res.data.total_rows`; el servicio la normaliza a `{ items, total }`. Parámetros comunes: `page`, `perpage` (máx. 1000), `orderby`, `ordertype`.

`VANGUARDIA_API_README.md` describe endpoints adicionales (login, megaorders, customer/vehicle...) y un uso de `login`/`setAuthToken` que **no coincide** con el servicio actual: **Por confirmar** que ese archivo está desactualizado.

## Modelos de datos

No hay modelos tipados detallados: casi todo se maneja como `any`. Interfaces en el servicio: `ApiResponse<T>` (`status`, `data`, `message?`), `InventoryItem` y `Agency` (marcadas como provisionales en el código). Campos de negocio vistos en el código: `sendedSalesForce`, `insertCorrect`, `resultSF`, `idSalesForce`, `isSend` (Crabi), `typeDescription`, `statusDescription`, `agencyName`, `brand`, `dealer_id`, `vin`. El esquema real de la base pertenece a la API externa: **Por confirmar**.

`DemoValidationRow` (en `demo-validation.util.ts`) y `HondaSfTable` / `HondaSfFilterField` (en `honda-sf.catalog.ts`) están definidos en el código.

## Servicio de acceso (`auth/`)

| Endpoint | Función |
|---|---|
| `POST /auth/login` | `{ profile, password }` devuelve `{ token, profile, expiresAt }` |
| `GET /auth/me` | Perfil del token Bearer |
| `GET /auth/verify` | Solo interno (nginx `auth_request`): 200 / 401 / 403 |
| `GET /auth/health` | Healthcheck |

Pruebas: `auth/test/auth.test.js` y `auth/test/server.test.js`.

## Variables de entorno (solo nombres)

| Variable | Dónde | Para qué | Obligatoria |
|---|---|---|---|
| `API_PROVIDER_TOKEN` | nginx / `proxy.conf.js` | Token de proveedor que nginx agrega a `/api` | Sí |
| `API_UPSTREAM` | nginx / `proxy.conf.js` | URL base de la API (hay valor por defecto en compose y en el proxy de desarrollo) | No |
| `AUTH_SECRET` | auth | Llave de firma de sesiones (mínimo 32 caracteres) | Sí |
| `PASSWORD_CRABI` | auth | Contraseña del perfil CRABI | Sí |
| `PASSWORD_SALES_FORCE` | auth | Contraseña del perfil SALES FORCE | Sí |
| `SESSION_HOURS` | auth | Duración de sesión en horas (8 por defecto) | No |
| `PORT` | auth | Puerto del servicio (3000 por defecto; 3100 en local) | No |
| `LOG_RETENTION_DAYS` | nginx | Días de logs de acceso (15 por defecto) | No |
| `LOG_PURGE_INTERVAL_SECONDS` | nginx | Intervalo de limpieza de logs (21600 por defecto, según `05-logs.sh`) | No |

Los valores viven en el vault y en Coolify. `.env.example` es la plantilla; `.env` no se versiona.

## Por confirmar

- Esquema de datos real de la API y tipos de cada módulo.
- Vigencia de `VANGUARDIA_API_README.md` y `auth/README.md` (`proxy.conf.json` vs `proxy.conf.js`).
- Módulo `salesforce` (Integración SF): sigue con datos inventados; no está claro si se conectará a una API real.
