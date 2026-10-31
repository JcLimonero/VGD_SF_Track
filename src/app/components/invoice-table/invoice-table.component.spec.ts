import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { httpTestProviders } from '@testing/test-providers';
import { environment } from '../../../environments/environment';

import { InvoiceTableComponent } from './invoice-table.component';
import { NotificationService } from '../../services/notification.service';
import { GenericDetailModalComponent } from '../generic-table/generic-detail-modal.component';

const BASE = environment.api.baseUrl;

/**
 * Los 22 campos que devuelve `/vgd/invoice`. Es el esquema completo: si la API
 * agrega uno, agregarlo aquí es lo único que hace falta para que la prueba de
 * etiquetas lo exija.
 *
 * Los VALORES son inventados a propósito y no salen de producción: las pruebas
 * solo miran las llaves (`Object.keys`), así que un VIN, un número de cliente o
 * una agencia reales no aportarían nada y este repositorio es público.
 */
const INVOICE = {
  Id: '1',
  idAgency: '00000',
  agencyName: 'AGENCIA DE PRUEBA',
  order_dms: '1001',
  ndClientDMS: '1234',
  state: 'Facturado',
  vin: 'VIN00000000000001',
  warranty_init_date: '2026-01-15',
  plates: '',
  payment_method: 'CONTADO',
  invoice_reference: 'FAC0001',
  delivery_date: '2026-01-20',
  billing_date: '2026-01-10',
  sendedSalesForce: '1',
  idSalesForce: null,
  resultSF: 'No se encontró la oportunidad',
  insertCorrect: '0',
  sf_jsonRequest: '{"GV_VIN":"VIN00000000000001"}',
  sf_attempts: '0',
  timestamp_dms: '2026-01-10 00:00:00',
  timestamp: '2026-01-10 12:00:00',
  timestamp_sales_force: '2026-01-11 00:00:00'
};

describe('InvoiceTableComponent', () => {
  let component: InvoiceTableComponent;
  let fixture: ComponentFixture<InvoiceTableComponent>;
  let httpMock: HttpTestingController;
  let notifications: NotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceTableComponent],
      providers: httpTestProviders
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceTableComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    notifications = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('reenvío a Salesforce', () => {
    const ROW = { Id: 7, order_dms: '32764' };

    it('confirms the resend', () => {
      const ok = spyOn(notifications, 'success');

      component.resendToSalesForce(ROW);
      httpMock.expectOne(`${BASE}/vgd/invoice/7`).flush({ status: 200 });

      expect(ok).toHaveBeenCalledWith(
        'Orden 32764 marcada para reenvío a Salesforce'
      );
    });

    it('reports the failure with the message from the API', () => {
      const failed = spyOn(notifications, 'error');

      component.resendToSalesForce(ROW);
      httpMock
        .expectOne(`${BASE}/vgd/invoice/7`)
        .flush(
          { message: 'sin permisos' },
          { status: 403, statusText: 'Forbidden' }
        );

      expect(failed).toHaveBeenCalledWith('Error al actualizar: sin permisos');
    });

    it('does not call the API when the row has no id', () => {
      const failed = spyOn(notifications, 'error');

      component.resendToSalesForce({ order_dms: 'SIN ID' });

      httpMock.expectNone((r) => r.method === 'PUT');
      expect(failed).toHaveBeenCalledWith('No se encontró el ID del registro');
    });
  });

  describe('modal de detalles', () => {
    it('is chosen explicitly instead of by the shape of the record', () => {
      // Las facturas traen `ndClientDMS`, que es lo que la tabla genérica usa
      // para reconocer a un cliente: sin este `@Input` el botón 'Detalles'
      // abría 'Detalles del Cliente' con Nombre, RFC y CURP en 'N/A'.
      expect(component.detailModal).toBe(GenericDetailModalComponent);
    });

    it('is titled after the entity, not after a generic record', () => {
      // La pestana dice 'Ordenes' y el spinner 'Cargando ordenes...'; el modal
      // generico diria 'Detalles del registro'. Ademas `order_dms` es unico por
      // renglon y `invoice_reference` no, asi que un renglon es una orden.
      expect(component.detailTitle).toBe('Detalles de la Orden');
    });

    it('keeps the wording of the modal people already know', () => {
      // El detalle se lee palabra por palabra como el modal anterior a esta
      // rama (modal-generic en la rama clientDMS_in_Invoices), aunque el
      // encabezado de la columna diga otra cosa. Son las 10 etiquetas suyas.
      expect(component.detailLabels).toEqual(
        jasmine.objectContaining({
          order_dms: 'No.Pedido',
          ndClientDMS: 'No.Cliente',
          invoice_reference: 'Referencia de Factura',
          billing_date: 'Fecha de Facturación',
          sendedSalesForce: 'Enviado a SalesForce',
          resultSF: 'Resultado SF',
          timestamp_sales_force: 'Timestamp SalesForce',
          warranty_init_date: 'Fecha de Inicio de Garantía',
          delivery_date: 'Fecha de Entrega',
          idSalesForce: 'ID SalesForce'
        })
      );
    });

    it('only overrides columns, never fields the table does not show', () => {
      // `labelOverrides` documenta que pisa encabezados; si entra ahi un campo
      // que no es columna, el comentario deja de ser cierto
      const visibles = component.columns
        .filter((col) => col.type !== 'button')
        .map((col) => String(col.property));

      const overrides = component['labelOverrides'] as Record<string, string>;

      Object.keys(overrides).forEach((field) => {
        expect(visibles).toContain(field);
      });
    });

    it('reuses the label of every visible column it does not rename', () => {
      const renombradas = Object.keys(
        component['labelOverrides'] as Record<string, string>
      );

      component.columns
        .filter((col) => col.type !== 'button')
        .filter((col) => !renombradas.includes(String(col.property)))
        .forEach((col) => {
          expect(component.detailLabels[col.property]).toBe(col.label);
        });
    });

    it('labels every field the endpoint returns', () => {
      // Un campo sin etiqueta sale en el modal con el nombre de la API
      const untranslated = Object.keys(INVOICE).filter(
        (field) =>
          !component.detailLabels[field] &&
          !component.detailExclude.includes(field)
      );

      expect(untranslated).toEqual([]);
    });

    it('translates the codes instead of showing the raw number', () => {
      // En la tabla son iconos; en el modal se leería 'Enviado a SalesForce: 1'
      expect(component.detailValueLabels['sendedSalesForce']).toEqual({
        '1': 'Sí',
        '0': 'No'
      });
      expect(component.detailValueLabels['insertCorrect']).toEqual({
        '1': 'Sí',
        '0': 'No'
      });
    });

    it('does not repeat the label inside the value', () => {
      // 'Enviado a SalesForce: Enviado a Salesforce' se leia dos veces
      Object.entries(component.detailValueLabels).forEach(
        ([field, valores]) => {
          const etiqueta = component.detailLabels[field];
          Object.values(valores).forEach((valor) => {
            expect(valor.toLowerCase()).not.toBe(etiqueta.toLowerCase());
          });
        }
      );
    });

    it('shows in the JSON modal exactly what the detail modal hides', () => {
      // Si se excluye un campo y no se muestra en otro lado, se pierde. El
      // botón 'Datos' abre `sf_jsonRequest`, que es el que la tabla genérica
      // usa por defecto.
      expect(component.detailExclude).toEqual(['sf_jsonRequest']);
    });
  });

  describe('reenviar VIN desde el detalle', () => {
    const INVENTORY = `${BASE}/vgd/inventoryfilter`;
    // VIN inventado: el repositorio es público
    const VIN = 'VINPRUEBA00000001';
    const ERROR = `No se encontró el vehículo correspondiente al vin: ${VIN}`;
    const ORDER = { ...INVOICE, resultSF: ERROR, vin: VIN };
    const unit = (id: number, vin = VIN) => ({
      id,
      vin,
      sendedSalesForce: '1',
      insertCorrect: '0',
      resultSF: 'error de prueba',
      idSalesForce: ''
    });
    const reply = (rows: any[]) => ({ data: { data: rows, total_rows: rows.length } });
    const action = () => component.detailActions[0];

    it('el botón solo aplica al Resultado SF de VIN no encontrado', () => {
      expect(action().field).toBe('resultSF');
      expect(action().when(ERROR, ORDER)).toBeTrue();
      expect(action().when('No se encontró la oportunidad', ORDER)).toBeFalse();
      expect(action().when('Insert Correct', ORDER)).toBeFalse();
    });

    it('busca la unidad por el VIN del mensaje y la marca para reenvío', () => {
      const ok = spyOn(notifications, 'success');
      let done = false;
      action().run(ORDER).subscribe(() => (done = true));

      httpMock
        .expectOne((r) => r.url === INVENTORY && r.params.get('vin') === VIN)
        .flush(reply([unit(5)]));
      const put = httpMock.expectOne(`${INVENTORY}/5`);
      expect(put.request.method).toBe('PUT');
      expect(put.request.body).toEqual(
        jasmine.objectContaining({
          sendedSalesForce: '0',
          insertCorrect: '0',
          resultSF: '',
          idSalesForce: null
        })
      );
      put.flush({ status: 200 });

      expect(done).toBeTrue();
      expect(ok).toHaveBeenCalledWith(`VIN ${VIN} marcado para reenvío a Salesforce (Inventario)`);
    });

    it('usa el VIN del mensaje aunque la orden traiga otro', () => {
      action()
        .run({ ...ORDER, vin: 'OTROVIN' })
        .subscribe({ error: () => undefined });

      httpMock
        .expectOne((r) => r.url === INVENTORY && r.params.get('vin') === VIN)
        .flush(reply([]));
      httpMock.expectNone((r) => r.params.get('vin') === 'OTROVIN');
    });

    it('si el VIN no está en el inventario lo dice y no escribe nada', () => {
      let message = '';
      action().run(ORDER).subscribe({ error: (e) => (message = e.message) });

      httpMock
        .expectOne((r) => r.url === INVENTORY && r.params.get('vin') === VIN)
        .flush(reply([unit(9, 'OTRO00000000000X')]));

      expect(message).toContain(`El VIN ${VIN} no está en el inventario`);
      httpMock.expectNone((r) => r.method === 'PUT');
    });

    it('si la API falla al escribir devuelve un mensaje legible', () => {
      let message = '';
      action().run(ORDER).subscribe({ error: (e) => (message = e.message) });

      httpMock
        .expectOne((r) => r.url === INVENTORY && r.params.get('vin') === VIN)
        .flush(reply([unit(5)]));
      httpMock
        .expectOne(`${INVENTORY}/5`)
        .flush({ message: 'sin permisos' }, { status: 403, statusText: 'Forbidden' });

      expect(message).toBe('No se pudo reenviar el VIN: sin permisos');
    });
  });
});
