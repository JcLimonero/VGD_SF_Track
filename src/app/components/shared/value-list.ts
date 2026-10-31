/** Máximo de valores que se buscan en una corrida. */
export const MAX_LIST_VALUES = 200;

export interface ParsedList {
  values: string[];
  /** Repetidos que se descartaron. */
  duplicates: number;
}

/**
 * Separa un listado pegado (saltos de línea, comas, punto y coma o espacios),
 * quita vacíos y repetidos y conserva el orden de captura. Los VIN van en
 * mayúsculas; los números de pedido se respetan como se escribieron, porque la
 * API compara exacto.
 */
export function parseValueList(
  text: string,
  options: { uppercase?: boolean } = {}
): ParsedList {
  const seen = new Set<string>();
  let duplicates = 0;
  for (const raw of (text ?? '').split(/[\s,;]+/)) {
    let value = raw.trim();
    if (!value) continue;
    if (options.uppercase) value = value.toUpperCase();
    if (seen.has(value)) {
      duplicates++;
    } else {
      seen.add(value);
    }
  }
  return { values: [...seen], duplicates };
}
