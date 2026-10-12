/** Base de Salesforce Lightning del grupo. */
const SALESFORCE_BASE = 'https://grupovanguardiamx.lightning.force.com';

/** URL del registro (Opportunity) en Salesforce a partir de su id. */
export function salesForceUrl(idSalesForce: string): string {
  return `${SALESFORCE_BASE}/lightning/r/Opportunity/${idSalesForce}/view`;
}

/**
 * El enlace solo está disponible si el envío a Salesforce fue correcto
 * (`insertCorrect` = 1) y existe el `idSalesForce`.
 */
export function canOpenSalesForce(row: any): boolean {
  const inserted = row?.insertCorrect === '1' || row?.insertCorrect === 1;
  return inserted && !!row?.idSalesForce;
}

export function openInSalesForce(row: any): void {
  if (!canOpenSalesForce(row)) return;
  window.open(salesForceUrl(row.idSalesForce), '_blank', 'noopener');
}

export type SalesForceStatus = 'success' | 'warning' | 'error';

/**
 * Estado del envío a Salesforce de un registro:
 * - warning: todavía no se envía (`sendedSalesForce` = 0) o no hay información.
 * - success: se envió y se insertó bien (`insertCorrect` = 1).
 * - error: se envió pero Salesforce lo rechazó (`insertCorrect` = 0).
 */
export function salesForceStatus(row: any): SalesForceStatus {
  const sent = row?.sendedSalesForce;
  if (sent === '0' || sent === 0) return 'warning';

  const inserted = row?.insertCorrect;
  if (inserted === '1' || inserted === 1) return 'success';
  if (inserted === '0' || inserted === 0) return 'error';
  return 'warning';
}

/** Registro enviado a Salesforce (`sendedSalesForce` = 1). */
export function wasSentToSalesForce(row: any): boolean {
  return row?.sendedSalesForce === '1' || row?.sendedSalesForce === 1;
}

/** Campos que se reinician para que el registro vuelva a viajar a Salesforce. */
export function resendPayload(row: any): any {
  return {
    ...row,
    sendedSalesForce: '0',
    insertCorrect: '0',
    resultSF: '',
    idSalesForce: null
  };
}
