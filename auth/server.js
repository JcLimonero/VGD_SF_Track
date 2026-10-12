'use strict';

const http = require('node:http');
const {
  PROFILES,
  signToken,
  verifyToken,
  checkPassword,
  RateLimiter
} = require('./auth');

const MAX_BODY_BYTES = 4096;

/** Falla al arrancar si falta algo: mejor no iniciar que iniciar abierto. */
function readConfig(env) {
  const missing = ['AUTH_SECRET', ...Object.values(PROFILES)].filter(
    (name) => !env[name]
  );
  if (missing.length > 0) {
    throw new Error(`Faltan variables de entorno: ${missing.join(', ')}`);
  }
  if (env.AUTH_SECRET.length < 32) {
    throw new Error('AUTH_SECRET debe tener al menos 32 caracteres');
  }
  const hours = Number(env.SESSION_HOURS ?? 8);
  if (!Number.isFinite(hours) || hours <= 0) {
    throw new Error('SESSION_HOURS debe ser un número mayor que 0');
  }
  return { env, secret: env.AUTH_SECRET, ttlSeconds: Math.round(hours * 3600) };
}

function createServer(config, limiter = new RateLimiter()) {
  const send = (res, status, body, headers = {}) => {
    res.writeHead(status, {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      ...headers
    });
    res.end(JSON.stringify(body));
  };

  const readJson = (req) =>
    new Promise((resolve, reject) => {
      let size = 0;
      const chunks = [];
      req.on('data', (chunk) => {
        size += chunk.length;
        if (size > MAX_BODY_BYTES) {
          reject(new Error('too_large'));
          req.destroy();
          return;
        }
        chunks.push(chunk);
      });
      req.on('end', () => {
        try {
          resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'));
        } catch {
          reject(new Error('bad_json'));
        }
      });
      req.on('error', reject);
    });

  /** Detrás de nginx el cliente real viene en X-Forwarded-For. */
  const clientKey = (req) =>
    String(req.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? '')
      .split(',')[0]
      .trim();

  return http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');

    if (req.method === 'GET' && url.pathname === '/auth/health') {
      return send(res, 200, { status: 'ok' });
    }

    if (req.method === 'GET' && url.pathname === '/auth/me') {
      const bearer = String(req.headers.authorization ?? '').replace(
        /^Bearer /,
        ''
      );
      const data = verifyToken(config.secret, bearer);
      if (!data) return send(res, 401, { error: 'invalid_token' });
      return send(res, 200, { profile: data.profile, expiresAt: data.exp * 1000 });
    }

    if (req.method === 'POST' && url.pathname === '/auth/login') {
      const key = clientKey(req);
      const wait = limiter.retryAfter(key);
      if (wait > 0) {
        return send(
          res,
          429,
          { error: 'too_many_attempts', retryAfter: wait },
          { 'Retry-After': String(wait) }
        );
      }

      let body;
      try {
        body = await readJson(req);
      } catch (error) {
        return send(res, error.message === 'too_large' ? 413 : 400, {
          error: 'bad_request'
        });
      }

      if (!checkPassword(config.env, body.profile, body.password)) {
        limiter.fail(key);
        // Misma respuesta para perfil inexistente y contraseña errónea
        return send(res, 401, { error: 'invalid_credentials' });
      }

      limiter.succeed(key);
      const token = signToken(config.secret, body.profile, config.ttlSeconds);
      return send(res, 200, {
        token,
        profile: body.profile,
        expiresAt: Date.now() + config.ttlSeconds * 1000
      });
    }

    return send(res, 404, { error: 'not_found' });
  });
}

module.exports = { readConfig, createServer };

if (require.main === module) {
  const config = readConfig(process.env);
  const port = Number(process.env.PORT ?? 3000);
  createServer(config).listen(port, () => {
    console.log(`Servicio de acceso escuchando en el puerto ${port}`);
  });
}
