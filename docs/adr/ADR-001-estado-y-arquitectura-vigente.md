# ADR-001 — Estado y arquitectura vigente del Portal de Integraciones

- **Fecha:** 2026-10-14
- **Estado:** Aceptado como foto del estado. Se revisa cuando cambie la arquitectura.
- **Repo:** `JcLimonero/VGD_SF_Track` · rama `main` en `fb00805`
- **Fuentes:** `CLAUDE.md`, `VANGUARDIA_API_README.md`, `auth/README.md` e historial de git.

> **El repositorio es público.** Nada de datos reales, contraseñas ni tokens en el código.

## Contexto

Portal Angular 20 (plantilla Vex + Angular Material + Tailwind) para consultar y reenviar a
Salesforce los datos del DMS de Grupo Vanguardia: órdenes, inventario, servicios, clientes, leads,
DWH, Crabi, Integración SF y Honda SF, más «Validar demos». Lee y escribe en la API de Vanguardia.

Producción: **https://integraciones.appsvanguardia.com** — app `integration_monitor` en Coolify
(uuid `rnozyuud8llax2ugvfxewgev`), por compose, se despliega sola al mezclar a `main`.

## Decisiones vigentes

- **Un filtro + una tabla (+ modal) por módulo**, en `src/app/components/<modulo>/`.
  `generic-table/` es la tabla que usan casi todos; `shared/` guarda estilos y utilidades comunes
  (`salesforce-link.ts`, `_sf-icons.scss`, `_filter-bar.scss`).
- **Todas las llamadas a la API pasan por `src/app/services/vanguardia-api.service.ts`** (`/api/vgd/...`).
- **El token de la API vive en nginx, no en el portal** (cambio del 2026-10-11). `nginx/` tiene la
  plantilla con el proxy `/api`, la validación de variables y `test-proxy.sh`.
- **Servicio de acceso propio en Node, sin dependencias** (`auth/`): login, JWT, `/auth/verify`.
- **Perfiles CRABI y SALES FORCE con contraseña validada en servidor**; SALES FORCE va primero y es
  el elegido por defecto.
- **Publicación solo por pull request** (`bin/vgd publish`, decisión del 2026-09-30).
- **Los logs de acceso de nginx se conservan 15 días.**

## Estado al 14 de octubre de 2026

Las últimas dos semanas cerraron el endurecimiento del acceso y la limpieza del repo:

- **Seguridad:** el token de la API salió del portal a nginx (#46); perfiles con contraseña
  validada en servidor (#45).
- **Limpieza:** se quitaron `dist/` y los paquetes `deploy_*.zip` del repositorio (#47).
- **Funcional:** módulo para validar unidades demo por VIN (#41), solo Acura en los envíos a
  Honda SF (#43), íconos de Salesforce unificados en todas las tablas (#44), el logo lleva al home
  y no saca del portal (#42), filtros con búsqueda de agencia y branding (#40).
- **Documentación:** `CLAUDE.md` fundado el 2026-10-12 (#48).
- **Sin PRs abiertos.** Último PR mezclado: #50.

### Pruebas y CI

`CLAUDE.md` tiene sección «Pruebas y CI»; **no se corrió nada en esta sesión**, así que el estado
real queda sin verificar.

## Pendientes y huecos conocidos

1. **`.claude/` aparece sin seguir por git** en el árbol de trabajo: decidir si se ignora.
2. Los `deploy_*.zip` siguen **en el directorio de trabajo** (`deploy_1.zip`, `deploy_2.zip`,
   `deploy_3.zip`, `deploy_portal.zip`) aunque ya estén ignorados: conviene borrarlos del disco.
3. **`start-dev.bat` está obsoleto**: apunta a un `api-mock/` que no existe.
4. `src/README.md` y `src/CHANGELOG.md` son de la plantilla Vex, no del proyecto.

## Riesgos y deuda

- **Los bundles viejos con tokens siguen en el historial público.** Los tokens anteriores **deben
  darse de baja en la API**; esto es lo más urgente del repo.
- **La API de Vanguardia es frágil por diseño ajeno:** compara exacto (`brand=HOND` da 0), ignora en
  silencio los parámetros que no conoce, topa `perpage` en 1000, y un parámetro vacío sí se aplica y
  devuelve 0 filas.
- **Un 401 de la API es ambiguo:** puede ser endpoint inexistente o token de proveedor mal cargado.
  El portal solo cierra sesión con `401 session_expired` de nginx.
- En esta máquina los puertos 3000, 4200 y 4201 están ocupados por otros proyectos: el servidor
  local va en el 4300 y el servicio de acceso en el 3100.
- Hay ramas remotas muy viejas sin limpiar (`customer` de 2025-11, `dwh`, `excel`, `changes`).

## Lo que sigue

1. **Dar de baja en la API los tokens que quedaron en el historial público.**
2. Borrar los `deploy_*.zip` del disco y resolver `.claude/`.
3. Arreglar o eliminar `start-dev.bat`.
