import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { JsonModalComponent } from './generic-table.component';

function setup(data: unknown) {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    imports: [JsonModalComponent],
    providers: [
      { provide: MatDialogRef, useValue: { close: () => undefined } },
      { provide: MAT_DIALOG_DATA, useValue: data },
      provideNoopAnimations()
    ]
  });

  const fixture: ComponentFixture<JsonModalComponent> =
    TestBed.createComponent(JsonModalComponent);
  fixture.detectChanges();
  return fixture;
}

describe('JsonModalComponent', () => {
  it('should create', () => {
    expect(setup('{}').componentInstance).toBeTruthy();
  });

  describe('valor suelto', () => {
    // Como lo abrían los módulos de Salesforce antes de las secciones

    it('indents a JSON string', () => {
      const component = setup('{"a":1}').componentInstance;

      expect(component.sections.length).toBe(1);
      expect(component.sections[0].content).toBe('{\n  "a": 1\n}');
      expect(component.sections[0].label).toBe('');
    });

    it('keeps the default title', () => {
      expect(setup('{}').componentInstance.title).toBe(
        'JSON Request - SalesForce'
      );
    });

    it('shows text that is not JSON as it came', () => {
      const component = setup('no es json').componentInstance;
      expect(component.sections[0].content).toBe('no es json');
    });

    it('indents an object too', () => {
      const component = setup({ a: 1 }).componentInstance;
      expect(component.sections[0].content).toBe('{\n  "a": 1\n}');
    });
  });

  describe('varias secciones', () => {
    const DATA = {
      title: 'Petición y respuesta - Crabi',
      sections: [
        { label: 'Petición', value: '{"vin":"V1"}' },
        { label: 'Respuesta', value: '{"code":201}' }
      ]
    };

    it('uses the given title', () => {
      expect(setup(DATA).componentInstance.title).toBe(
        'Petición y respuesta - Crabi'
      );
    });

    it('indents each section and keeps its label', () => {
      const component = setup(DATA).componentInstance;

      expect(component.sections.map((s) => s.label)).toEqual([
        'Petición',
        'Respuesta'
      ]);
      expect(component.sections[0].content).toBe('{\n  "vin": "V1"\n}');
      expect(component.sections[1].content).toBe('{\n  "code": 201\n}');
    });

    it('renders a block per section', () => {
      const fixture = setup(DATA);
      const blocks = fixture.nativeElement.querySelectorAll('.json-section');
      expect(blocks.length).toBe(2);
    });

    it('reports empty values instead of printing undefined', () => {
      // Un envío que aún no sale no tiene respuesta; antes se veía "undefined"
      const component = setup({
        sections: [
          { label: 'Petición', value: '{"a":1}' },
          { label: 'Respuesta', value: null }
        ]
      }).componentInstance;

      expect(component.sections[1].content).toBe('Sin datos');
    });

    it('copies every section with its label', () => {
      const component = setup(DATA).componentInstance;

      expect(component.formattedJson).toBe(
        'Petición:\n{\n  "vin": "V1"\n}\n\nRespuesta:\n{\n  "code": 201\n}'
      );
    });

    it('copies a single unlabelled section without a heading', () => {
      const component = setup('{"a":1}').componentInstance;
      expect(component.formattedJson).toBe('{\n  "a": 1\n}');
    });
  });
});
