# Arquitectura

## Componentes

| Componente | Ubicación | Rol |
|---|---|---|
| Portal (SPA Angular) | `src/` | UI por módulo; todas las llamadas HTTP pasan por `VanguardiaApiService` |
| Servicio de acceso | `auth/` | Valida la contraseña del perfil, emite JWT y responde `/auth/verify` |
| Proxy nginx | `nginx/default.conf.template` | Sirve el portal, protege `/api` con `auth_request`, agrega el token de proveedor |
| API de Vanguardia | externa | Fuente de datos del DMS y de las tablas de Salesforce (`/vgd/...`) |
| Salesforce | externa | Destino de las integraciones; el portal solo muestra su reflejo y reenvía |
| Coolify | externa | Orquesta el despliegue del compose |

## Diagrama general

```mermaid
flowchart LR
  U[Navegador] -->|HTTPS| T[Proxy de Coolify]
  T --> N[nginx - contenedor web]
  N -->|archivos estáticos| SPA[Portal Angular]
  U -->|POST /auth/login| N
  N -->|/auth/*| A[Servicio auth - Node]
  U -->|/api/vgd/... + Bearer| N
  N -. auth_request /auth/verify .-> A
  N -->|+ X-Provider-Token| API[API de Vanguardia]
  API --- SF[(Salesforce / DMS)]
```

## Capas del portal

```mermaid
flowchart TD
  R[app.routes.ts: /login, /home, /app] --> G[AuthGuard]
  G --> H[HomeComponent]
  H --> TB[TabsComponent: pestañas según perfil]
  H --> M[Módulos: filtro + tabla + modal]
  M --> GT[generic-table / modal-generic]
  M --> S[VanguardiaApiService]
  M -.datos de prueba.-> MD[MockDataService]
  S --> I[authInterceptor: Authorization Bearer a /api/]
  I --> N[nginx /api]
  AS[AuthService + profiles.ts] --> I
  AS --> G
```

## Autenticación y autorización

```mermaid
sequenceDiagram
  participant B as Navegador
  participant N as nginx
  participant A as auth
  participant P as API Vanguardia
  B->>N: POST /auth/login {profile, password}
  N->>A: (límite 10/min por IP)
  A-->>B: {token, profile, expiresAt}
  Note over B: sesión en localStorage (clave vgd_session)
  B->>N: GET /api/vgd/inventoryfilter (Bearer)
  N->>A: auth_request /auth/verify (ruta y método originales)
  A-->>N: 200 / 401 / 403
  N->>P: reenvía con X-Provider-Token (Authorization vacío)
  P-->>B: respuesta (sin el token)
```

Reglas (de `auth/README.md` y `nginx/default.conf.template`):
- Dos perfiles compartidos: `crabi` (solo Crabi) y `sales_force` (todo menos Crabi). Sin usuario por persona.
- `/auth/verify` solo acepta rutas `/api/vgd/<recurso>` y métodos GET y PUT; PUT únicamente sobre `inventoryfilter`, `customerfilter`, `servicefilter`, `leadsfilter`, `invoice` y `orderscrabi`.
- CRABI llega solo a `orderscrabi` y `agenciesfilter`; SALES FORCE a todo menos `orderscrabi`.
- Fallos de login: 429 tras 5 intentos en 15 min por IP, tope de 30 por perfil; nginx limita `/auth/login` a 10 por minuto.
- El 401 de nginx lleva `{"error":"session_expired"}`; solo ese cierra la sesión en el portal. Un 401 de la API no.
- Ocultar pestañas en el portal es control de pantalla; la autorización real está en `/auth/verify`. La regla vive duplicada en `core/auth/profiles.ts` y `auth/auth.js` (`canAccess`): si cambia una, cambia la otra.
- Limitación documentada: contraseñas compartidas y sesión en `localStorage` (un XSS podría robarla).

## Dependencias externas

- API de Vanguardia (por defecto `https://apisvanguardia.com:400`, configurable con `API_UPSTREAM`); nginx verifica su certificado TLS.
- Salesforce: acceso indirecto vía la API (el portal genera enlaces con `components/shared/salesforce-link.ts`).
- Coolify y GitHub (CI, PRs).

## Datos de prueba

La pestaña "Integración SF" usa `MockDataService` con datos **inventados** (`honda_orders`, `honda_leads`, `honda_services`, `honda_inventory`, generados en `services/mock-data/salesforce-honda.mock.ts`). No consume API real. Honda SF y Crabi sí usan la API real.

## Por confirmar

- Cómo se estructura `angular.json` / referencia a `proxy.conf.js` (no revisado).
- Si la ruta `/app` (hijos vacíos en `app.routes.ts`) se usa realmente; el portal opera en `/home`.
