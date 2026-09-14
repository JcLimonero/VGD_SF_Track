# DS_Monitor

Repositorio de Dealer Solutions. Contiene tres proyectos que se construyen y se
despliegan por separado.

| Carpeta | Qué es | Cómo se levanta |
| --- | --- | --- |
| [`portal/`](portal) | **DS Monitor** — el tablero: pendientes, juntas, plataformas, despliegues, repositorios, licencias y CRM, más el modo carrusel para el monitor de la oficina | `cd portal && npm install && npm start` |
| [`puente/`](puente) | El backend de DS Monitor: guarda las credenciales, consulta o recibe los datos, y los traduce al modelo del portal | `cd puente && npm install && npm run build && npm start` |
| raíz (`src/`) | **VGD SF Track** — la herramienta de seguimiento de Salesforce que ya está en producción. Es anterior a DS Monitor y no depende de él | `npm install && npm start` |

Los tres tienen su propio `package.json` y su propio job en
[CI](.github/workflows/ci.yml). Un fallo en uno no bloquea a los otros.

## DS Monitor de un vistazo

Una sola pantalla para lo que hoy está repartido en muchos lugares. Se usa de
dos maneras:

- **Como portal**, en la computadora, con barra lateral y filtros.
- **Como carrusel**, en el monitor fijo de la oficina: a pantalla completa,
  turnando ocho pantallas solo, sin que nadie lo opere.

El portal no conoce a ningún proveedor: conoce un puñado de interfaces
(`TaskSource`, `CalendarSource`, `MonitorSource`, `CrmSource`, `LicenseSource`,
`DeploymentSource`, `RepoSource`). Cada integración es una clase que las
implementa, y una línea de configuración decide si esa conexión corre con datos
de demostración o contra el puente. **Conectar una fuente real no cambia una
sola vista.**

El puente trae los datos de dos maneras:

- **Yendo por ellos** — consulta la API del proveedor: Claude, Cursor, Figma,
  Vercel, GitHub, Odoo y el monitoreo propio.
- **Recibiéndolos** — el sistema de origen empuja con un token. Es lo natural
  para lo nuestro (Ops, el CI, un script de vigilancia) y no requiere darle al
  puente credenciales de esos sistemas. El cuerpo exacto de cada envío está en
  [`puente/INGESTA.md`](puente/INGESTA.md).

## Estado

**Todas las fuentes del portal siguen en modo demostración**: los datos son
inventados, y los nombres de personas, clientes y dominios también, porque este
repositorio es público.

El puente ya existe con siete conexiones listas; falta desplegarlo, darle las
credenciales y cambiar el `mode` de esas conexiones de `demo` a `gateway`.
Los detalles están en [`portal/README.md`](portal/README.md) y
[`puente/README.md`](puente/README.md).

Sin construir todavía: los calendarios de Google y Microsoft del lado del
puente. Ops ya se puede resolver por envío.

## Dónde no van las credenciales

En el repositorio. Es público. Usuarios, llaves y tokens viven en el entorno del
puente (ver [`puente/.env.example`](puente/.env.example)), y lo que el puente
recibe se guarda en `puente/datos/`, que está en `.gitignore` porque puede traer
nombres, correos e importes reales.
