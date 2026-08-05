/**
 * Datos de prueba para el módulo de Salesforce (esquema `vgd_dwh_prod`,
 * tablas cuyo nombre contiene "honda").
 *
 * IMPORTANTE: todavía no existe un endpoint en la API de Vanguardia para esta
 * información. Tanto los nombres de las tablas como los de sus campos son
 * provisionales y deben reemplazarse cuando se conozca el esquema real.
 *
 * Cada tabla tiene un esquema distinto a propósito: la tabla de Salesforce
 * construye sus columnas dinámicamente, y esto ejercita ese comportamiento.
 */

const AGENCIES = [
  { id: 1, name: 'Honda Polanco' },
  { id: 2, name: 'Honda Satelite' },
  { id: 3, name: 'Honda Interlomas' },
  { id: 4, name: 'Honda Queretaro' }
];

const MODELS = ['Civic', 'CR-V', 'HR-V', 'Accord', 'Pilot', 'City'];
const FIRST_NAMES = ['Juan', 'Maria', 'Carlos', 'Ana', 'Luis', 'Sofia'];
const LAST_NAMES = ['Garcia', 'Martinez', 'Lopez', 'Hernandez', 'Perez'];
const SERVICE_TYPES = ['Mantenimiento', 'Garantia', 'Hojalateria', 'Diagnostico'];
const CAMPAIGNS = ['Web', 'Referido', 'Showroom', 'Telemarketing'];

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

function buildOrders(count: number): any[] {
  const rows: any[] = [];
  for (let i = 1; i <= count; i++) {
    const agency = pick(AGENCIES, i);
    rows.push({
      id: i,
      order_dms: `HON-ORD-${pad(i, 6)}`,
      vin: `HND${pad(i * 5, 8)}`,
      idAgency: agency.id,
      agencyName: agency.name,
      model: pick(MODELS, i),
      year: 2021 + (i % 4),
      total_amount: Number((((i * 911) % 400000) + 150000).toFixed(2)),
      billing_date: isoDaysAgo(i % 120),
      sendedSalesForce: i % 3 === 0 ? '1' : '0',
      idSalesForce: i % 3 === 0 ? `006HN${pad(i, 8)}` : null,
      colDate: isoDaysAgo(i % 5)
    });
  }
  return rows;
}

function buildLeads(count: number): any[] {
  const rows: any[] = [];
  for (let i = 1; i <= count; i++) {
    const agency = pick(AGENCIES, i);
    rows.push({
      id: i,
      lead_no: `HON-LEAD-${pad(i, 5)}`,
      full_name: `${pick(FIRST_NAMES, i)} ${pick(LAST_NAMES, i + 2)}`,
      email: `honda.lead${i}@example.com`,
      phone: `55${pad((i * 191) % 100000000, 8)}`,
      idAgency: agency.id,
      agencyName: agency.name,
      model_interest: pick(MODELS, i + 1),
      campaign: pick(CAMPAIGNS, i),
      stage: i % 4 === 0 ? 'Cerrado Ganado' : 'En proceso',
      score: (i * 13) % 100,
      sendedSalesForce: i % 2 === 0 ? '1' : '0',
      idSalesForce: i % 2 === 0 ? `00QHN${pad(i, 8)}` : null,
      colDate: isoDaysAgo(i % 8)
    });
  }
  return rows;
}

function buildServices(count: number): any[] {
  const rows: any[] = [];
  for (let i = 1; i <= count; i++) {
    const agency = pick(AGENCIES, i);
    rows.push({
      id: i,
      service_order: `HON-SRV-${pad(i, 6)}`,
      vin: `HND${pad(i * 5, 8)}`,
      idAgency: agency.id,
      agencyName: agency.name,
      service_type: pick(SERVICE_TYPES, i),
      advisor: `${pick(FIRST_NAMES, i + 3)} ${pick(LAST_NAMES, i)}`,
      km: (i * 1237) % 90000,
      labor_amount: Number((((i * 317) % 8000) + 800).toFixed(2)),
      parts_amount: Number((((i * 523) % 12000) + 400).toFixed(2)),
      service_date: isoDaysAgo(i % 60),
      sendedSalesForce: i % 3 === 1 ? '1' : '0',
      colDate: isoDaysAgo(i % 6)
    });
  }
  return rows;
}

function buildInventory(count: number): any[] {
  const rows: any[] = [];
  for (let i = 1; i <= count; i++) {
    const agency = pick(AGENCIES, i);
    rows.push({
      id: i,
      vin: `HND${pad(i * 11, 8)}`,
      idAgency: agency.id,
      agencyName: agency.name,
      model: pick(MODELS, i + 2),
      year: 2022 + (i % 3),
      exterior_color: pick(['Blanco', 'Negro', 'Gris', 'Rojo', 'Azul'], i),
      list_price: Number((((i * 1301) % 350000) + 400000).toFixed(2)),
      stock_days: (i * 7) % 180,
      status: i % 4 === 0 ? 'Vendido' : 'Disponible',
      sendedSalesForce: i % 2 === 1 ? '1' : '0',
      colDate: isoDaysAgo(i % 4)
    });
  }
  return rows;
}

/** Tablas disponibles, en el orden en que se muestran las sub-pestañas. */
export const SALESFORCE_HONDA_TABLES: string[] = [
  'honda_orders',
  'honda_leads',
  'honda_services',
  'honda_inventory'
];

/** Etiqueta legible para cada sub-pestaña. */
export const SALESFORCE_HONDA_LABELS: Record<string, string> = {
  honda_orders: 'Ordenes',
  honda_leads: 'Leads',
  honda_services: 'Servicios',
  honda_inventory: 'Inventario'
};

export const SALESFORCE_HONDA_MOCK: Record<string, any[]> = {
  honda_orders: buildOrders(37),
  honda_leads: buildLeads(52),
  honda_services: buildServices(29),
  honda_inventory: buildInventory(45)
};
