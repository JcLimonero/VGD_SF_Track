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
