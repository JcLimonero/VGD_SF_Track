import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { httpTestProviders } from '@testing/test-providers';
import { environment } from '../../../../environments/environment';

import { InventoryTableComponent } from './inventory-table.component';
import { NotificationService } from '../../../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

const BASE = environment.api.baseUrl;

/** Doble de MatDialog: la prueba decide qué contesta el usuario. */
const dialogStub = { open: jasmine.createSpy('open') };

describe('InventoryTableComponent', () => {
  let component: InventoryTableComponent;
  let fixture: ComponentFixture<InventoryTableComponent>;
  let httpMock: HttpTestingController;
  let notifications: NotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryTableComponent],
      providers: httpTestProviders
    })
      // La tabla importa módulos de Material que traen su propio MatDialog y
      // ganarían a un `provide` normal: hay que sustituirlo con overrideProvider.
      .overrideProvider(MatDialog, { useValue: dialogStub })
      .compileComponents();

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
    // VIN inventado: el repositorio es público y la prueba no mira el valor
    const ROW = { id: 7, vin: 'LB3F0000000000001' };

    it('confirms the resend', () => {
      const ok = spyOn(notifications, 'success');

      component.resendToSalesForce(ROW);
      httpMock
        .expectOne(`${BASE}/vgd/inventoryfilter/7`)
        .flush({ status: 200 });

      expect(ok).toHaveBeenCalledWith(
        'Vehículo LB3F0000000000001 marcado para reenvío a Salesforce'
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

  describe('reenviar todos', () => {
    const INVENTORY = `${BASE}/vgd/inventoryfilter`;
    // VIN inventados: el repositorio es público y la prueba no mira el valor
    const failedRow = (id: number) => ({
      id,
      vin: `VINPRUEBA0000000${id}`,
      sendedSalesForce: '1',
      insertCorrect: '0',
      resultSF: 'error de prueba',
      idSalesForce: ''
    });
    const reply = (rows: any[], total = rows.length) => ({
      data: { data: rows, total_rows: total }
    });
    const failedCall = (page = '1') =>
      httpMock.expectOne(
        (r) =>
          r.url === INVENTORY &&
          r.params.get('insertCorrect') === '0' &&
          r.params.get('sendedSalesForce') === '1' &&
          r.params.get('page') === page
      );
    let dialogData: any;

    const answerDialog = (answer: boolean | undefined) =>
      dialogStub.open.and.callFake(((_: unknown, config: any) => {
        dialogData = config.data;
        return { afterClosed: () => of(answer) } as any;
      }) as any);

    beforeEach(() => {
      dialogStub.open.calls.reset();
      dialogStub.open.and.stub();
      dialogData = null;
    });

    it('pide solo lo que se envió y falló, y confirma con la cantidad', () => {
      answerDialog(false);
      component.resendAllFailed();

      failedCall().flush(reply([failedRow(1), failedRow(2)]));

      expect(dialogData.confirmLabel).toBe('Reenviar 2');
      expect(dialogData.lines[0]).toContain('2 unidades');
      expect(dialogData.lines[1]).toContain('Sin filtros');
      expect(component.isResendingAll).toBeFalse();
    });

    it('si el usuario cancela no escribe nada en la API', () => {
      answerDialog(undefined);
      component.resendAllFailed();
      failedCall().flush(reply([failedRow(1)]));

      httpMock.expectNone((r) => r.method === 'PUT');
      expect(component.isResendingAll).toBeFalse();
    });

    it('al confirmar marca cada unidad para reenvío y recarga la tabla', () => {
      answerDialog(true);
      const ok = spyOn(notifications, 'success');
      component.resendAllFailed();
      failedCall().flush(reply([failedRow(1), failedRow(2), failedRow(3)]));

      const puts = httpMock.match((r) => r.method === 'PUT');
      expect(puts.map((p) => p.request.url).sort()).toEqual([
        `${INVENTORY}/1`,
        `${INVENTORY}/2`,
        `${INVENTORY}/3`
      ]);
      puts.forEach((p) => {
        expect(p.request.body).toEqual(
          jasmine.objectContaining({
            sendedSalesForce: '0',
            insertCorrect: '0',
            resultSF: '',
            idSalesForce: null
          })
        );
        p.flush({ status: 200 });
      });

      expect(ok).toHaveBeenCalledWith('3 unidades marcadas para reenvío a Salesforce');
      expect(component.isResendingAll).toBeFalse();
      // recarga la página actual
      expect(
        httpMock.match((r) => r.url === INVENTORY && !r.params.has('insertCorrect')).length
      ).toBeGreaterThanOrEqual(1);
    });

    it('con errores avisa cuántas fallaron y no se detiene', () => {
      answerDialog(true);
      const warn = spyOn(notifications, 'warning');
      component.resendAllFailed();
      failedCall().flush(reply([failedRow(1), failedRow(2)]));

      const puts = httpMock.match((r) => r.method === 'PUT');
      puts[0].flush({}, { status: 500, statusText: 'Error' });
      puts[1].flush({ status: 200 });

      expect(warn).toHaveBeenCalledWith(jasmine.stringContaining('1 unidades marcadas y 1 con error'));
      expect(component.isResendingAll).toBeFalse();
    });

    it('con más de 100 pide todas las páginas', () => {
      answerDialog(false);
      const rows = (from: number, n: number) =>
        Array.from({ length: n }, (_, i) => failedRow(from + i));
      component.resendAllFailed();

      failedCall('1').flush(reply(rows(1, 100), 150));
      failedCall('2').flush(reply(rows(101, 50), 150));

      expect(dialogData.confirmLabel).toBe('Reenviar 150');
    });

    it('con más de 1000 no escribe y pide filtrar', () => {
            const warn = spyOn(notifications, 'warning');
      component.resendAllFailed();
      failedCall().flush(reply([failedRow(1)], 1500));

      expect(dialogStub.open).not.toHaveBeenCalled();
      expect(warn).toHaveBeenCalledWith(jasmine.stringContaining('máximo por vez es 1000'));
      httpMock.expectNone((r) => r.method === 'PUT');
      expect(component.isResendingAll).toBeFalse();
    });

    it('si no hay nada fallido, lo dice y no pregunta', () => {
            const warn = spyOn(notifications, 'warning');
      component.resendAllFailed();
      failedCall().flush(reply([]));

      expect(dialogStub.open).not.toHaveBeenCalled();
      expect(warn).toHaveBeenCalledWith('No hay unidades con envío fallido con los filtros actuales.');
    });

    it('descarta lo que la API devuelva y no haya fallado, y los repetidos', () => {
      answerDialog(false);
      component.resendAllFailed();
      failedCall().flush(
        reply([
          failedRow(1),
          failedRow(1),
          { ...failedRow(2), insertCorrect: '1' }, // entró bien
          { ...failedRow(3), sendedSalesForce: '0' } // aún en cola
        ])
      );

      expect(dialogData.confirmLabel).toBe('Reenviar 1');
    });

    it('respeta los filtros de agencia, tipo y VIN y los menciona', () => {
      answerDialog(false);
      component.currentFilters = {
        idAgency: '88',
        typeDescription: 'Demo',
        vin: 'VINPRUEBA00000001',
        // estos dos no aplican: manda siempre "enviado" y "no insertado"
        sendedSalesForce: '0',
        insertado: true
      };
      component.resendAllFailed();

      const req = httpMock.expectOne(
        (r) => r.url === INVENTORY && r.params.get('insertCorrect') === '0'
      );
      expect(req.request.params.get('idAgency')).toBe('88');
      expect(req.request.params.get('typeDescription')).toBe('Demo');
      expect(req.request.params.get('vin')).toBe('VINPRUEBA00000001');
      expect(req.request.params.get('sendedSalesForce')).toBe('1');
      req.flush(reply([failedRow(1)]));

      expect(dialogData.lines[1]).toContain('agencia 88');
      expect(dialogData.lines[1]).toContain('tipo Demo');
    });

    it('un segundo clic mientras corre no repite la consulta', () => {
      answerDialog(false);
      component.resendAllFailed();
      component.resendAllFailed();

      failedCall().flush(reply([failedRow(1)]));
    });
  });
});
