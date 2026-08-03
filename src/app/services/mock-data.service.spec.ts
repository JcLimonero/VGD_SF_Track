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

  describe('getCrabiOrders', () => {
    it('paginates and reports the full total', (done) => {
      service.getCrabiOrders({ page: 1, perpage: 5 }).subscribe((res) => {
        expect(res.items.length).toBe(5);
        expect(res.total).toBeGreaterThan(5);
        done();
      });
    });

    it('returns a different slice on the second page', (done) => {
      service.getCrabiOrders({ page: 1, perpage: 5 }).subscribe((first) => {
        service.getCrabiOrders({ page: 2, perpage: 5 }).subscribe((second) => {
          expect(second.items[0].id).not.toBe(first.items[0].id);
          expect(second.total).toBe(first.total);
          done();
        });
      });
    });

    it('filters by an exact numeric field', (done) => {
      service.getCrabiOrders({ id: 3 }).subscribe((res) => {
        expect(res.total).toBe(1);
        expect(res.items[0].id).toBe(3);
        done();
      });
    });

    it('filters strings by case-insensitive substring', (done) => {
      service.getCrabiOrders({ status: 'pendiente' }).subscribe((res) => {
        expect(res.total).toBeGreaterThan(0);
        expect(
          res.items.every((i: any) => i.status.toLowerCase().includes('pendiente'))
        ).toBeTrue();
        done();
      });
    });

    it('ignores unknown filter keys instead of returning nothing', (done) => {
      service.getCrabiOrders({ campo_inexistente: 'x' }).subscribe((res) => {
        expect(res.total).toBeGreaterThan(0);
        done();
      });
    });

    it('ignores empty filter values', (done) => {
      service.getCrabiOrders({ vin: '' }).subscribe((withEmpty) => {
        service.getCrabiOrders({}).subscribe((withNone) => {
          expect(withEmpty.total).toBe(withNone.total);
          done();
        });
      });
    });

    it('sorts ascending and descending', (done) => {
      service
        .getCrabiOrders({ orderby: 'premium', ordertype: 'asc', perpage: 100 })
        .subscribe((asc) => {
          const values = asc.items.map((i: any) => i.premium);
          expect(values).toEqual([...values].sort((a, b) => a - b));

          service
            .getCrabiOrders({ orderby: 'premium', ordertype: 'desc', perpage: 100 })
            .subscribe((desc) => {
              expect(desc.items[0].premium).toBe(values[values.length - 1]);
              done();
            });
        });
    });

    it('pushes null values to the end when sorting', (done) => {
      service
        .getCrabiOrders({ orderby: 'policy_number', ordertype: 'asc', perpage: 100 })
        .subscribe((res) => {
          const firstNullIndex = res.items.findIndex(
            (i: any) => i.policy_number === null
          );
          if (firstNullIndex === -1) {
            done();
            return;
          }
          // A partir del primer nulo, todos deben ser nulos
          expect(
            res.items.slice(firstNullIndex).every((i: any) => i.policy_number === null)
          ).toBeTrue();
          done();
        });
    });

    it('getAllCrabiOrders returns every row regardless of perpage', (done) => {
      service.getCrabiOrders({ page: 1, perpage: 5 }).subscribe((paged) => {
        service.getAllCrabiOrders({ perpage: 5 }).subscribe((all) => {
          expect(all.items.length).toBe(paged.total);
          done();
        });
      });
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

  describe('getHondaSf', () => {
    it('paginates the results', (done) => {
      service.getHondaSf({ page: 1, perpage: 5 }).subscribe((res) => {
        expect(res.items.length).toBe(5);
        expect(res.total).toBeGreaterThan(5);
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
