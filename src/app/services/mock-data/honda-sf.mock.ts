/**
 * Datos de prueba para el módulo de Honda SF.
 *
 * IMPORTANTE: todavía no está definida la fuente de esta pestaña ni existe un
 * endpoint en la API de Vanguardia, así que tanto el esquema como los nombres
 * de los campos son provisionales y deben reemplazarse cuando se conozcan los
 * reales. Sirven para revisar la interfaz, no como referencia del modelo.
 */

const DEALERS = [
  { code: 'HND-01', name: 'Honda Polanco' },
  { code: 'HND-02', name: 'Honda Satelite' },
  { code: 'HND-03', name: 'Honda Interlomas' },
  { code: 'HND-04', name: 'Honda Queretaro' },
  { code: 'HND-05', name: 'Honda Puebla' }
];

const SF_OBJECTS = ['Order', 'Lead', 'Asset', 'Case'];
const MODELS = ['Civic', 'CR-V', 'HR-V', 'Accord', 'Pilot', 'City'];
const SYNC_STATUSES = ['Sincronizado', 'Pendiente', 'Error', 'En proceso'];
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
    const dealer = pick(DEALERS, i);
    const sent = i % 4 !== 0;
    const failed = sent && i % 9 === 0;

    rows.push({
      id: i,
      record_id: `HSF${pad(i, 6)}`,
      sf_object: pick(SF_OBJECTS, i),
      sf_id: sent && !failed ? `006${pad(i * 11, 12)}` : null,
      dealer_code: dealer.code,
      dealerName: dealer.name,
      order_dms: `ORD${pad(i * 5, 6)}`,
      vin: `HND${pad(i * 13, 8)}`,
      model: pick(MODELS, i + 1),
      year: 2020 + (i % 5),
      customer_name: `${pick(FIRST_NAMES, i)} ${pick(LAST_NAMES, i + 2)}`,
      customer_email: `cliente${i}@example.com`,
      sync_status: failed ? 'Error' : pick(SYNC_STATUSES, i),
      sent_to_sf: sent ? 1 : 0,
      response_code: sent ? (failed ? '400' : '200') : null,
      error_message: failed ? 'Campo requerido faltante en el objeto de Salesforce' : null,
      created_at: isoDaysAgo(i % 90),
      last_sync_at: sent ? isoDaysAgo((i % 90) - 1 < 0 ? 0 : (i % 90) - 1) : null
    });
  }
  return rows;
}

export const HONDA_SF_MOCK: any[] = build(47);
