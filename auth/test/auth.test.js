'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  signToken,
  verifyToken,
  checkPassword,
  RateLimiter
} = require('../auth');

const SECRET = 'x'.repeat(40);
const ENV = { PASSWORD_CRABI: 'clave-crabi', PASSWORD_SALES_FORCE: 'clave-sf' };

test('un token firmado se verifica y trae el perfil', () => {
  const token = signToken(SECRET, 'crabi', 3600);
  const data = verifyToken(SECRET, token);
  assert.equal(data.profile, 'crabi');
});

test('un token caducado se rechaza', () => {
  const token = signToken(SECRET, 'crabi', 60, Date.now() - 120_000);
  assert.equal(verifyToken(SECRET, token), null);
});

test('un token con otra llave o alterado se rechaza', () => {
  const token = signToken(SECRET, 'crabi', 3600);
  assert.equal(verifyToken('y'.repeat(40), token), null);

  // Cambiar el perfil en el contenido sin volver a firmar
  const [h, , s] = token.split('.');
  const forged = Buffer.from(
    JSON.stringify({ profile: 'sales_force', exp: 9999999999 })
  ).toString('base64url');
  assert.equal(verifyToken(SECRET, `${h}.${forged}.${s}`), null);
});

test('basura en lugar de token se rechaza sin lanzar error', () => {
  for (const value of [undefined, null, '', 'abc', 'a.b.c', 42]) {
    assert.equal(verifyToken(SECRET, value), null);
  }
});

test('un token de un perfil que no existe se rechaza', () => {
  const token = signToken(SECRET, 'admin', 3600);
  assert.equal(verifyToken(SECRET, token), null);
});

test('cada perfil solo entra con su propia contraseña', () => {
  assert.equal(checkPassword(ENV, 'crabi', 'clave-crabi'), true);
  assert.equal(checkPassword(ENV, 'sales_force', 'clave-sf'), true);
  assert.equal(checkPassword(ENV, 'crabi', 'clave-sf'), false);
  assert.equal(checkPassword(ENV, 'sales_force', 'clave-crabi'), false);
});

test('perfil inexistente, contraseña vacía o no texto no entran', () => {
  assert.equal(checkPassword(ENV, 'admin', 'clave-crabi'), false);
  assert.equal(checkPassword(ENV, 'crabi', ''), false);
  assert.equal(checkPassword(ENV, 'crabi', undefined), false);
  assert.equal(checkPassword(ENV, 'crabi', { $ne: 1 }), false);
});

test('un perfil sin contraseña configurada nunca entra', () => {
  assert.equal(checkPassword({}, 'crabi', ''), false);
  assert.equal(checkPassword({}, 'crabi', 'undefined'), false);
});

test('el límite bloquea tras los intentos fallidos y se libera con el tiempo', () => {
  const limiter = new RateLimiter(3, 1000);
  const t0 = 1_000_000;
  for (let i = 0; i < 3; i++) limiter.fail('ip', t0);

  assert.ok(limiter.retryAfter('ip', t0 + 10) > 0);
  assert.equal(limiter.retryAfter('otra-ip', t0 + 10), 0);
  assert.equal(limiter.retryAfter('ip', t0 + 1001), 0);
});

test('un acceso correcto reinicia el contador', () => {
  const limiter = new RateLimiter(2, 1000);
  limiter.fail('ip');
  limiter.succeed('ip');
  limiter.fail('ip');
  assert.equal(limiter.retryAfter('ip'), 0);
});

const { canAccess } = require('../auth');

test('CRABI solo llega a sus órdenes y a las agencias', () => {
  assert.equal(canAccess('crabi', '/api/vgd/orderscrabi'), true);
  assert.equal(canAccess('crabi', '/api/vgd/orderscrabi/15'), true);
  assert.equal(canAccess('crabi', '/api/vgd/agenciesfilter'), true);
  for (const resource of ['inventoryfilter', 'customerfilter', 'dwh', 'invoice',
    'portalhondaleads', 'leadsfilter', 'servicefilter']) {
    assert.equal(canAccess('crabi', `/api/vgd/${resource}`), false, resource);
  }
});

test('SALES FORCE llega a todo menos a las órdenes de Crabi', () => {
  for (const resource of ['inventoryfilter', 'customerfilter', 'dwh', 'invoice',
    'portalhondaleads', 'agenciesfilter']) {
    assert.equal(canAccess('sales_force', `/api/vgd/${resource}`), true, resource);
  }
  assert.equal(canAccess('sales_force', '/api/vgd/orderscrabi'), false);
  assert.equal(canAccess('sales_force', '/api/vgd/orderscrabi/15'), false);
});

test('mayúsculas y variantes de ruta no esquivan la regla de Crabi', () => {
  for (const path of [
    '/api/vgd/OrdersCrabi',
    '/api/vgd/ORDERSCRABI/1',
    '/api/vgd/orderscrabi/',
    '/api/vgd//orderscrabi',
    '/api/vgd/./orderscrabi',
    '/api/vgd/x/../orderscrabi',
    '/api/vgd/orderscrabi%2f1',
    '/api/vgd/orderscrabi;x',
    '/api/vgd/orderscrabi\\x',
    '/api/vgd/orderscrabi?x=1'
  ]) {
    assert.equal(canAccess('sales_force', path), false, path);
  }
});

test('rutas fuera de /api/vgd, vacías o de perfiles desconocidos se rechazan', () => {
  for (const path of ['', '/', '/api', '/api/', '/api/vgd', '/api/vgd/', '/auth/me',
    '/api/auth/login', '/otra/vgd/dwh', undefined, null, 42]) {
    assert.equal(canAccess('sales_force', path), false, String(path));
    assert.equal(canAccess('crabi', path), false, String(path));
  }
  assert.equal(canAccess('admin', '/api/vgd/dwh'), false);
  assert.equal(canAccess(undefined, '/api/vgd/dwh'), false);
});

test('canAccess: solo GET y PUT, y PUT únicamente en los recursos que el portal modifica', () => {
  for (const resource of ['inventoryfilter', 'customerfilter', 'servicefilter',
    'leadsfilter', 'invoice']) {
    assert.equal(canAccess('sales_force', `/api/vgd/${resource}/1`, 'PUT'), true, resource);
    assert.equal(canAccess('crabi', `/api/vgd/${resource}/1`, 'PUT'), false, resource);
  }
  assert.equal(canAccess('crabi', '/api/vgd/orderscrabi/1', 'PUT'), true);
  assert.equal(canAccess('sales_force', '/api/vgd/orderscrabi/1', 'PUT'), false);

  for (const resource of ['dwh', 'agenciesfilter', 'portalhondaleads', 'portalhondacustomers']) {
    assert.equal(canAccess('sales_force', `/api/vgd/${resource}`, 'PUT'), false, resource);
  }
  for (const method of ['POST', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD', 'put', '', undefined, null]) {
    assert.equal(
      canAccess('sales_force', '/api/vgd/inventoryfilter/1', method === undefined ? 'X' : method),
      false,
      String(method)
    );
  }
});

test('el limitador no crece sin tope', () => {
  const limiter = new RateLimiter(5, 60_000, 100);
  for (let i = 0; i < 1000; i++) limiter.fail(`ip-${i}`, 1_000 + i);
  assert.ok(limiter.failures.size <= 100);
});
