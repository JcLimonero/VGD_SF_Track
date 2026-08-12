import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { httpTestProviders } from '@testing/test-providers';
import { environment } from '../../../../environments/environment';

import { CustomerTableComponent } from './customer-table.component';
import { NotificationService } from '../../../services/notification.service';

const BASE = environment.api.baseUrl;

describe('CustomerTableComponent', () => {
  let component: CustomerTableComponent;
  let fixture: ComponentFixture<CustomerTableComponent>;
  let httpMock: HttpTestingController;
  let notifications: NotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerTableComponent],
      providers: httpTestProviders
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerTableComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    notifications = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * El reenvío avisa por MatSnackBar, no por `alert()`.
   *
   * El aviso es la única señal de que el reenvío se marcó o falló, así que si
   * alguien lo quita el usuario se queda sin saber qué pasó y nada más se
   * entera. De ahí que se fije por prueba en los seis módulos con reenvío.
   */
  describe('reenvío a Salesforce', () => {
    const ROW = { id: 7, bussines_name: 'ACME SA de CV' };

    it('confirms the resend', () => {
      const ok = spyOn(notifications, 'success');

      component.resendToSalesForce(ROW);
      httpMock.expectOne(`${BASE}/vgd/customerfilter/7`).flush({ status: 200 });

      expect(ok).toHaveBeenCalledWith(
        'Cliente ACME SA de CV reenviado a Salesforce'
      );
    });

    it('reports the failure with the message from the API', () => {
      const failed = spyOn(notifications, 'error');

      component.resendToSalesForce(ROW);
      httpMock
        .expectOne(`${BASE}/vgd/customerfilter/7`)
        .flush(
          { message: 'sin permisos' },
          { status: 403, statusText: 'Forbidden' }
        );

      expect(failed).toHaveBeenCalledWith('Error al actualizar: sin permisos');
    });

    it('does not call the API when the row has no id', () => {
      const failed = spyOn(notifications, 'error');

      component.resendToSalesForce({ bussines_name: 'SIN ID' });

      httpMock.expectNone((r) => r.method === 'PUT');
      expect(failed).toHaveBeenCalledWith('No se encontró el ID del registro');
    });
  });
});
