import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { GenericDetailModalComponent } from './generic-detail-modal.component';

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
});
