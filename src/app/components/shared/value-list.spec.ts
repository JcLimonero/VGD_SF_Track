import { MAX_LIST_VALUES, parseValueList } from './value-list';

describe('parseValueList', () => {
  it('separa por saltos de línea, comas, punto y coma y espacios', () => {
    const { values } = parseValueList('A1\nB2, C3;D4   E5\r\nF6');
    expect(values).toEqual(['A1', 'B2', 'C3', 'D4', 'E5', 'F6']);
  });

  it('quita vacíos y repetidos conservando el orden', () => {
    const result = parseValueList(' \n20905\n\n20906\n20905\n20905 ');
    expect(result.values).toEqual(['20905', '20906']);
    expect(result.duplicates).toBe(2);
  });

  it('respeta mayúsculas y minúsculas salvo que se pidan mayúsculas', () => {
    expect(parseValueList('or035411 OR035411').values).toEqual([
      'or035411',
      'OR035411'
    ]);
    expect(
      parseValueList('abc xyz ABC', { uppercase: true })
    ).toEqual({ values: ['ABC', 'XYZ'], duplicates: 1 });
  });

  it('devuelve vacío con texto vacío, nulo o solo separadores', () => {
    expect(parseValueList('').values).toEqual([]);
    expect(parseValueList(' \n , ; ').values).toEqual([]);
    expect(parseValueList(null as unknown as string).values).toEqual([]);
  });

  it('el tope por corrida es 200', () => {
    expect(MAX_LIST_VALUES).toBe(200);
  });
});
