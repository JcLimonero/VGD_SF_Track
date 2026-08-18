import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { httpTestProviders } from '@testing/test-providers';
import { environment } from '../../../environments/environment';

import { InvoiceTableComponent } from './invoice-table.component';
import { NotificationService } from '../../services/notification.service';
import { GenericDetailModalComponent } from '../generic-table/generic-detail-modal.component';

const BASE = environment.api.baseUrl;

/**
 * Los 22 campos que devuelve `/vgd/invoice`, tomados de una respuesta real del
 * 2026-08-18. Es el esquema completo: si la API agrega uno, agregarlo aquí es lo
 * único que hace falta para que la prueba de etiquetas lo exija.
 */
const INVOICE = {
  Id: '24382447',
  idAgency: '10082',
  agencyName: 'HONDA GONZALEZ GALLO',
  order_dms: '65',
  ndClientDMS: '4721',
  state: 'Facturado',
  vin: '3HGRZ1837TM000033',
  warranty_init_date: '2025-06-12',
  plates: '',
  payment_method: 'CONTADO NUEVOS',
  invoice_reference: 'GGVI14030',
  delivery_date: '2025-06-12',
  billing_date: '2026-08-18',
  sendedSalesForce: '1',
  idSalesForce: null,
  resultSF: 'No se encontró la oportunidad',
  insertCorrect: '0',
  sf_jsonRequest: '{"GV_VIN":"3HGRZ1837TM000033"}',
  sf_attempts: '0',
  timestamp_dms: '2025-06-12 00:00:00',
  timestamp: '2026-03-17 12:27:37',
  timestamp_sales_force: '2026-04-07 00:20:01'
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
});
