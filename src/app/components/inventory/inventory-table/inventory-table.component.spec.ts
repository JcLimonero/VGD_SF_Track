import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { httpTestProviders } from '@testing/test-providers';
import { environment } from '../../../../environments/environment';

import { InventoryTableComponent } from './inventory-table.component';
import { NotificationService } from '../../../services/notification.service';

const BASE = environment.api.baseUrl;

describe('InventoryTableComponent', () => {
  let component: InventoryTableComponent;
  let fixture: ComponentFixture<InventoryTableComponent>;
  let httpMock: HttpTestingController;
  let notifications: NotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryTableComponent],
      providers: httpTestProviders
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryTableComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    notifications = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('reenvío a Salesforce', () => {
    const ROW = { id: 7, vin: 'LB3F31046TG034231' };

    it('confirms the resend', () => {
      const ok = spyOn(notifications, 'success');

      component.resendToSalesForce(ROW);
      httpMock
        .expectOne(`${BASE}/vgd/inventoryfilter/7`)
        .flush({ status: 200 });

      expect(ok).toHaveBeenCalledWith(
        'Vehículo LB3F31046TG034231 marcado para reenvío a Salesforce'
      );
    });

    it('reports the failure with the message from the API', () => {
      const failed = spyOn(notifications, 'error');

      component.resendToSalesForce(ROW);
      httpMock
        .expectOne(`${BASE}/vgd/inventoryfilter/7`)
        .flush(
          { message: 'sin permisos' },
          { status: 403, statusText: 'Forbidden' }
        );

      expect(failed).toHaveBeenCalledWith('Error al actualizar: sin permisos');
    });

    it('does not call the API when the row has no id', () => {
      const failed = spyOn(notifications, 'error');

      component.resendToSalesForce({ vin: 'SIN ID' });

      httpMock.expectNone((r) => r.method === 'PUT');
      expect(failed).toHaveBeenCalledWith('No se encontró el ID del registro');
    });

    /**
     * Inventario es el único de los cinco que limpia el resultado del intento
     * anterior; los otros cuatro solo tocan `sendedSalesForce` (ver C2 en las
     * notas). Se fija aquí para que la diferencia sea deliberada y no se
     * pierda si alguien uniforma los módulos en la dirección equivocada.
     */
    it('clears the previous Salesforce result', () => {
      component.resendToSalesForce(ROW);
      const put = httpMock.expectOne(`${BASE}/vgd/inventoryfilter/7`);

      expect(put.request.body).toEqual(
        jasmine.objectContaining({
          sendedSalesForce: '0',
          insertCorrect: '0',
          resultSF: '',
          idSalesForce: null
        })
      );
      put.flush({ status: 200 });
    });
  });
});
