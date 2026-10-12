import {
  classifyVin,
  errorRow,
  hasValidLength,
  parseVins
} from './demo-validation.util';

const VIN = '3KPFC4AA8VE219948';

describe('parseVins', () => {
  it('separa por saltos de línea, comas, punto y coma y espacios', () => {
    const { vins } = parseVins('AAA\nBBB, CCC;DDD   EEE\r\nFFF');
    expect(vins).toEqual(['AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF']);
  });

  it('pasa a mayúsculas y quita repetidos conservando el orden', () => {
    const result = parseVins('abc\nXYZ\nABC\nabc');
    expect(result.vins).toEqual(['ABC', 'XYZ']);
    expect(result.duplicates).toBe(2);
  });

  it('devuelve vacío con texto vacío o solo separadores', () => {
    expect(parseVins('').vins).toEqual([]);
    expect(parseVins(' \n , ; ').vins).toEqual([]);
  });
});

describe('hasValidLength', () => {
  it('acepta 17 caracteres y rechaza el resto', () => {
    expect(hasValidLength(VIN)).toBeTrue();
    expect(hasValidLength('ABC')).toBeFalse();
  });
});

describe('classifyVin', () => {
  const demoRow = {
    vin: VIN,
    typeDescription: 'Demo',
    statusDescription: 'Listo para venta',
    agencyName: 'KIA PUNTO SUR',
    brand: 'KIA',
    model: 'K3 SD',
    year: 2027
  };

  it('marca demo cuando el Tipo es Demo', () => {
    const row = classifyVin(VIN, [demoRow]);
    expect(row.result).toBe('demo');
    expect(row.statusDescription).toBe('Listo para venta');
    expect(row.year).toBe('2027');
  });

  it('no distingue mayúsculas ni espacios en el Tipo', () => {
    expect(classifyVin(VIN, [{ ...demoRow, typeDescription: ' DEMO ' }]).result).toBe('demo');
  });

  it('conserva los datos para el enlace a Salesforce', () => {
    const row = classifyVin(VIN, [
      { ...demoRow, idSalesForce: 'a0f1', insertCorrect: '1' }
    ]);
    expect(row.idSalesForce).toBe('a0f1');
    expect(row.insertCorrect).toBe('1');
  });

  it('marca no demo y conserva el tipo real', () => {
    const row = classifyVin(VIN, [{ ...demoRow, typeDescription: 'Nuevo' }]);
    expect(row.result).toBe('not_demo');
    expect(row.typeDescription).toBe('Nuevo');
  });

  it('marca no encontrado cuando no hay filas', () => {
    expect(classifyVin(VIN, []).result).toBe('not_found');
  });

  it('ignora filas de otro VIN que la API pudiera devolver', () => {
    const other = { ...demoRow, vin: 'OTROVIN0000000000' };
    expect(classifyVin(VIN, [other]).result).toBe('not_found');
  });

  it('con varias filas del mismo VIN basta con que una sea demo', () => {
    const rows = [{ ...demoRow, typeDescription: 'Nuevo' }, demoRow];
    expect(classifyVin(VIN, rows).result).toBe('demo');
  });

  it('avisa formato inválido sin dejar de consultar', () => {
    expect(classifyVin('ABC', []).invalidFormat).toBeTrue();
    expect(classifyVin(VIN, []).invalidFormat).toBeFalse();
  });
});

describe('errorRow', () => {
  it('genera una fila de error con el VIN', () => {
    const row = errorRow(VIN);
    expect(row.result).toBe('error');
    expect(row.vin).toBe(VIN);
  });
});
