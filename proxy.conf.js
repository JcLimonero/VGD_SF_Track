/**
 * Proxy de `ng serve`. Hace en desarrollo lo que nginx hace en producción.
 *
 * Modo normal (servicio de acceso y API propios):
 *  - /auth  -> servicio de acceso local (puerto 3100, ver auth/README.md)
 *  - /api   -> API de Vanguardia, agregando el token de proveedor desde la
 *              variable de entorno API_PROVIDER_TOKEN (nunca va en el código).
 *    En desarrollo NO se valida la sesión en /api: eso lo hace nginx en producción.
 *
 * Modo contra el portal publicado (PORTAL_REMOTE=https://...):
 *  - /auth y /api van al portal publicado, que valida la sesión y agrega el
 *    token él mismo. No hace falta ningún token ni servicio local: se entra con
 *    la contraseña real de cada perfil. OJO: es la API real, así que lo que se
 *    reenvíe o se marque desde aquí se escribe en producción.
 */
const remote = process.env.PORTAL_REMOTE;
const token = process.env.API_PROVIDER_TOKEN;

if (remote) {
  console.warn(
    `\n[proxy] Modo contra el portal publicado: ${remote}\n` +
      '        Las acciones que escriben (Reenviar, Reenviar todos...) afectan datos REALES.\n'
  );
  module.exports = {
    '/auth': { target: remote, secure: true, changeOrigin: true },
    '/api': { target: remote, secure: true, changeOrigin: true }
  };
} else {
  if (!token) {
    console.warn(
      '\n[proxy] API_PROVIDER_TOKEN no está definido: las llamadas a /api ' +
        'responderán 401. Arranca con:\n' +
        '        API_PROVIDER_TOKEN=<token> npm start\n' +
        '        o, sin token, contra el portal publicado:\n' +
        '        PORTAL_REMOTE=https://integraciones.appsvanguardia.com npm start\n'
    );
  }

  module.exports = {
    '/auth': {
      target: 'http://localhost:3100',
      secure: false
    },
    '/api': {
      target: process.env.API_UPSTREAM || 'https://apisvanguardia.com:400',
      secure: false,
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
      headers: token ? { 'X-Provider-Token': token } : {}
    }
  };
}
