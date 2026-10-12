import {
  canOpenSalesForce,
  openInSalesForce,
  resendPayload,
  salesForceStatus,
  salesForceUrl,
  wasSentToSalesForce
} from './salesforce-link';

describe('salesforce-link', () => {
  it('arma la URL de Lightning con el id', () => {
    expect(salesForceUrl('006ABC')).toBe(
      'https://grupovanguardiamx.lightning.force.com/lightning/r/Opportunity/006ABC/view'
    );
  });

  it('solo se habilita con insertCorrect 1 e idSalesForce', () => {
    expect(canOpenSalesForce({ insertCorrect: '1', idSalesForce: 'X' })).toBeTrue();
    expect(canOpenSalesForce({ insertCorrect: 1, idSalesForce: 'X' })).toBeTrue();
    expect(canOpenSalesForce({ insertCorrect: '0', idSalesForce: 'X' })).toBeFalse();
    expect(canOpenSalesForce({ insertCorrect: '1', idSalesForce: '' })).toBeFalse();
    expect(canOpenSalesForce({ insertCorrect: '1' })).toBeFalse();
    expect(canOpenSalesForce(null)).toBeFalse();
  });

  it('abre en pestaña nueva solo si está disponible', () => {
    const open = spyOn(window, 'open');
    openInSalesForce({ insertCorrect: '0', idSalesForce: 'X' });
    expect(open).not.toHaveBeenCalled();

    openInSalesForce({ insertCorrect: '1', idSalesForce: 'X' });
    expect(open).toHaveBeenCalledWith(salesForceUrl('X'), '_blank', 'noopener');
  });

  describe('salesForceStatus', () => {
    it('pendiente cuando aún no se envía', () => {
      expect(salesForceStatus({ sendedSalesForce: '0', insertCorrect: '1' })).toBe('warning');
    });
    it('éxito cuando se envió e insertó bien', () => {
      expect(salesForceStatus({ sendedSalesForce: '1', insertCorrect: '1' })).toBe('success');
    });
    it('error cuando se envió y Salesforce lo rechazó', () => {
      expect(salesForceStatus({ sendedSalesForce: '1', insertCorrect: '0' })).toBe('error');
    });
    it('pendiente cuando no hay información', () => {
      expect(salesForceStatus({})).toBe('warning');
    });
  });

  it('wasSentToSalesForce acepta texto y número', () => {
    expect(wasSentToSalesForce({ sendedSalesForce: '1' })).toBeTrue();
    expect(wasSentToSalesForce({ sendedSalesForce: 1 })).toBeTrue();
    expect(wasSentToSalesForce({ sendedSalesForce: '0' })).toBeFalse();
  });

  it('resendPayload reinicia los campos de envío y conserva el resto', () => {
    const payload = resendPayload({
      id: 7,
      vin: 'V',
      sendedSalesForce: '1',
      insertCorrect: '0',
      resultSF: 'boom',
      idSalesForce: 'X'
    });
    expect(payload).toEqual({
      id: 7,
      vin: 'V',
      sendedSalesForce: '0',
      insertCorrect: '0',
      resultSF: '',
      idSalesForce: null
    });
  });
});
