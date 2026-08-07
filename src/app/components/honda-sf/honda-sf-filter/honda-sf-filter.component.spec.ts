import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { SimpleChange } from '@angular/core';
import { httpTestProviders } from '@testing/test-providers';

import { HondaSfFilterComponent } from './honda-sf-filter.component';
import { HONDA_SF_TABLES, HondaSfFilterField } from '../honda-sf.catalog';

const AGENCIES = [
  { idAgency: '10017', name: 'HONDA VANGUARDIA GALERIAS' },
  { idAgency: '10082', name: 'HONDA GONZALEZ GALLO' }
];

const FIELDS: HondaSfFilterField[] = [
  { field: 'dealer_id', label: 'Distribuidor', fromAgencies: true },
  { field: 'email', label: 'Correo' },
  { field: 'lead_stage', label: 'Etapa', options: ['Nuevo', 'Consulta'] }
];

/** Marca o desmarca una opción, como haría el usuario en el desplegable. */
function toggle(checked: boolean): Event {
  return { target: { checked } } as unknown as Event;
}

/**
 * Asigna el `@Input` y avisa del cambio.
 *
 * Sin host que haga el binding, Angular no llama `ngOnChanges` solo: hay que
 * hacerlo a mano o el formulario se queda con los campos del constructor.
 */
function setFields(
  component: HondaSfFilterComponent,
  fields: HondaSfFilterField[]
): void {
  const previous = component.fields;
  component.fields = fields;
  component.ngOnChanges({
    fields: new SimpleChange(previous, fields, previous === undefined)
  });
}

describe('HondaSfFilterComponent', () => {
  let component: HondaSfFilterComponent;
  let fixture: ComponentFixture<HondaSfFilterComponent>;
  let httpMock: HttpTestingController;

  function flushAgencies(): void {
    httpMock
      .match((r) => r.url.includes('agenciesfilter'))
      .forEach((req) =>
        req.flush({ status: 200, data: { data: AGENCIES, total_rows: 2 } })
      );
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HondaSfFilterComponent],
      providers: httpTestProviders
    }).compileComponents();

    fixture = TestBed.createComponent(HondaSfFilterComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    setFields(component, FIELDS);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    fixture.detectChanges();
    flushAgencies();
    expect(component).toBeTruthy();
  });

  it('starts with the filters of the first table of the catalog', () => {
    const fresh = TestBed.createComponent(HondaSfFilterComponent);
    expect(fresh.componentInstance.fields).toBe(HONDA_SF_TABLES[0].filters);
  });

  it('builds one control per declared field', () => {
    fixture.detectChanges();
    flushAgencies();

    expect(Object.keys(component.filterForm.controls)).toEqual([
      'dealer_id',
      'email',
      'lead_stage'
    ]);
  });

  it('renders a dropdown for lists and a text box for the rest', () => {
    fixture.detectChanges();
    flushAgencies();
    fixture.detectChanges();

    const el = fixture.nativeElement;
    expect(el.querySelectorAll('details.dropdown').length).toBe(2);
    expect(el.querySelectorAll('input[type="text"]').length).toBe(1);
  });

  it('takes the dealer options from the agency catalog', () => {
    fixture.detectChanges();
    flushAgencies();

    expect(component.optionsFor(FIELDS[0])).toEqual([
      { label: 'HONDA VANGUARDIA GALERIAS', value: '10017' },
      { label: 'HONDA GONZALEZ GALLO', value: '10082' }
    ]);
    // La lista declarada se usa tal cual: la API compara exacto
    expect(component.optionsFor(FIELDS[2])).toEqual([
      { label: 'Nuevo', value: 'Nuevo' },
      { label: 'Consulta', value: 'Consulta' }
    ]);
  });

  it('sends the dealer code, not the name', () => {
    fixture.detectChanges();
    flushAgencies();

    const emitted: any[] = [];
    component.filterChange.subscribe((f) => emitted.push(f));

    component.onOptionToggle(
      FIELDS[0],
      { label: 'HONDA GONZALEZ GALLO', value: '10082' },
      toggle(true)
    );
    component.onFilter();

    expect(component.selected['dealer_id']).toBe('HONDA GONZALEZ GALLO');
    expect(emitted[0].dealer_id).toBe('10082');
  });

  it('unselecting an option clears its value', () => {
    fixture.detectChanges();
    flushAgencies();

    const option = { label: 'Consulta', value: 'Consulta' };
    component.onOptionToggle(FIELDS[2], option, toggle(true));
    expect(component.isChecked(FIELDS[2], option)).toBeTrue();

    component.onOptionToggle(FIELDS[2], option, toggle(false));

    expect(component.isChecked(FIELDS[2], option)).toBeFalse();
    expect(component.filterForm.value.lead_stage).toBe('');
  });

  it('emits every field empty when cleared', () => {
    fixture.detectChanges();
    flushAgencies();

    const emitted: any[] = [];
    component.filterChange.subscribe((f) => emitted.push(f));

    component.filterForm.patchValue({ email: 'x@example.com' });
    component.onOptionToggle(FIELDS[2], { label: 'Nuevo', value: 'Nuevo' }, toggle(true));
    component.onClearFilters();

    expect(emitted[0]).toEqual({ dealer_id: '', email: '', lead_stage: '' });
    expect(component.selected).toEqual({});
  });

  it('rebuilds the form when the sub-tab changes', () => {
    fixture.detectChanges();
    flushAgencies();

    component.filterForm.patchValue({ email: 'x@example.com' });
    setFields(component, [{ field: 'vin', label: 'VIN' }]);

    // No se arrastran valores: `email` no existe en la tabla nueva y la API lo
    // ignoraría, devolviendo el listado completo como si no hubiera filtro
    expect(Object.keys(component.filterForm.controls)).toEqual(['vin']);
    expect(component.selected).toEqual({});
  });

  it('still renders when the agency catalog fails', () => {
    const logged = spyOn(console, 'error');
    fixture.detectChanges();
    httpMock
      .match((r) => r.url.includes('agenciesfilter'))
      .forEach((req) => req.flush('nope', { status: 500, statusText: 'Server Error' }));

    expect(logged).toHaveBeenCalled();
    expect(component.optionsFor(FIELDS[0])).toEqual([]);
  });

  it('emits a download request', () => {
    fixture.detectChanges();
    flushAgencies();

    let asked = false;
    component.downloadRequested.subscribe(() => (asked = true));
    component.downloadRequested.emit();

    expect(asked).toBeTrue();
  });
});
