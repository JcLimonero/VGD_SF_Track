import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpRequest } from '@angular/common/http';
import { httpTestProviders } from '@testing/test-providers';
import { environment } from '../../../../environments/environment';

import { CrabiTableComponent } from './crabi-table.component';
import { NotificationService } from '../../../services/notification.service';

const BASE = environment.api.baseUrl;

/** Envoltorio con el que responden todos los endpoints `/vgd/*`. */
function apiPage(items: any[], total = items.length) {
  return {
    status: 200,
    message: 'ok',
    data: { data: items, total_rows: total }
  };
}

/**
 * Los 21 campos que devuelve `/vgd/orderscrabi`, en el orden en que los manda.
 *
 * Es el esquema completo a propósito, no una selección: de aquí sale la prueba
 * de que ningún campo llega sin etiqueta, así que un fixture recortado la
 * volvería inútil. Verificado contra las 707 filas del endpoint: ninguna trae
 * llaves de menos y ninguna trae campos que no estén aquí.
 *
 * La primera fila es una ya enviada; la segunda es de las que no se han enviado
 * (24 de 707), que son las que dejan `sent_at`, `request_body` y `response_body`
 * vacíos. Los colores van vacíos ahí para cubrir el otro hueco del endpoint:
 * 160 filas sin `external_color` ni `internal_color`.
 *
 * Los VALORES son inventados: lo que se prueba son las llaves y la forma, no el
 * contenido. Este repositorio es público, así que aquí no van VIN, RFC ni
 * números de cliente sacados de producción. El RFC es `XAXX010101000`, el
 * genérico de público en general, que no identifica a nadie.
 */
const ORDERS = [
  {
    id: '1',
    idAgency: '88888',
    order_dms: '2160',
    amount: '299990.00',
    vin: 'LB3F0000000000001',
    brand: 'GEELY',
    model: 'EMGRAND',
    version: 'GC, SEDAN, 1.5LTS, MANUAL, 4CIL',
    year: '2026',
    external_color: 'NEGRO',
    internal_color: 'NEGRO',
    ndClientDMS: '5818',
    ndConsultant: '62',
    id_status: '3',
    invoice: 'GGGV1425',
    timestamp_dms: '2026-07-22 00:00:00',
    isSend: '1',
    captured_at: '2026-07-22 15:36:02',
    sent_at: '2026-08-01 21:14:24',
    request_body: '{"person":{"rfc":"XAXX010101000"}}',
    response_body: '{"code":201,"status":"success"}'
  },
  {
    id: '2',
    idAgency: '00000',
    order_dms: '32764',
    amount: '43990.00',
    vin: '3H1K0000000000002',
    brand: 'HONDA',
    model: 'XR150LEK',
    version: 'XR150',
    year: '2026',
    external_color: '',
    internal_color: '',
    ndClientDMS: '77921',
    ndConsultant: '272',
    id_status: '3',
    invoice: 'MJRMI27947',
    timestamp_dms: '2026-07-20 00:00:00',
    isSend: '0',
    captured_at: '2026-07-22 15:36:02',
    sent_at: null,
    request_body: '',
    response_body: ''
  }
];

const AGENCIES = [{ idAgency: '88888', name: 'HONDA GUADALAJARA' }];

describe('CrabiTableComponent', () => {
  let component: CrabiTableComponent;
  let fixture: ComponentFixture<CrabiTableComponent>;
  let httpMock: HttpTestingController;
  let notifications: NotificationService;

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
    notifications = TestBed.inject(NotificationService);
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
    // Si la API agrega un campo, el modal lo mostraria sin traducir. La lista
    // sale del fixture, que es el esquema completo: antes estaba escrita a mano
    // aparte, asi que un campo nuevo pasaba la prueba y llegaba al navegador en
    // ingles. Agregarlo al fixture es ahora lo unico que hace falta.
    const returnedFields = Object.keys(ORDERS[0]).concat('agencyName');

    const untranslated = returnedFields.filter(
      (field) => !component.detailLabels[field]
    );
    expect(untranslated).toEqual([]);
  });

  it('does not label anything the endpoint does not return', () => {
    // Una etiqueta de mas es una columna vacia en el Excel, que arma sus
    // columnas recorriendo `detailLabels`
    const returnedFields = Object.keys(ORDERS[0]).concat('agencyName');

    const sobran = Object.keys(component.detailLabels).filter(
      (field) => !returnedFields.includes(field)
    );
    expect(sobran).toEqual([]);
  });

  it('translates the send code instead of showing the raw number', () => {
    // En la tabla `isSend` es un icono; en el detalle se leia 'Envio Crabi: 1'.
    // La redaccion es la del filtro, para que buscar y leer digan igual.
    expect(component.detailValueLabels['isSend']).toEqual({
      '1': 'Enviado a Crabi',
      '0': 'Pendiente de envío'
    });

    // `id_status` vale 3 en las 707 filas y no hay catalogo que diga que
    // significa, asi que se muestra el numero en vez de inventarle un nombre
    expect(component.detailValueLabels['id_status']).toBeUndefined();
  });

  describe('petición y respuesta', () => {
    // Van en su propio modal, como 'Datos' en los módulos que mandan a
    // Salesforce, y no sueltas en la lista de detalles

    it('keeps them out of the detail modal', () => {
      expect(component.detailExclude).toEqual([
        'request_body',
        'response_body'
      ]);
    });

    it('shows in the JSON modal exactly what the detail modal hides', () => {
      // Si se excluye un campo y no se muestra en otro lado, se pierde
      expect(component.jsonFields.map((f) => f.field)).toEqual(
        component.detailExclude
      );
    });

    it('opens from a column that is not a field of the record', () => {
      const column = component.columns.find(
        (col) => col.property === component.jsonField
      );

      expect(column?.type).toBe('button');
      expect(component.displayedColumns).toContain(component.jsonField);
      // Al no ser un campo real no debe acabar como columna del Excel
      expect(component.detailLabels[component.jsonField]).toBeUndefined();
    });

    it('still exports both to the Excel', () => {
      // Igual que 'JSON Request SF' y 'JSON Response SF' en el de facturas
      const rows = component.buildExcelRows([
        { ...ORDERS[0], request_body: '{"vin":"V1"}', response_body: '{}' }
      ]);

      expect(rows[0]['Petición']).toBe('{"vin":"V1"}');
      expect(rows[0]['Respuesta']).toBe('{}');
    });

    it('does not add a column for the JSON button to the Excel', () => {
      const rows = component.buildExcelRows([ORDERS[0]]);
      expect(Object.keys(rows[0])).not.toContain('Datos');
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
    const ok = spyOn(notifications, 'success');
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

    expect(ok).toHaveBeenCalledWith('Orden 2160 marcada para reenvío a Crabi');
  });

  it('does not call the API when the row has no id', () => {
    const failed = spyOn(notifications, 'error');
    fixture.detectChanges();
    flushAgencies();
    flushOrders();

    component.resendToCrabi({ order_dms: '99' });

    httpMock.expectNone((r) => r.method === 'PUT');
    expect(failed).toHaveBeenCalledWith('No se encontró el ID del registro');
  });

  it('reports a failed resend instead of leaving it silent', () => {
    // Antes esto era un alert() nativo: bloqueaba la pestaña y anteponía
    // "localhost dice:" al mensaje. Ahora es un aviso de MatSnackBar.
    const failed = spyOn(notifications, 'error');
    fixture.detectChanges();
    flushAgencies();
    flushOrders();

    component.resendToCrabi(ORDERS[0]);
    httpMock
      .expectOne(`${BASE}/vgd/orderscrabi/1`)
      .flush(
        { message: 'sin permisos' },
        { status: 403, statusText: 'Forbidden' }
      );

    expect(failed).toHaveBeenCalledWith('Error al actualizar: sin permisos');
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
    expect(pages.map((p) => p.request.params.get('page'))).toEqual([
      '1',
      '2',
      '3'
    ]);
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
