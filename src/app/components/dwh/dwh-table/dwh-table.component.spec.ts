import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpRequest } from '@angular/common/http';
import { httpTestProviders } from '@testing/test-providers';
import { environment } from '../../../../environments/environment';

import { DwhTableComponent } from './dwh-table.component';

const BASE = environment.api.baseUrl;

/** Envoltorio con el que responden todos los endpoints `/vgd/*`. */
function apiPage(items: any[], total = items.length) {
  return {
    status: 200,
    message: 'ok',
    data: { data: items, total_rows: total }
  };
}

const ROWS = [
  {
    agencyName: 'OMODA PATRIA',
    idAgency: '9000',
    type: 'Invoices',
    description: 'Last execution date for agency 9000 - Process: Invoices',
    colDate: '2026-01-30 23:39:17',
    colDateUTC: '2026-01-31 05:39:17'
  }
];

describe('DwhTableComponent', () => {
  let component: DwhTableComponent;
  let fixture: ComponentFixture<DwhTableComponent>;
  let httpMock: HttpTestingController;

  const isDwh = (r: HttpRequest<any>) => r.url === `${BASE}/vgd/dwh`;

  /** Responde la petición de DWH pendiente y la devuelve. */
  function flushDwh(items = ROWS, total = items.length) {
    const req = httpMock.expectOne(isDwh);
    req.flush(apiPage(items, total));
    return req;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DwhTableComponent],
      providers: httpTestProviders
    }).compileComponents();

    fixture = TestBed.createComponent(DwhTableComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sends both filters as query params', () => {
    fixture.detectChanges();
    flushDwh();

    component.applyFilter({ idAgency: '9000', type: 'Invoices' });
    const req = flushDwh();

    expect(req.request.params.get('idAgency')).toBe('9000');
    expect(req.request.params.get('type')).toBe('Invoices');
  });

  it('keeps the active filters in the Excel pages', () => {
    // El Excel se armaba con parametros propios que solo copiaban idAgency, asi
    // que filtrar por Tipo y descargar traia tambien las filas de los demas
    // tipos. Y como el total SI respeta el filtro, y de ese total sale el numero
    // de paginas a pedir, sobre una tabla grande el archivo salia ademas
    // truncado. Se vio en pantalla: la tabla decia 1 registro y el archivo traia 2.
    spyOn(console, 'error');
    fixture.detectChanges();
    flushDwh();

    component.applyFilter({ type: 'Invoices' });
    flushDwh(ROWS, 120);

    component.downloadExcel();
    const pages = httpMock.match(isDwh);
    expect(pages.length).toBe(2);
    pages.forEach((p) => expect(p.request.params.get('type')).toBe('Invoices'));

    // Se falla la primera para no generar el archivo dentro de la prueba;
    // forkJoin cancela las demas por si sola
    pages[0].flush('x', { status: 500, statusText: 'Server Error' });
  });

  it('does not send the sort in the Excel pages', () => {
    // A proposito, igual que en Crabi: la tabla si ordena, pero pedir las
    // paginas del Excel ordenadas devuelve filas repetidas y otras faltantes
    // porque la API no desempata. No es un olvido, no "arreglarlo".
    spyOn(console, 'error');
    fixture.detectChanges();
    const first = flushDwh(ROWS, 250);
    // La tabla si manda el orden por defecto
    expect(first.request.params.get('orderby')).toBe('colDate');
    expect(first.request.params.get('ordertype')).toBe('desc');

    component.downloadExcel();

    const pages = httpMock.match(isDwh);
    expect(pages.length).toBe(3);
    expect(pages[0].request.params.get('perpage')).toBe('100');
    pages.forEach((p) => {
      expect(p.request.params.has('orderby')).toBeFalse();
      expect(p.request.params.has('ordertype')).toBeFalse();
    });

    pages[0].flush('x', { status: 500, statusText: 'Server Error' });
    expect(component.isDownloadingExcel).toBeFalse();
  });

  it('does not attempt an Excel download when there is nothing to export', () => {
    const warn = spyOn(console, 'warn');
    component.total = 0;
    component.downloadExcel();

    expect(warn).toHaveBeenCalled();
    expect(component.isDownloadingExcel).toBeFalse();
  });
});
