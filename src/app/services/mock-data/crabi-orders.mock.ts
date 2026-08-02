/**
 * Datos de prueba para el módulo de Crabi (tabla `orders_to_crabi`).
 *
 * IMPORTANTE: todavía no existe un endpoint en la API de Vanguardia para esta
 * información, por lo que los nombres de los campos son provisionales y deben
 * reemplazarse cuando se conozca el esquema real de la tabla.
 */

const AGENCIES = [
  { id: 1, name: 'Vanguardia Polanco' },
  { id: 2, name: 'Vanguardia Satelite' },
  { id: 3, name: 'Vanguardia Interlomas' },
  { id: 4, name: 'Vanguardia Cuernavaca' },
  { id: 5, name: 'Vanguardia Queretaro' }
];

const BRANDS = ['Toyota', 'Nissan', 'Honda', 'Mazda', 'Kia'];
const MODELS = ['Corolla', 'Sentra', 'Civic', 'CX-5', 'Rio'];
const PLANS = ['Amplia', 'Limitada', 'RC Basica'];
const STATUSES = ['Enviado', 'Pendiente', 'Rechazado', 'En proceso'];
const FIRST_NAMES = ['Juan', 'Maria', 'Carlos', 'Ana', 'Luis', 'Sofia'];
const LAST_NAMES = ['Garcia', 'Martinez', 'Lopez', 'Hernandez', 'Perez'];

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function pad(n: number, len: number): string {
  return String(n).padStart(len, '0');
}

function isoDaysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 19).replace('T', ' ');
}

function build(count: number): any[] {
  const rows: any[] = [];
  for (let i = 1; i <= count; i++) {
    const agency = pick(AGENCIES, i);
    const sent = i % 3 !== 0;
    rows.push({
      id: i,
      order_dms: `ORD${pad(i, 6)}`,
      vin: `VIN${pad(i * 7, 8)}`,
      idAgency: agency.id,
      agencyName: agency.name,
      customer_name: `${pick(FIRST_NAMES, i)} ${pick(LAST_NAMES, i + 1)}`,
      customer_email: `cliente${i}@example.com`,
      customer_phone: `55${pad((i * 137) % 100000000, 8)}`,
      brand: pick(BRANDS, i),
      model: pick(MODELS, i + 2),
      year: 2020 + (i % 5),
      plan: pick(PLANS, i),
      premium: Number((((i * 733) % 25000) + 5000).toFixed(2)),
      policy_number: sent ? `POL-${pad(i, 7)}` : null,
      crabi_quote_id: `QT-${pad(i * 3, 6)}`,
      status: pick(STATUSES, i),
      sent_to_crabi: sent ? 1 : 0,
      response_code: sent ? (i % 7 === 0 ? '422' : '200') : null,
      error_message: sent && i % 7 === 0 ? 'Validacion de datos del cliente fallida' : null,
      created_at: isoDaysAgo(i % 90),
      sent_at: sent ? isoDaysAgo((i % 90) - 1 < 0 ? 0 : (i % 90) - 1) : null
    });
  }
  return rows;
}

export const CRABI_ORDERS_MOCK: any[] = build(43);
