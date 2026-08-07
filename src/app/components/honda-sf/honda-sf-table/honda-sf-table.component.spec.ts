import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpRequest } from '@angular/common/http';
import { SimpleChange } from '@angular/core';
import { httpTestProviders } from '@testing/test-providers';
import { environment } from '../../../../environments/environment';

import { HondaSfTableComponent } from './honda-sf-table.component';
import { HONDA_SF_TABLES } from '../honda-sf.catalog';

const BASE = environment.api.baseUrl;
const CUSTOMERS = `${BASE}/vgd/portalhondacustomers`;
const LEADS = `${BASE}/vgd/portalhondaleads`;

/** Envoltorio con el que responden todos los endpoints `/vgd/*`. */
function apiPage(items: any[], total = items.length) {
  return { status: 200, message: 'ok', data: { data: items, total_rows: total } };
}

const ROWS = [
  {
    id: '1',
    dealer_id: '10017',
    customer_id: 'VGD-0000224524',
    customer_name: 'Mayra',
    customer_lastname: 'Mendez',
    email: 'mayra@example.com',
    mobile: '523311320281',
    city: 'Guadalajara',
    rfc: 'XAXX010101000',
    record_date: '2026-01-01',
    created_at: '2026-06-30 02:11:52',
    birthdate: '0000-00-00'
  },
  {
    id: '2',
    dealer_id: '99999999',
    customer_id: 'VGD-0000224525',
    customer_name: 'Luis',
    customer_lastname: 'Perez',
    email: 'luis@example.com',
    mobile: '5533112200',
    city: 'Colima',
    rfc: null,
    record_date: '2026-02-02',
    created_at: '2026-07-01 09:00:00',
    birthdate: '1990-05-01'
  }
];

const AGENCIES = [{ idAgency: '10017', name: 'HONDA VANGUARDIA GALERIAS' }];

describe('HondaSfTableComponent', () => {
  let component: HondaSfTableComponent;
  let fixture: ComponentFixture<HondaSfTableComponent>;
  let httpMock: HttpTestingController;

  const isAgencies = (r: HttpRequest<any>) => r.url.includes('agenciesfilter');

  function flushAgencies(): void {
    httpMock.match(isAgencies).forEach((req) => req.flush(apiPage(AGENCIES)));
  }

  /** Responde la petición pendiente del endpoint dado y la devuelve. */
  function flushRows(url = CUSTOMERS, items = ROWS, total = items.length) {
    const req = httpMock.expectOne((r) => r.url === url);
    req.flush(apiPage(items, total));
    return req;
  }

  /** Arranca el componente con agencias y primera página resueltas. */
  function start(total = ROWS.length) {
    fixture.detectChanges();
    flushAgencies();
    flushRows(CUSTOMERS, ROWS, total);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HondaSfTableComponent],
      providers: httpTestProviders
    }).compileComponents();

    fixture = TestBed.createComponent(HondaSfTableComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('opens on the first table of the catalog', () => {
    expect(component.table).toBe(HONDA_SF_TABLES[0].id);
    expect(component.table).toBe('portalhondacustomers');
  });

  it('requests its endpoint on init with the default sort', () => {
    fixture.detectChanges();
    flushAgencies();

    const req = flushRows();
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page')).toBe('1');
    expect(req.request.params.get('perpage')).toBe('5');
    expect(req.request.params.get('orderby')).toBe('created_at');
    expect(req.request.params.get('ordertype')).toBe('desc');
  });

  it('maps items and total from the API envelope', () => {
    start(199480);

    expect(component.data.length).toBe(2);
    expect(component.total).toBe(199480);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeNull();
  });

  it('shows the dealer name and falls back to the code', () => {
    start();

    expect(component.data[0].dealerName).toBe('HONDA VANGUARDIA GALERIAS');
    // Sin coincidencia en el catálogo se muestra la clave, no un hueco
    expect(component.data[1].dealerName).toBe('99999999');
  });

  it('still renders the rows when the agency catalog fails', () => {
    spyOn(console, 'error');
    fixture.detectChanges();
    httpMock
      .match(isAgencies)
      .forEach((req) => req.flush('nope', { status: 500, statusText: 'Server Error' }));
    flushRows();

    expect(component.data.length).toBe(2);
    expect(component.data[0].dealerName).toBe('10017');
  });

  it('builds only the columns the catalog declares, plus the detail button', () => {
    start();

    const last = component.columns[component.columns.length - 1];
    expect(last.property).toBe('actions');
    expect(last.type).toBe('button');

    // `rfc` viene en el registro pero no es columna: se ve en el detalle
    expect(component.displayedColumns).not.toContain('rfc');
    expect(component.displayedColumns).not.toContain('id');
    expect(component.displayedColumns).toContain('dealerName');
    expect(component.displayedColumns).toContain('record_date');
  });

  it('does not offer to sort by columns the API cannot sort', () => {
    // `dealerName` se resuelve en el cliente y la API no la conoce;
    // `record_date` la conoce pero la ignora en este endpoint concreto
    expect(component.sortableColumns).not.toContain('dealerName');
    expect(component.sortableColumns).not.toContain('record_date');
    expect(component.sortableColumns).toContain('created_at');
  });

  it('sends the active filters and returns to page 1', () => {
    start();

    component.loadPage(2, 5);
    flushRows();
    expect(component.pageIndex).toBe(2);

    component.applyFilter({ dealer_id: '10017', email: 'mayra@example.com' });
    const req = flushRows();

    expect(req.request.params.get('dealer_id')).toBe('10017');
    expect(req.request.params.get('email')).toBe('mayra@example.com');
    expect(req.request.params.get('page')).toBe('1');
    expect(component.pageIndex).toBe(0);
    expect(component.hasActiveFilters).toBeTrue();
  });

  it('reports no active filters when every value is empty', () => {
    start();

    component.applyFilter({ dealer_id: '', email: '' });
    flushRows();

    expect(component.hasActiveFilters).toBeFalse();
  });

  it('sends the sort as orderby/ordertype and clears it when empty', () => {
    start();

    component.onSortChange({ column: 'customer_lastname', direction: 'asc' });
    const sorted = flushRows();
    expect(sorted.request.params.get('orderby')).toBe('customer_lastname');
    expect(sorted.request.params.get('ordertype')).toBe('asc');

    component.onSortChange({ column: '', direction: 'asc' });
    const cleared = flushRows();
    expect(component.currentSort).toBeNull();
    expect(cleared.request.params.has('orderby')).toBeFalse();
  });

  it('starts over when the sub-tab changes', () => {
    start();
    component.applyFilter({ email: 'mayra@example.com' });
    flushRows();

    component.table = 'portalhondaleads';
    component.ngOnChanges({
      table: new SimpleChange('portalhondacustomers', 'portalhondaleads', false)
    });

    // Los filtros de una tabla no existen en la otra: la API los ignoraría y
    // devolvería el listado completo como si no hubiera filtro
    expect(component.currentFilters).toEqual({});
    expect(component.columns).toEqual([]);
    expect(component.pageIndex).toBe(0);

    const req = flushRows(LEADS);
    expect(req.request.params.has('email')).toBeFalse();
    expect(req.request.params.get('orderby')).toBe('record_date');
  });

  it('shows an error message when the request fails', () => {
    fixture.detectChanges();
    flushAgencies();
    httpMock
      .expectOne((r) => r.url === CUSTOMERS)
      .flush('boom', { status: 500, statusText: 'Server Error' });

    expect(component.error).toContain('No se pudo cargar');
    expect(component.data).toEqual([]);
    expect(component.total).toBe(0);
    expect(component.loading).toBeFalse();
  });

  describe('fechas 0000-00-00', () => {
    // MySQL las usa para "sin capturar"; mostrarlas se lee como el año cero

    it('leaves them blank on screen', () => {
      start();
      expect(component.data[0].birthdate).toBe('');
      // Una fecha real no se toca
      expect(component.data[1].birthdate).toBe('1990-05-01');
    });

    it('keeps them in the Excel', () => {
      // El Excel es el respaldo de lo que hay en la base: en blanco no se
      // distinguiría de un campo realmente vacío
      const rows = component.buildExcelRows([ROWS[0]]);
      expect(rows[0]['Fecha de Nacimiento']).toBe('0000-00-00');
    });
  });

  describe('descarga de Excel', () => {
    it('does nothing when there is no data', () => {
      const warn = spyOn(console, 'warn');
      component.total = 0;
      component.downloadExcel();

      expect(warn).toHaveBeenCalled();
      expect(component.isDownloadingExcel).toBeFalse();
    });

    it('asks the user to filter instead of downloading 200 pages', () => {
      const alerted = spyOn(window, 'alert');
      start(199480);

      component.downloadExcel();

      expect(alerted).toHaveBeenCalled();
      expect(alerted.calls.mostRecent().args[0]).toContain('199,480');
      httpMock.expectNone((r) => r.url === CUSTOMERS);
      expect(component.isDownloadingExcel).toBeFalse();
    });

    it('pages at the API maximum and without sorting', () => {
      spyOn(console, 'error');
      start(2500);

      component.applyFilter({ dealer_id: '10017' });
      flushRows(CUSTOMERS, ROWS, 2500);

      component.downloadExcel();

      const pages = httpMock.match((r) => r.url === CUSTOMERS);
      expect(pages.length).toBe(3);
      expect(pages[0].request.params.get('perpage')).toBe('1000');
      expect(pages.map((p) => p.request.params.get('page'))).toEqual(['1', '2', '3']);

      // El filtro activo se respeta en todas las páginas
      pages.forEach((p) => expect(p.request.params.get('dealer_id')).toBe('10017'));

      // Sin ordenar: la API no desempata el ORDER BY, así que pedir las páginas
      // ordenadas devolvía filas repetidas y otras faltantes
      pages.forEach((p) => {
        expect(p.request.params.has('orderby')).toBeFalse();
        expect(p.request.params.has('ordertype')).toBeFalse();
      });

      // Se falla la primera para no generar el archivo dentro de la prueba;
      // forkJoin cancela las demás por sí solo
      pages[0].flush('x', { status: 500, statusText: 'Server Error' });
      expect(component.isDownloadingExcel).toBeFalse();
    });

    it('exports every field with a Spanish heading, not just the visible ones', () => {
      const rows = component.buildExcelRows([ROWS[0]]);

      expect(rows[0]['ID Cliente']).toBe('VGD-0000224524');
      expect(rows[0]['Correo']).toBe('mayra@example.com');
      // `rfc` no es columna de la tabla pero sí del Excel
      expect(rows[0]['RFC']).toBe('XAXX010101000');
      expect(rows[0]['Clave Distribuidor']).toBe('10017');
    });

    it('writes an empty cell instead of null', () => {
      const rows = component.buildExcelRows([ROWS[1]]);
      expect(rows[0]['RFC']).toBe('');
    });
  });
});
