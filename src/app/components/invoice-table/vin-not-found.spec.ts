import { isVinNotFoundError, vinFromError } from './vin-not-found';

// VIN inventado: el repositorio es público
const MESSAGE =
  'No se encontró el vehículo correspondiente al vin: VINPRUEBA00000001';

describe('vin-not-found', () => {
  it('reconoce el mensaje de Salesforce', () => {
    expect(isVinNotFoundError(MESSAGE)).toBeTrue();
  });

  it('tolera mayúsculas, acentos y texto alrededor', () => {
    expect(isVinNotFoundError(MESSAGE.toUpperCase())).toBeTrue();
    expect(
      isVinNotFoundError('No se encontro el vehiculo correspondiente al vin: X1')
    ).toBeTrue();
    expect(isVinNotFoundError(`Error: ${MESSAGE} (intento 2)`)).toBeTrue();
  });

  it('no confunde otros errores ni valores vacíos', () => {
    for (const value of [
      'No se encontró la oportunidad',
      'Insert Correct',
      'UPSERT failed: DUPLICATE_VALUE',
      '',
      null,
      undefined,
      42
    ]) {
      expect(isVinNotFoundError(value)).withContext(String(value)).toBeFalse();
    }
  });

  it('extrae el VIN del mensaje en mayúsculas', () => {
    expect(vinFromError(MESSAGE)).toBe('VINPRUEBA00000001');
    expect(vinFromError(MESSAGE.replace('VINPRUEBA00000001', 'vinprueba00000001'))).toBe(
      'VINPRUEBA00000001'
    );
  });

  it('sin VIN en el mensaje devuelve null', () => {
    expect(vinFromError('No se encontró la oportunidad')).toBeNull();
    expect(vinFromError(null)).toBeNull();
  });
});
