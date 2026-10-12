'use strict';

/**
 * Lógica de acceso del portal, sin dependencias externas.
 *
 * Hay dos perfiles compartidos (no un usuario por persona). Cada uno tiene su
 * propia contraseña, que vive en una variable de entorno del servidor y nunca
 * viaja en el código del portal.
 */

const crypto = require('node:crypto');

/** Identificador del perfil -> variable de entorno de su contraseña. */
const PROFILES = {
  crabi: 'PASSWORD_CRABI',
  sales_force: 'PASSWORD_SALES_FORCE'
};

const b64 = (input) => Buffer.from(input).toString('base64url');

function hmac(secret, data) {
  return crypto.createHmac('sha256', secret).update(data).digest('base64url');
}

/** JWT HS256 con el perfil y la caducidad. */
function signToken(secret, profile, ttlSeconds, now = Date.now()) {
  const iat = Math.floor(now / 1000);
  const header = b64(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = b64(
    JSON.stringify({ profile, iat, exp: iat + ttlSeconds })
  );
  return `${header}.${payload}.${hmac(secret, `${header}.${payload}`)}`;
}

/** Devuelve el contenido del token, o null si es inválido o caducó. */
function verifyToken(secret, token, now = Date.now()) {
  if (typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [header, payload, signature] = parts;
  const expected = hmac(secret, `${header}.${payload}`);
  if (!safeEqual(signature, expected)) return null;

  let data;
  try {
    data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
  } catch {
    return null;
  }
  if (!data || !PROFILES[data.profile]) return null;
  if (typeof data.exp !== 'number' || data.exp * 1000 <= now) return null;
  return data;
}

/**
 * Forma de ruta que se acepta hacia la API: `/api/vgd/<recurso>[/<id>...]`, solo
 * con letras, números, guion y guion bajo. Todo lo demás se rechaza, así no hay
 * `..`, `%`, `;`, `\\` ni mayúsculas/minúsculas que esquiven la regla de abajo.
 */
const API_PATH = /^\/api\/vgd\/[A-Za-z0-9_-]+(\/[A-Za-z0-9_-]+)*\/?$/;

/** Recursos que puede usar CRABI: sus órdenes y el catálogo de agencias. */
const CRABI_RESOURCES = new Set(['orderscrabi', 'agenciesfilter']);

/** Recurso exclusivo de CRABI: SALES FORCE no lo ve. */
const CRABI_ONLY = 'orderscrabi';

/** Recursos que el portal modifica (PUT). El resto de la API es solo lectura. */
const WRITABLE_RESOURCES = new Set([
  'inventoryfilter',
  'customerfilter',
  'servicefilter',
  'leadsfilter',
  'invoice',
  'orderscrabi'
]);

/**
 * ¿Este perfil puede hacer esta llamada a la API? `path` debe ser la ruta ya
 * decodificada y normalizada por nginx (`$uri`), sin parámetros de consulta.
 * Solo se permiten GET y PUT, y PUT únicamente sobre los recursos que el portal
 * modifica: el token de proveedor no debe servir para borrar ni crear nada.
 */
function canAccess(profile, path, method = 'GET') {
  if (typeof path !== 'string' || !API_PATH.test(path)) return false;
  const resource = path.split('/')[3].toLowerCase();

  if (method === 'PUT') {
    if (!WRITABLE_RESOURCES.has(resource)) return false;
  } else if (method !== 'GET') {
    return false;
  }

  if (profile === 'crabi') return CRABI_RESOURCES.has(resource);
  if (profile === 'sales_force') return resource !== CRABI_ONLY;
  return false;
}

/** Comparación en tiempo constante, aunque los textos midan distinto. */
function safeEqual(a, b) {
  const hashA = crypto.createHash('sha256').update(String(a)).digest();
  const hashB = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

/** ¿La contraseña es la del perfil? Un perfil sin contraseña nunca entra. */
function checkPassword(env, profile, password) {
  const variable = PROFILES[profile];
  const expected = variable ? env[variable] : undefined;
  if (!expected || typeof password !== 'string') return false;
  return safeEqual(password, expected);
}

/**
 * Límite de intentos fallidos por cliente. Con contraseñas compartidas es la
 * defensa contra adivinarlas probando una tras otra.
 */
class RateLimiter {
  constructor(maxFailures = 5, windowMs = 15 * 60 * 1000, maxKeys = 10000) {
    this.maxFailures = maxFailures;
    this.windowMs = windowMs;
    this.maxKeys = maxKeys;
    this.failures = new Map();
  }

  /** Segundos que faltan para poder reintentar; 0 si no está bloqueado. */
  retryAfter(key, now = Date.now()) {
    const entry = this.failures.get(key);
    if (!entry) return 0;
    if (now - entry.first >= this.windowMs) {
      this.failures.delete(key);
      return 0;
    }
    if (entry.count < this.maxFailures) return 0;
    return Math.ceil((entry.first + this.windowMs - now) / 1000);
  }

  fail(key, now = Date.now()) {
    const entry = this.failures.get(key);
    if (!entry || now - entry.first >= this.windowMs) {
      this.makeRoom(now);
      this.failures.set(key, { count: 1, first: now });
    } else {
      entry.count++;
    }
  }

  succeed(key) {
    this.failures.delete(key);
  }

  /** Tope de memoria: tira lo vencido y, si aún no cabe, lo más antiguo. */
  makeRoom(now) {
    if (this.failures.size < this.maxKeys) return;
    for (const [key, entry] of this.failures) {
      if (now - entry.first >= this.windowMs) this.failures.delete(key);
    }
    while (this.failures.size >= this.maxKeys) {
      this.failures.delete(this.failures.keys().next().value);
    }
  }
}

module.exports = {
  PROFILES,
  signToken,
  verifyToken,
  checkPassword,
  canAccess,
  RateLimiter
};
