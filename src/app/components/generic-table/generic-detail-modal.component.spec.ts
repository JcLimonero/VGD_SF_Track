import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, of, throwError } from 'rxjs';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import {
  DetailAction,
  GenericDetailModalComponent
} from './generic-detail-modal.component';

function setup(data: unknown) {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    imports: [GenericDetailModalComponent],
    providers: [
      { provide: MatDialogRef, useValue: { close: () => undefined } },
      { provide: MAT_DIALOG_DATA, useValue: data },
      provideNoopAnimations()
    ]
  });

  const fixture: ComponentFixture<GenericDetailModalComponent> =
    TestBed.createComponent(GenericDetailModalComponent);
  fixture.detectChanges();
  return fixture;
}

describe('GenericDetailModalComponent', () => {
  it('should create', () => {
    expect(setup({ row: {}, labels: {} }).componentInstance).toBeTruthy();
  });

  it('lists one entry per field of the row', () => {
    const component = setup({
      row: { vin: 'VIN1', model: 'Civic' },
      labels: {}
    }).componentInstance;

    expect(component.entries.length).toBe(2);
    expect(component.entries.map((e) => e.value)).toEqual(['VIN1', 'Civic']);
  });

  it('prefers the supplied labels over the humanized field name', () => {
    const component = setup({
      row: { order_dms: 'ORD1', vin: 'VIN1' },
      labels: { order_dms: 'No. Orden' }
    }).componentInstance;

    expect(component.entries[0].label).toBe('No. Orden');
    // Sin etiqueta definida cae al nombre legible generado
    expect(component.entries[1].label).toBe('Vin');
  });

  it('accepts a bare row without the { row, labels } wrapper', () => {
    const component = setup({ vin: 'VIN1' }).componentInstance;
    expect(component.entries.length).toBe(1);
    expect(component.entries[0].value).toBe('VIN1');
  });

  it('shows N/A for empty values', () => {
    const component = setup({
      row: { a: null, b: undefined, c: '', d: 0 },
      labels: {}
    }).componentInstance;

    const values = component.entries.map((e) => e.value);
    expect(values.slice(0, 3)).toEqual(['N/A', 'N/A', 'N/A']);
    // 0 es un valor real, no debe convertirse en N/A
    expect(values[3]).toBe('0');
  });

  it('serializes object values', () => {
    const component = setup({
      row: { meta: { a: 1 } },
      labels: {}
    }).componentInstance;

    expect(component.entries[0].value).toBe('{"a":1}');
  });

  it('leaves out the excluded fields', () => {
    const component = setup({
      row: { vin: 'VIN1', request_body: '{"rfc":"X"}', response_body: '{}' },
      labels: {},
      exclude: ['request_body', 'response_body']
    }).componentInstance;

    expect(component.entries.map((e) => e.label)).toEqual(['Vin']);
  });

  it('lists every field when no exclusion is given', () => {
    const component = setup({
      row: { vin: 'VIN1', request_body: '{}' },
      labels: {}
    }).componentInstance;

    expect(component.entries.length).toBe(2);
  });

  describe('valores codificados', () => {
    // Los campos que la tabla pinta como icono llegaban al detalle como el
    // numero que manda la API: 'Envio Crabi: 1'

    it('translates a value that the caller declared', () => {
      const component = setup({
        row: { isSend: '1' },
        labels: { isSend: 'Envío Crabi' },
        valueLabels: { isSend: { '1': 'Enviado a Crabi', '0': 'Pendiente' } }
      }).componentInstance;

      expect(component.entries[0].value).toBe('Enviado a Crabi');
    });

    it('leaves an undeclared value as it came', () => {
      // Mejor el codigo crudo que una etiqueta equivocada
      const component = setup({
        row: { isSend: '7' },
        labels: {},
        valueLabels: { isSend: { '1': 'Enviado a Crabi' } }
      }).componentInstance;

      expect(component.entries[0].value).toBe('7');
    });

    it('does not translate the absence of a value', () => {
      // 'N/A' gana: `valueLabels` nombra valores reales, no el hueco
      const component = setup({
        row: { isSend: '' },
        labels: {},
        valueLabels: { isSend: { '': 'nunca' } }
      }).componentInstance;

      expect(component.entries[0].value).toBe('N/A');
    });

    it('touches nothing when no translation is given', () => {
      const component = setup({ row: { isSend: '1' }, labels: {} })
        .componentInstance;

      expect(component.entries[0].value).toBe('1');
    });
  });

  it('handles a null row without throwing', () => {
    const component = setup({ row: null, labels: {} }).componentInstance;
    expect(component.entries).toEqual([]);
  });

  it('renders a row per entry', () => {
    const fixture = setup({ row: { a: 1, b: 2 }, labels: {} });
    const rows = fixture.nativeElement.querySelectorAll('.detail-row');
    expect(rows.length).toBe(2);
  });

  describe('acciones junto a un campo', () => {
    const row = { vin: 'VIN1', resultSF: 'falló' };
    const action = (
      run: (row: any) => Observable<unknown>,
      when: (value: unknown) => boolean = () => true
    ): DetailAction => ({
      field: 'resultSF',
      label: 'Reenviar VIN',
      doneLabel: 'Listo el VIN',
      when,
      run
    });
    const buttons = (fixture: ComponentFixture<GenericDetailModalComponent>) =>
      Array.from(
        fixture.nativeElement.querySelectorAll('.detail-action-btn')
      ) as HTMLButtonElement[];

    it('muestra el botón solo junto al campo y cuando el valor lo amerita', () => {
      const shown = setup({ row, labels: {}, actions: [action(() => of(true))] });
      expect(buttons(shown).length).toBe(1);
      // está dentro de la fila del campo, no de otra
      const rowEl = buttons(shown)[0].closest('.detail-row') as HTMLElement;
      expect(rowEl.textContent).toContain('falló');

      const hidden = setup({
        row,
        labels: {},
        actions: [action(() => of(true), () => false)]
      });
      expect(buttons(hidden).length).toBe(0);
    });

    it('sin acciones no cambia nada', () => {
      expect(buttons(setup({ row, labels: {} })).length).toBe(0);
      expect(buttons(setup({ row, labels: {}, actions: null })).length).toBe(0);
    });

    it('al pulsar corre la acción con el registro y queda en hecho', () => {
      let received: unknown = null;
      const fixture = setup({
        row,
        labels: {},
        actions: [action((r) => { received = r; return of(true); })]
      });

      buttons(fixture)[0].click();
      fixture.detectChanges();

      expect(received).toEqual(row);
      expect(buttons(fixture)[0].textContent?.trim()).toBe('Listo el VIN');
      expect(buttons(fixture)[0].disabled).toBeTrue();
    });

    it('mientras corre se deshabilita y no se puede repetir', () => {
      let calls = 0;
      const fixture = setup({
        row,
        labels: {},
        actions: [action(() => { calls++; return new Observable(() => undefined); })]
      });

      buttons(fixture)[0].click();
      fixture.detectChanges();
      expect(buttons(fixture)[0].disabled).toBeTrue();
      expect(buttons(fixture)[0].textContent).toContain('Reenviando');

      fixture.componentInstance.runAction(
        fixture.componentInstance['actions'][0]
      );
      expect(calls).toBe(1);
    });

    it('si falla muestra el mensaje y deja reintentar', () => {
      let attempt = 0;
      const fixture = setup({
        row,
        labels: {},
        actions: [
          action(() =>
            ++attempt === 1
              ? throwError(() => new Error('El VIN no está en el inventario'))
              : of(true)
          )
        ]
      });

      buttons(fixture)[0].click();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.detail-action-error').textContent).toContain(
        'El VIN no está en el inventario'
      );
      expect(buttons(fixture)[0].disabled).toBeFalse();

      buttons(fixture)[0].click();
      fixture.detectChanges();
      expect(buttons(fixture)[0].textContent?.trim()).toBe('Listo el VIN');
      expect(fixture.nativeElement.querySelector('.detail-action-error')).toBeNull();
    });
  });
});
