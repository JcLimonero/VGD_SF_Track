/**
 * Mensaje que devuelve Salesforce (campo `resultSF`) cuando el VIN de la orden
 * no existe allá, por ejemplo:
 *
 *   "No se encontró el vehículo correspondiente al vin: <VIN>"
 *
 * El VIN sale en el texto, y la forma de escribir "encontró" y "vehículo" se
 * tolera con o sin acentos.
 */
const VIN_NOT_FOUND = /no se encontr[oó] el veh[ií]culo correspondiente al vin/i;

const VIN_IN_MESSAGE = /vin\s*:?\s*([A-Za-z0-9]{11,17})\b/i;

/** ¿El Resultado SF dice que el VIN no existe en Salesforce? */
export function isVinNotFoundError(resultSF: unknown): boolean {
  return typeof resultSF === 'string' && VIN_NOT_FOUND.test(resultSF);
}

/** VIN que menciona el mensaje, en mayúsculas, o null si no trae ninguno. */
export function vinFromError(resultSF: unknown): string | null {
  if (typeof resultSF !== 'string') return null;
  const match = VIN_IN_MESSAGE.exec(resultSF);
  return match ? match[1].toUpperCase() : null;
}
