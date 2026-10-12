/** Máximo de VIN que se validan en una corrida. */
export const MAX_VINS = 200;

/** Longitud estándar de un VIN. */
const VIN_LENGTH = 17;

/** Valor de `typeDescription` que identifica una unidad demo en el inventario. */
const DEMO_TYPE = 'demo';

export type DemoResult = 'demo' | 'not_demo' | 'not_found' | 'error';

export interface ParsedVins {
  vins: string[];
  /** VIN repetidos que se descartaron. */
  duplicates: number;
}

export interface DemoValidationRow {
  vin: string;
  result: DemoResult;
  /** Longitud distinta de 17: se consulta igual, pero se avisa. */
  invalidFormat: boolean;
  typeDescription: string;
  statusDescription: string;
  agencyName: string;
  brand: string;
  model: string;
  year: string;
  /** Para armar el enlace a Salesforce. */
  idSalesForce: string;
  insertCorrect: string;
  sendedSalesForce: string;
  resultSF: string;
  /** Registro completo de la API; hace falta para reenviar. */
  raw: any | null;
}

/**
 * Separa por saltos de línea, comas, punto y coma o espacios; pasa a
 * mayúsculas, quita vacíos y repetidos conservando el orden de captura.
 */
export function parseVins(text: string): ParsedVins {
  const seen = new Set<string>();
  let duplicates = 0;
  for (const raw of (text ?? '').split(/[\s,;]+/)) {
    const vin = raw.trim().toUpperCase();
    if (!vin) continue;
    if (seen.has(vin)) {
      duplicates++;
    } else {
      seen.add(vin);
    }
  }
  return { vins: [...seen], duplicates };
}

export function hasValidLength(vin: string): boolean {
  return vin.length === VIN_LENGTH;
}

/**
 * Clasifica un VIN según las filas que devolvió el inventario.
 *
 * El filtro `vin` de la API es de coincidencia exacta, pero igual se filtra
 * aquí por si devolviera filas ajenas. Si hay varias filas del mismo VIN,
 * basta con que una sea demo.
 */
export function classifyVin(vin: string, items: any[]): DemoValidationRow {
  const matches = (items ?? []).filter(
    (item) => String(item?.vin ?? '').trim().toUpperCase() === vin
  );
  const chosen =
    matches.find((item) => isDemoType(item?.typeDescription)) ?? matches[0];

  const base: DemoValidationRow = {
    vin,
    result: 'not_found',
    invalidFormat: !hasValidLength(vin),
    typeDescription: '',
    statusDescription: '',
    agencyName: '',
    brand: '',
    model: '',
    year: '',
    idSalesForce: '',
    insertCorrect: '',
    sendedSalesForce: '',
    resultSF: '',
    raw: null
  };
  if (!chosen) return base;

  return {
    ...base,
    result: isDemoType(chosen.typeDescription) ? 'demo' : 'not_demo',
    typeDescription: chosen.typeDescription ?? '',
    statusDescription: chosen.statusDescription ?? '',
    agencyName: chosen.agencyName ?? '',
    brand: chosen.brand ?? '',
    model: chosen.model ?? '',
    year: chosen.year != null ? String(chosen.year) : '',
    idSalesForce: chosen.idSalesForce ?? '',
    insertCorrect:
      chosen.insertCorrect != null ? String(chosen.insertCorrect) : '',
    sendedSalesForce:
      chosen.sendedSalesForce != null ? String(chosen.sendedSalesForce) : '',
    resultSF: chosen.resultSF ?? '',
    raw: chosen
  };
}

export function errorRow(vin: string): DemoValidationRow {
  return { ...classifyVin(vin, []), result: 'error' };
}

function isDemoType(type: unknown): boolean {
  return (
    String(type ?? '')
      .trim()
      .toLowerCase() === DEMO_TYPE
  );
}

export const RESULT_LABELS: Record<DemoResult, string> = {
  demo: 'Es demo',
  not_demo: 'No es demo',
  not_found: 'No encontrado',
  error: 'Error de consulta'
};
