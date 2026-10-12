# VGD_SF_Track — Portal de Integraciones (Grupo Vanguardia)

Portal Angular 20 (plantilla Vex + Angular Material + Tailwind) para consultar y reenviar a Salesforce los datos del DMS: órdenes, inventario, servicios, clientes, leads, DWH, Crabi, Integración SF y Honda SF, más "Validar demos". Lee y escribe en la API de Vanguardia. **El repositorio es público**: nada de datos reales, contraseñas ni tokens en el código, las pruebas ni los docs.

Producción: https://integraciones.appsvanguardia.com — app `integration_monitor` en Coolify (uuid `rnozyuud8llax2ugvfxewgev`), compose, se despliega sola al mezclar a `main`.

## Estructura
- `src/app/components/<modulo>/` — un filtro + una tabla (+ modal) por módulo. `generic-table/` es la tabla que usan casi todos; `shared/` guarda estilos y utilidades comunes (`salesforce-link.ts`, `_sf-icons.scss`, `_filter-bar.scss`).
- `src/app/core/auth/` — sesión, perfiles, interceptor (ver "Acceso").
- `src/app/services/vanguardia-api.service.ts` — todas las llamadas a la API (`/api/vgd/...`).
- `auth/` — servicio de acceso en Node **sin dependencias** (login, JWT, `/auth/verify`). Ver `auth/README.md`.
- `nginx/` — plantilla de nginx (proxy `/api`, token de la API), validación de variables y `test-proxy.sh`.
- `bin/vgd` — CLI de publicación (`vgd publish`). `VANGUARDIA_API_README.md` — notas de la API.
- `start-dev.bat` está **obsoleto** (apunta a un `api-mock/` que no existe). `src/README.md` y `src/CHANGELOG.md` son de la plantilla Vex.

## Comandos
```bash
npm ci                                   # Node 22 (.nvmrc)
API_PROVIDER_TOKEN=<token> npm start     # portal en :4200 (proxy.conf.js: /api y /auth)
PORT=3100 AUTH_SECRET=$(openssl rand -hex 32) PASSWORD_CRABI=x PASSWORD_SALES_FORCE=y node auth/server.js   # login local
npm run typecheck                        # tsc --noEmit
npm run test:ci                          # Karma, Chrome headless con cobertura
npm test --prefix auth                   # servicio de acceso (node --test)
bash nginx/test-proxy.sh                 # nginx + servicio + API falsa, necesita Docker
npm run build                            # producción, sale a dist/ (ignorado)
```

## Pruebas y CI
- 308 pruebas del portal, 29 del servicio de acceso y 51 comprobaciones del proxy: **todas pasan**. No hay fallas preexistentes: si algo falla, es del cambio.
- `.github/workflows/ci.yml` corre auditoría de dependencias (solo corta en críticas; `xlsx` es alta y sin parche, documentado), pruebas del servicio, pruebas del proxy, tipos, pruebas unitarias y build. El CI solo corre en PR hacia `main`.
- Los specs de componentes que usan `AuthService` necesitan `httpTestProviders` y, si dependen del perfil, `loginAs('crabi' | 'sales_force')` de `@testing/auth-testing`.

## Flujo de trabajo
- **Nunca push directo a `main`.** Rama corta → PR → CI en verde → merge con squash (skill `flujo-pr`). `main` exige rama al día: tras cada merge hay que `gh pr update-branch` en los demás y esperar su CI otra vez.
- Si se cambia la base de un PR o se fuerza un push, el CI puede no dispararse: cerrar y reabrir el PR.
- Commits en español con prefijo convencional (`feat(modulo): ...`). Un PR por tema.
- El despliegue lo hace Coolify al mezclar; las variables de entorno se cargan en Coolify (`API_PROVIDER_TOKEN`, `AUTH_SECRET`, `PASSWORD_CRABI`, `PASSWORD_SALES_FORCE`, opcional `SESSION_HOURS`, `API_UPSTREAM`). Sin ellas `docker compose` falla a propósito. Ver skills `coolify-stage` y `despliegue-stage-seguro`.

## Acceso (perfiles)
- Dos perfiles **compartidos**, sin usuario por persona: **CRABI** (solo la pestaña Crabi) y **SALES FORCE** (todas las demás, sin Crabi). Definidos en `core/auth/profiles.ts`; la regla equivalente en la API vive en `auth/auth.js` (`canAccess`). **Si cambia uno, cambia el otro**, y se actualizan sus pruebas.
- El navegador manda la sesión a `/api`; nginx la valida (`auth_request`) y solo entonces agrega el token de proveedor. Solo GET y PUT, y PUT únicamente en lo que el portal modifica.
- El token de la API **no está en el código**: vive en nginx. No reintroducir `X-Provider-Token` en el portal.

## Reglas que no se rompen
- Nunca secretos, contraseñas, tokens ni datos reales en el repo, en pruebas ni en docs. Los valores viven en el vault y en Coolify; Claude no los lee ni los imprime.
- Crabi es de consulta y de marcar reenvío (`isSend=0`): **no hay POST ni DELETE** y no deben agregarse.
- Honda SF muestra **solo Acura**: `lockedFilters` por tabla en `honda-sf.catalog.ts` (`brand=ACURA`; Clientes por `dealer_id=2003`). Las filas sin marca quedan fuera a propósito.
- Reenviar a Salesforce solo se habilita cuando el envío falló (`sendedSalesForce=1` e `insertCorrect=0`); es una escritura real en la API.
- Los estilos de íconos de Salesforce viven en `shared/_sf-icons.scss`; no copiarlos.

## Trampas conocidas
- La API compara **exacto** (`brand=HOND` da 0), ignora en silencio los parámetros que no conoce y topa `perpage` en 1000. Un parámetro vacío sí se aplica y devuelve 0 filas.
- Un 401 de la API puede significar endpoint inexistente o token de proveedor mal cargado; el portal solo cierra sesión con `401 session_expired` de nginx.
- En esta máquina los puertos 3000, 4200 y 4201 están ocupados por otros proyectos: el servidor local va en el 4300 (`.claude/launch.json`, no versionado) y el servicio de acceso en el 3100.
- En zsh no uses `path` como nombre de variable (pisa `PATH`) ni `grep --include=*.ts` sin comillas.
- `dist/`, `coverage/` y `deploy_*.zip` están ignorados. Los bundles viejos con tokens siguen en el historial público: **los tokens anteriores deben darse de baja en la API**.

## Subagentes
- Cambios de seguridad (acceso, nginx, secretos): revisión independiente con `equipo-sec` antes de publicar, con pruebas reales (`nginx/test-proxy.sh`), no solo lectura de código.
- Los prompts a subagentes citan este archivo; no repiten estas reglas.
