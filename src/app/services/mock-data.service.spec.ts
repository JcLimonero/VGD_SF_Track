import { TestBed } from '@angular/core/testing';
import { MockDataService } from './mock-data.service';

describe('MockDataService', () => {
  let service: MockDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getSalesforceTables', () => {
    it('lists the honda tables', () => {
      const tables = service.getSalesforceTables();
      expect(tables.length).toBeGreaterThan(0);
      expect(tables.every((t) => t.includes('honda'))).toBeTrue();
    });

    it('returns a copy so callers cannot mutate the source', () => {
      const first = service.getSalesforceTables();
      first.push('mutated');
      expect(service.getSalesforceTables()).not.toContain('mutated');
    });

    it('falls back to the table name when there is no label', () => {
      expect(service.getSalesforceTableLabel('tabla_desconocida')).toBe(
        'tabla_desconocida'
      );
    });
  });

  describe('getSalesforceTable', () => {
    it('returns rows for a known table', (done) => {
      const table = service.getSalesforceTables()[0];
      service.getSalesforceTable(table, { perpage: 5 }).subscribe((res) => {
        expect(res.items.length).toBe(5);
        expect(res.total).toBeGreaterThan(0);
        done();
      });
    });

    it('returns an empty result for an unknown table', (done) => {
      service.getSalesforceTable('no_existe').subscribe((res) => {
        expect(res.items).toEqual([]);
        expect(res.total).toBe(0);
        done();
      });
    });

    it('serves a different schema per table', (done) => {
      const [orders, leads] = service.getSalesforceTables();
      service.getSalesforceTable(orders, { perpage: 1 }).subscribe((a) => {
        service.getSalesforceTable(leads, { perpage: 1 }).subscribe((b) => {
          expect(Object.keys(a.items[0])).not.toEqual(Object.keys(b.items[0]));
          done();
        });
      });
    });
  });

  // Estas pruebas cubren el comportamiento compartido de `query()` (filtros,
  // orden y paginación), que también usa Integración SF.
  describe('getHondaSf', () => {
    it('paginates and reports the full total', (done) => {
      service.getHondaSf({ page: 1, perpage: 5 }).subscribe((res) => {
        expect(res.items.length).toBe(5);
        expect(res.total).toBeGreaterThan(5);
        done();
      });
    });

    it('returns a different slice on the second page', (done) => {
      service.getHondaSf({ page: 1, perpage: 5 }).subscribe((first) => {
        service.getHondaSf({ page: 2, perpage: 5 }).subscribe((second) => {
          expect(second.items[0].id).not.toBe(first.items[0].id);
          expect(second.total).toBe(first.total);
          done();
        });
      });
    });

    it('filters by an exact numeric field', (done) => {
      service.getHondaSf({ id: 3 }).subscribe((res) => {
        expect(res.total).toBe(1);
        expect(res.items[0].id).toBe(3);
        done();
      });
    });

    it('filters strings by case-insensitive substring', (done) => {
      service.getHondaSf({ sync_status: 'pendiente', perpage: 100 }).subscribe((res) => {
        expect(res.total).toBeGreaterThan(0);
        expect(
          res.items.every((i: any) =>
            i.sync_status.toLowerCase().includes('pendiente')
          )
        ).toBeTrue();
        done();
      });
    });

    it('filters by a field of the record', (done) => {
      service.getHondaSf({ sf_object: 'Lead', perpage: 100 }).subscribe((res) => {
        expect(res.items.length).toBeGreaterThan(0);
        expect(res.items.every((i) => i.sf_object === 'Lead')).toBeTrue();
        done();
      });
    });

    it('ignores unknown filter keys instead of returning nothing', (done) => {
      service.getHondaSf({ campo_inexistente: 'x' }).subscribe((res) => {
        expect(res.total).toBeGreaterThan(0);
        done();
      });
    });

    it('ignores empty filter values', (done) => {
      service.getHondaSf({ vin: '' }).subscribe((withEmpty) => {
        service.getHondaSf({}).subscribe((withNone) => {
          expect(withEmpty.total).toBe(withNone.total);
          done();
        });
      });
    });

    it('sorts ascending and descending', (done) => {
      service
        .getHondaSf({ orderby: 'year', ordertype: 'asc', perpage: 100 })
        .subscribe((asc) => {
          const values = asc.items.map((i: any) => i.year);
          expect(values).toEqual([...values].sort((a, b) => a - b));

          service
            .getHondaSf({ orderby: 'year', ordertype: 'desc', perpage: 100 })
            .subscribe((desc) => {
              expect(desc.items[0].year).toBe(values[values.length - 1]);
              done();
            });
        });
    });

    it('pushes null values to the end when sorting', (done) => {
      service
        .getHondaSf({ orderby: 'sf_id', ordertype: 'asc', perpage: 100 })
        .subscribe((res) => {
          const firstNullIndex = res.items.findIndex((i: any) => i.sf_id === null);
          expect(firstNullIndex).toBeGreaterThan(-1);
          // A partir del primer nulo, todos deben ser nulos
          expect(
            res.items.slice(firstNullIndex).every((i: any) => i.sf_id === null)
          ).toBeTrue();
          done();
        });
    });

    it('returns every record when the download variant is used', (done) => {
      service.getHondaSf({ page: 1, perpage: 5 }).subscribe((paged) => {
        service.getAllHondaSf({ perpage: 5 }).subscribe((all) => {
          expect(all.items.length).toBe(paged.total);
          done();
        });
      });
    });
  });
});
