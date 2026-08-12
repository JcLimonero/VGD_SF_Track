import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { httpTestProviders } from '@testing/test-providers';
import { environment } from '../../../environments/environment';

import { InvoiceTableComponent } from './invoice-table.component';
import { NotificationService } from '../../services/notification.service';

const BASE = environment.api.baseUrl;

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
});
