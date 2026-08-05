import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpRequest } from '@angular/common/http';
import { httpTestProviders } from '@testing/test-providers';
import { environment } from '../../../../environments/environment';

import { CrabiTableComponent } from './crabi-table.component';

const BASE = environment.api.baseUrl;

/** Envoltorio con el que responden todos los endpoints `/vgd/*`. */
function apiPage(items: any[], total = items.length) {
  return { status: 200, message: 'ok', data: { data: items, total_rows: total } };
}

const ORDERS = [
  {
    id: '1',
    idAgency: '88888',
    order_dms: '2160',
    invoice: 'GGGV1425',
    amount: '299990.00',
    vin: 'LB3F31046TG034231',
    brand: 'GEELY',
    model: 'EMGRAND',
    year: '2026',
    isSend: '1',
    captured_at: '2026-07-22 15:36:02',
    sent_at: '2026-08-01 21:14:24'
  },
  {
    id: '2',
    idAgency: '00000',
    order_dms: '32764',
    invoice: 'MJRMI27947',
    amount: '43990.00',
    vin: '3H1KD1340TD212377',
    brand: 'HONDA',
    model: 'XR150LEK',
    year: '2026',
    isSend: '0',
    captured_at: '2026-07-22 15:36:02',
    sent_at: null
  }
];

const AGENCIES = [{ idAgency: '88888', name: 'HONDA GUADALAJARA' }];

describe('CrabiTableComponent', () => {
  let component: CrabiTableComponent;
  let fixture: ComponentFixture<CrabiTableComponent>;
  let httpMock: HttpTestingController;

  const isOrders = (r: HttpRequest<any>) => r.url === `${BASE}/vgd/orderscrabi`;
  const isAgencies = (r: HttpRequest<any>) => r.url.includes('agenciesfilter');

  /** Responde el catálogo de agencias que se pide en ngOnInit. */
  function flushAgencies(): void {
    httpMock.match(isAgencies).forEach((req) => req.flush(apiPage(AGENCIES)));
  }

  /** Responde la petición de órdenes pendiente y la devuelve. */
  function flushOrders(items = ORDERS, total = items.length) {
    const req = httpMock.expectOne(isOrders);
    req.flush(apiPage(items, total));
    return req;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrabiTableComponent],
      providers: httpTestProviders
    }).compileComponents();

    fixture = TestBed.createComponent(CrabiTableComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('takes the labels of the visible columns from the column definitions', () => {
    // Las etiquetas no se declaran dos veces: las de la tabla salen de
    // `columns` y solo se declaran a mano las de los campos que no son columna
    component.columns
      .filter((col) => col.type !== 'button')
      .forEach((col) => {
        expect(component.detailLabels[col.property]).toBe(col.label);
      });
  });

  it('labels every field the endpoint returns', () => {
    // Si la API agrega un campo, el modal lo mostraria sin traducir; esta
    // prueba lo detecta antes de que llegue al navegador
    const returnedFields = Object.keys(ORDERS[0]).concat([
      'agencyName',
      'version',
      'external_color',
      'internal_color',
      'ndClientDMS',
      'ndConsultant',
      'id_status',
      'timestamp_dms',
      'request_body',
      'response_body'
    ]);

    returnedFields.forEach((field) => {
      expect(component.detailLabels[field]).toBeDefined();
    });
  });

  it('requests the real Crabi endpoint on init', () => {
    fixture.detectChanges();
    flushAgencies();

    const req = flushOrders();
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page')).toBe('1');
    expect(req.request.params.get('perpage')).toBe('5');
  });

  it('maps items and total from the API envelope', () => {
    fixture.detectChanges();
    flushAgencies();
    flushOrders(ORDERS, 638);

    expect(component.data.length).toBe(2);
    expect(component.total).toBe(638);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeNull();
  });

  it('resolves the agency name and falls back to the id', () => {
    fixture.detectChanges();
    flushAgencies();
    flushOrders();

    expect(component.data[0].agencyName).toBe('HONDA GUADALAJARA');
    // Sin coincidencia en el catálogo se muestra la clave, no un hueco
    expect(component.data[1].agencyName).toBe('00000');
  });

  it('still renders the rows when the agency catalog fails', () => {
    spyOn(console, 'error');
    fixture.detectChanges();
    httpMock
      .match(isAgencies)
      .forEach((req) =>
        req.flush('nope', { status: 500, statusText: 'Server Error' })
      );
    flushOrders();

    expect(component.data.length).toBe(2);
    expect(component.data[0].agencyName).toBe('88888');
  });

  it('sends the active filters as query params and returns to page 1', () => {
    fixture.detectChanges();
    flushAgencies();
    flushOrders();

    component.loadPage(2, 5);
    flushOrders();
    expect(component.pageIndex).toBe(2);

    component.applyFilter({ vin: 'LB3F', isSend: '0' });
    const req = flushOrders();

    expect(req.request.params.get('vin')).toBe('LB3F');
    expect(req.request.params.get('isSend')).toBe('0');
    expect(req.request.params.get('page')).toBe('1');
    expect(component.pageIndex).toBe(0);
    expect(component.hasActiveFilters).toBeTrue();
  });

  it('sends the sort as orderby/ordertype and clears it when empty', () => {
    fixture.detectChanges();
    flushAgencies();
    const first = flushOrders();
    // Orden por defecto
    expect(first.request.params.get('orderby')).toBe('captured_at');
    expect(first.request.params.get('ordertype')).toBe('desc');

    component.onSortChange({ column: 'order_dms', direction: 'asc' });
    const sorted = flushOrders();
    expect(sorted.request.params.get('orderby')).toBe('order_dms');
    expect(sorted.request.params.get('ordertype')).toBe('asc');

    component.onSortChange({ column: '', direction: 'asc' });
    const cleared = flushOrders();
    expect(component.currentSort).toBeNull();
    expect(cleared.request.params.has('orderby')).toBeFalse();
  });

  it('marks an order for resend with a PUT of isSend 0', () => {
    spyOn(window, 'alert');
    fixture.detectChanges();
    flushAgencies();
    flushOrders();

    component.resendToCrabi(ORDERS[0]);

    const put = httpMock.expectOne(`${BASE}/vgd/orderscrabi/1`);
    expect(put.request.method).toBe('PUT');
    expect(put.request.body).toEqual({ isSend: 0 });
    put.flush({ status: 200 });

    // Tras actualizar se recarga la página actual
    flushOrders();
  });

  it('does not call the API when the row has no id', () => {
    const alerted = spyOn(window, 'alert');
    fixture.detectChanges();
    flushAgencies();
    flushOrders();

    component.resendToCrabi({ order_dms: '99' });

    httpMock.expectNone((r) => r.method === 'PUT');
    expect(alerted).toHaveBeenCalled();
  });

  it('shows an error message when the request fails', () => {
    fixture.detectChanges();
    flushAgencies();
    httpMock
      .expectOne(isOrders)
      .flush('boom', { status: 500, statusText: 'Server Error' });

    expect(component.error).toContain('No se pudo cargar');
    expect(component.data).toEqual([]);
    expect(component.total).toBe(0);
    expect(component.loading).toBeFalse();
  });

  it('keeps the active filters in the Excel pages', () => {
    spyOn(console, 'error');
    fixture.detectChanges();
    flushAgencies();
    flushOrders();

    component.applyFilter({ isSend: '0' });
    flushOrders(ORDERS, 120);

    component.downloadExcel();
    const pages = httpMock.match(isOrders);
    expect(pages.length).toBe(2);
    pages.forEach((p) => expect(p.request.params.get('isSend')).toBe('0'));

    pages[0].flush('x', { status: 500, statusText: 'Server Error' });
  });

  it('does not attempt an Excel download when there is nothing to export', () => {
    const warn = spyOn(console, 'warn');
    component.total = 0;
    component.downloadExcel();

    expect(warn).toHaveBeenCalled();
    expect(component.isDownloadingExcel).toBeFalse();
  });

  it('requests one page per 100 records when exporting to Excel', () => {
    spyOn(console, 'error');
    fixture.detectChanges();
    flushAgencies();
    flushOrders(ORDERS, 250);

    component.downloadExcel();

    const pages = httpMock.match(isOrders);
    expect(pages.length).toBe(3);
    expect(pages.map((p) => p.request.params.get('page'))).toEqual(['1', '2', '3']);
    expect(pages[0].request.params.get('perpage')).toBe('100');

    // Sin ordenar: `captured_at` tiene empates y la API no desempata, asi que
    // pedir las paginas ordenadas devolvia filas repetidas y otras faltantes
    pages.forEach((p) => {
      expect(p.request.params.has('orderby')).toBeFalse();
      expect(p.request.params.has('ordertype')).toBeFalse();
    });

    // Se falla la primera para no generar el archivo dentro de la prueba;
    // forkJoin cancela las demás por sí solo
    pages[0].flush('x', { status: 500, statusText: 'Server Error' });
    expect(component.isDownloadingExcel).toBeFalse();
  });
});
