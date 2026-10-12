import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { httpTestProviders } from '@testing/test-providers';
import { environment } from '../../../environments/environment';

import { DemoValidationComponent } from './demo-validation.component';

const URL = `${environment.api.baseUrl}/vgd/inventoryfilter`;

function inventoryReply(rows: any[]) {
  return { data: { data: rows, total_rows: rows.length } };
}

describe('DemoValidationComponent', () => {
  let component: DemoValidationComponent;
  let fixture: ComponentFixture<DemoValidationComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoValidationComponent, MatSnackBarModule],
      providers: httpTestProviders
    }).compileComponents();

    fixture = TestBed.createComponent(DemoValidationComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => httpMock.verify());

  const reqFor = (vin: string) =>
    httpMock.expectOne((r) => r.url === URL && r.params.get('vin') === vin);

  it('consulta cada VIN una sola vez y clasifica los resultados', () => {
    component.text = 'vin1\nVIN2\nvin1\nVIN3';
    component.validate();

    expect(component.duplicatesRemoved).toBe(1);
    reqFor('VIN1').flush(inventoryReply([{ vin: 'VIN1', typeDescription: 'Demo' }]));
    reqFor('VIN2').flush(inventoryReply([{ vin: 'VIN2', typeDescription: 'Nuevo' }]));
    reqFor('VIN3').flush(inventoryReply([]));

    expect(component.rows.map((r) => r.result)).toEqual([
      'demo',
      'not_demo',
      'not_found'
    ]);
    expect(component.running).toBeFalse();
  });

  it('mantiene el orden de captura aunque las respuestas lleguen desordenadas', () => {
    component.text = 'AAA\nBBB';
    component.validate();

    reqFor('BBB').flush(inventoryReply([]));
    reqFor('AAA').flush(inventoryReply([]));

    expect(component.rows.map((r) => r.vin)).toEqual(['AAA', 'BBB']);
  });

  it('marca error en el VIN que falla y no detiene a los demás', () => {
    component.text = 'AAA\nBBB';
    component.validate();

    reqFor('AAA').flush('boom', { status: 500, statusText: 'Server Error' });
    reqFor('BBB').flush(inventoryReply([{ vin: 'BBB', typeDescription: 'Demo' }]));

    expect(component.rows.map((r) => r.result)).toEqual(['error', 'demo']);
  });

  it('reintentar reemplaza la fila con error', () => {
    component.text = 'AAA';
    component.validate();
    reqFor('AAA').flush('boom', { status: 500, statusText: 'Server Error' });

    component.retry(component.rows[0]);
    reqFor('AAA').flush(inventoryReply([{ vin: 'AAA', typeDescription: 'Demo' }]));

    expect(component.rows.length).toBe(1);
    expect(component.rows[0].result).toBe('demo');
  });

  it('no consulta nada si se pasa del tope de 200 VIN', () => {
    component.text = Array.from({ length: 201 }, (_, i) => `VIN${i}`).join('\n');
    expect(component.overLimit).toBeTrue();

    component.validate();

    httpMock.expectNone(() => true);
    expect(component.rows.length).toBe(0);
  });

  it('no consulta nada con la lista vacía', () => {
    component.text = '  ';
    component.validate();
    httpMock.expectNone(() => true);
  });

  it('con 200 VIN nunca hay más de 5 consultas abiertas a la vez', () => {
    component.text = Array.from({ length: 200 }, (_, i) => `VIN${i}`).join('\n');
    component.validate();

    let answered = 0;
    let wave = httpMock.match((r) => r.url === URL);
    while (wave.length > 0) {
      expect(wave.length).toBeLessThanOrEqual(5);
      wave.forEach((r) => r.flush(inventoryReply([])));
      answered += wave.length;
      wave = httpMock.match((r) => r.url === URL);
    }

    expect(answered).toBe(200);
    expect(component.rows.length).toBe(200);
  });

  it('filtra la tabla por resultado', () => {
    component.text = 'AAA\nBBB';
    component.validate();
    reqFor('AAA').flush(inventoryReply([{ vin: 'AAA', typeDescription: 'Demo' }]));
    reqFor('BBB').flush(inventoryReply([]));

    component.resultFilter = 'not_found';
    expect(component.filteredRows.map((r) => r.vin)).toEqual(['BBB']);
    expect(component.count('demo')).toBe(1);
  });

  it('habilita Ver SF solo si el envío fue correcto y hay id', () => {
    component.text = 'AAA\nBBB';
    component.validate();
    reqFor('AAA').flush(
      inventoryReply([
        { vin: 'AAA', typeDescription: 'Demo', insertCorrect: '1', idSalesForce: 'a0f1' }
      ])
    );
    reqFor('BBB').flush(
      inventoryReply([
        { vin: 'BBB', typeDescription: 'Demo', insertCorrect: '0', idSalesForce: '' }
      ])
    );
    fixture.detectChanges();

    const buttons: HTMLButtonElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('.demo-btn-open')
    );
    expect(buttons.map((b) => b.disabled)).toEqual([false, true]);

    const open = spyOn(window, 'open');
    buttons[0].click();
    expect(open).toHaveBeenCalledWith(
      'https://grupovanguardiamx.lightning.force.com/lightning/r/Opportunity/a0f1/view',
      '_blank',
      'noopener'
    );
  });

  describe('reenvío a Salesforce', () => {
    const failed = {
      id: 9,
      vin: 'AAA',
      typeDescription: 'Demo',
      sendedSalesForce: '1',
      insertCorrect: '0',
      resultSF: 'REQUIRED_FIELD_MISSING',
      idSalesForce: ''
    };

    function validateOne(row: any) {
      component.text = row.vin;
      component.validate();
      reqFor(row.vin).flush(inventoryReply([row]));
      fixture.detectChanges();
    }

    it('solo habilita Reenviar cuando el envío falló', () => {
      validateOne(failed);
      expect(component.canResend(component.rows[0])).toBeTrue();

      for (const patch of [
        { insertCorrect: '1' }, // viajó bien
        { sendedSalesForce: '0' }, // aún en cola
        { id: undefined } // sin id no se puede actualizar
      ]) {
        component.rows = [];
        validateOne({ ...failed, ...patch });
        expect(component.canResend(component.rows[0]))
          .withContext(JSON.stringify(patch))
          .toBeFalse();
      }
    });

    it('marca el registro para reenvío y refresca la fila', () => {
      validateOne(failed);
      const row = component.rows[0];

      component.resend(row);
      const put = httpMock.expectOne(`${URL}/9`);
      expect(put.request.method).toBe('PUT');
      expect(put.request.body.sendedSalesForce).toBe('0');
      expect(put.request.body.insertCorrect).toBe('0');
      expect(put.request.body.resultSF).toBe('');
      expect(put.request.body.idSalesForce).toBeNull();
      expect(put.request.body.vin).toBe('AAA');
      put.flush({});

      // vuelve a consultar el VIN y refleja el nuevo estado (pendiente)
      reqFor('AAA').flush(
        inventoryReply([{ ...failed, sendedSalesForce: '0', resultSF: '' }])
      );
      expect(component.sfStatus(component.rows[0])).toBe('warning');
      expect(component.canResend(component.rows[0])).toBeFalse();
    });

    it('no permite un segundo reenvío mientras el primero está en curso', () => {
      validateOne(failed);
      const row = component.rows[0];

      component.resend(row);
      expect(component.canResend(row)).toBeFalse();
      component.resend(row);

      httpMock.expectOne(`${URL}/9`).flush({}, { status: 500, statusText: 'Error' });
      expect(component.canResend(row)).toBeTrue();
    });

    it('muestra los indicadores de envío y estado en la tabla', () => {
      validateOne(failed);
      const icons = Array.from(
        fixture.nativeElement.querySelectorAll('.status-badge')
      ).map((el) => (el as HTMLElement).textContent?.trim());
      expect(icons).toEqual(['send', 'error']);
    });
  });
});
