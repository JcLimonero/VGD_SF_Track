'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { readConfig, createServer } = require('../server');
const { RateLimiter } = require('../auth');

const ENV = {
  AUTH_SECRET: 's'.repeat(40),
  PASSWORD_CRABI: 'clave-crabi',
  PASSWORD_SALES_FORCE: 'clave-sf',
  SESSION_HOURS: '8'
};

async function withServer(fn, limiter = new RateLimiter(3, 60_000)) {
  const server = createServer(readConfig(ENV), limiter);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    await fn(base);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

const login = (base, body) =>
  fetch(`${base}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

test('no arranca si falta una contraseña o la llave', () => {
  assert.throws(() => readConfig({ ...ENV, PASSWORD_CRABI: '' }), /PASSWORD_CRABI/);
  assert.throws(() => readConfig({ ...ENV, AUTH_SECRET: undefined }), /AUTH_SECRET/);
  assert.throws(() => readConfig({ ...ENV, AUTH_SECRET: 'corta' }), /32/);
  assert.throws(() => readConfig({ ...ENV, SESSION_HOURS: '0' }), /SESSION_HOURS/);
});

test('login correcto devuelve token y perfil, y /auth/me lo reconoce', async () => {
  await withServer(async (base) => {
    const res = await login(base, { profile: 'crabi', password: 'clave-crabi' });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.profile, 'crabi');
    assert.ok(body.token);

    const me = await fetch(`${base}/auth/me`, {
      headers: { Authorization: `Bearer ${body.token}` }
    });
    assert.equal(me.status, 200);
    assert.equal((await me.json()).profile, 'crabi');
  });
});

test('contraseña incorrecta y perfil inexistente dan la misma respuesta', async () => {
  await withServer(async (base) => {
    const wrong = await login(base, { profile: 'crabi', password: 'mala' });
    const unknown = await login(base, { profile: 'admin', password: 'mala' });
    assert.equal(wrong.status, 401);
    assert.equal(unknown.status, 401);
    assert.deepEqual(await wrong.json(), await unknown.json());
  });
});

test('la contraseña de un perfil no abre el otro', async () => {
  await withServer(async (base) => {
    const res = await login(base, { profile: 'crabi', password: 'clave-sf' });
    assert.equal(res.status, 401);
  });
});

test('tras varios fallos responde 429 con Retry-After, incluso con la clave buena', async () => {
  await withServer(async (base) => {
    for (let i = 0; i < 3; i++) {
      await login(base, { profile: 'crabi', password: 'mala' });
    }
    const res = await login(base, { profile: 'crabi', password: 'clave-crabi' });
    assert.equal(res.status, 429);
    assert.ok(Number(res.headers.get('retry-after')) > 0);
  });
});

test('cuerpo inválido o enorme no tumba el servidor', async () => {
  await withServer(async (base) => {
    const bad = await fetch(`${base}/auth/login`, {
      method: 'POST',
      body: '{no es json'
    });
    assert.equal(bad.status, 400);

    const huge = await fetch(`${base}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ password: 'x'.repeat(10_000) })
    }).catch(() => ({ status: 413 }));
    assert.ok([413, 400].includes(huge.status));

    const ok = await fetch(`${base}/auth/health`);
    assert.equal(ok.status, 200);
  });
});

test('/auth/me sin token o con token falso responde 401', async () => {
  await withServer(async (base) => {
    assert.equal((await fetch(`${base}/auth/me`)).status, 401);
    const fake = await fetch(`${base}/auth/me`, {
      headers: { Authorization: 'Bearer a.b.c' }
    });
    assert.equal(fake.status, 401);
  });
});

test('rutas desconocidas responden 404', async () => {
  await withServer(async (base) => {
    assert.equal((await fetch(`${base}/otra`)).status, 404);
  });
});
