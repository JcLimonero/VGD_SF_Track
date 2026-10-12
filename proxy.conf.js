/**
 * Proxy de `ng serve`. Hace en desarrollo lo que nginx hace en producción:
 *
 *  - /auth  -> servicio de acceso local (puerto 3100, ver auth/README.md)
 *  - /api   -> API de Vanguardia, agregando el token de proveedor desde la
 *              variable de entorno API_PROVIDER_TOKEN (nunca va en el código).
 *
 * En desarrollo NO se valida la sesión en /api: eso lo hace nginx en producción.
 */
const token = process.env.API_PROVIDER_TOKEN;

if (!token) {
  console.warn(
    '\n[proxy] API_PROVIDER_TOKEN no está definido: las llamadas a /api ' +
      'responderán 401. Arranca con:\n' +
      '        API_PROVIDER_TOKEN=<token> npm start\n'
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
