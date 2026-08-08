import {
  HONDA_SF_LABELS,
  HONDA_SF_TABLES,
  findHondaSfTable
} from './honda-sf.catalog';

describe('honda-sf.catalog', () => {
  it('lists the seven endpoints that exist', () => {
    // Los demás nombres (`portalhondaorders`, `portalhondaservices`...)
    // responden 401: estos son todos
    expect(HONDA_SF_TABLES.map((t) => t.id)).toEqual([
      'portalhondacustomers',
      'portalhondaleads',
      'portalhondaopportunities',
      'portalhondademos',
      'portalhondasales',
      'portalhondaquotes',
      'portalhondafinances'
    ]);
  });

  it('finds a table by its endpoint and nothing by an unknown one', () => {
    expect(findHondaSfTable('portalhondaleads')?.label).toBe('Leads');
    expect(findHondaSfTable('portalhondaorders')).toBeUndefined();
  });

  it('names every visible column in Spanish', () => {
    // Sin etiqueta la columna saldría con el nombre del campo humanizado
    HONDA_SF_TABLES.forEach((table) => {
      table.columns.forEach((field) => {
        expect(HONDA_SF_LABELS[field])
          .withContext(`${table.id} -> ${field}`)
          .toBeDefined();
      });
    });
  });

  it('names every filter and sorts by a visible column', () => {
    HONDA_SF_TABLES.forEach((table) => {
      expect(table.label).toBeTruthy();
      expect(table.sheet.length).toBeLessThanOrEqual(31); // límite de Excel
      expect(table.columns.length).toBeGreaterThan(0);

      // Ordenar por una columna que no se ve deja la tabla sin indicador
      expect(table.columns)
        .withContext(`${table.id} ordena por ${table.defaultSort.column}`)
        .toContain(table.defaultSort.column);

      // Y por una que la API ignora deja la tabla como si no hubiera orden
      expect(table.noSort ?? [])
        .withContext(`${table.id} ordena por ${table.defaultSort.column}`)
        .not.toContain(table.defaultSort.column);

      // Declarar como no ordenable algo que ni siquiera se muestra es señal de
      // que la columna se renombró y quedó la excepción colgando
      (table.noSort ?? []).forEach((field) => {
        expect(table.columns).withContext(`${table.id} -> ${field}`).toContain(field);
      });

      table.filters.forEach((filter) => {
        expect(filter.field).toBeTruthy();
        expect(filter.label).toBeTruthy();
      });
    });
  });

  it('starts every table with the dealer, like the other modules', () => {
    HONDA_SF_TABLES.forEach((table) => {
      expect(table.columns[0]).toBe('dealerName');
    });
  });

  it('lets every table be filtered by dealer', () => {
    HONDA_SF_TABLES.forEach((table) => {
      const dealer = table.filters.find((f) => f.field === 'dealer_id');
      expect(dealer?.fromAgencies).withContext(table.id).toBeTrue();
    });
  });

  it('does not repeat a filter field within a table', () => {
    HONDA_SF_TABLES.forEach((table) => {
      const fields = table.filters.map((f) => f.field);
      expect(new Set(fields).size).withContext(table.id).toBe(fields.length);
    });
  });

  it('gives every non-agency dropdown its list of values', () => {
    // La API compara exacto: un desplegable vacío no filtraría nada
    HONDA_SF_TABLES.forEach((table) => {
      table.filters
        .filter((f) => !f.fromAgencies && f.options)
        .forEach((f) => {
          expect(f.options!.length)
            .withContext(`${table.id} -> ${f.field}`)
            .toBeGreaterThan(0);
        });
    });
  });
});
