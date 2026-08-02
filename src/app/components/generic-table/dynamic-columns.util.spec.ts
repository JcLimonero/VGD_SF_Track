import { buildColumns, humanizeFieldName } from './dynamic-columns.util';

describe('humanizeFieldName', () => {
  it('converts snake_case to Title Case', () => {
    expect(humanizeFieldName('order_dms')).toBe('Order Dms');
  });

  it('splits camelCase', () => {
    expect(humanizeFieldName('idAgency')).toBe('Id Agency');
    expect(humanizeFieldName('sendedSalesForce')).toBe('Sended Sales Force');
  });

  it('handles kebab-case and repeated separators', () => {
    expect(humanizeFieldName('total-amount')).toBe('Total Amount');
    expect(humanizeFieldName('a__b')).toBe('A B');
  });

  it('leaves a single lowercase word capitalized', () => {
    expect(humanizeFieldName('vin')).toBe('Vin');
  });
});

describe('buildColumns', () => {
  const rows = [
    { id: 1, order_dms: 'ORD1', vin: 'VIN1', agencyName: 'Agencia 1' },
    { id: 2, order_dms: 'ORD2', vin: 'VIN2', agencyName: 'Agencia 2' }
  ];

  it('returns an empty array when there is no data', () => {
    expect(buildColumns([])).toEqual([]);
    expect(buildColumns(null as any)).toEqual([]);
  });

  it('derives one column per field of the first row', () => {
    const columns = buildColumns(rows);
    expect(columns.map((c) => c.property)).toEqual([
      'id',
      'order_dms',
      'vin',
      'agencyName'
    ]);
    expect(columns.every((c) => c.type === 'text')).toBeTrue();
  });

  it('applies label overrides and humanizes the rest', () => {
    const columns = buildColumns(rows, {
      labels: { order_dms: 'No. Orden' }
    });
    expect(columns.find((c) => c.property === 'order_dms')?.label).toBe('No. Orden');
    expect(columns.find((c) => c.property === 'agencyName')?.label).toBe('Agency Name');
  });

  it('excludes the requested fields', () => {
    const columns = buildColumns(rows, { exclude: ['id', 'vin'] });
    expect(columns.map((c) => c.property)).toEqual(['order_dms', 'agencyName']);
  });

  it('puts ordered fields first and keeps the rest in natural order', () => {
    const columns = buildColumns(rows, { order: ['agencyName', 'vin'] });
    expect(columns.map((c) => c.property)).toEqual([
      'agencyName',
      'vin',
      'id',
      'order_dms'
    ]);
  });

  it('ignores fields in `order` that are not present in the data', () => {
    const columns = buildColumns(rows, { order: ['does_not_exist', 'vin'] });
    expect(columns.map((c) => c.property)).toEqual([
      'vin',
      'id',
      'order_dms',
      'agencyName'
    ]);
  });

  it('does not resurrect an excluded field via `order`', () => {
    const columns = buildColumns(rows, { order: ['id'], exclude: ['id'] });
    expect(columns.map((c) => c.property)).not.toContain('id');
  });
});
