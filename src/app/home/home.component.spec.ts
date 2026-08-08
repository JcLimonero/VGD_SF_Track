import { ComponentFixture, TestBed } from '@angular/core/testing';
import { httpTestProviders } from '@testing/test-providers';

import { HomeComponent } from './home.component';
import { HondaSfSubtabsComponent } from '../components/honda-sf/honda-sf-subtabs/honda-sf-subtabs.component';
import { SalesforceSubtabsComponent } from '../components/salesforce/salesforce-subtabs/salesforce-subtabs.component';
import { HONDA_SF_TABLES, findHondaSfTable } from '../components/honda-sf/honda-sf.catalog';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: httpTestProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('hondaSfFilterFields', () => {
    it('gives the filters of the active sub-tab', () => {
      const expected = findHondaSfTable(component.activeHondaSfTable)!.filters;

      expect(component.hondaSfFilterFields).toBe(expected);
      expect(component.hondaSfFilterFields.length).toBeGreaterThan(0);
    });

    it('swaps the filters when the sub-tab changes', () => {
      const before = component.hondaSfFilterFields;

      component.onHondaSfTableChanged('portalhondaleads');

      expect(component.activeHondaSfTable).toBe('portalhondaleads');
      expect(component.hondaSfFilterFields).not.toBe(before);
      expect(component.hondaSfFilterFields).toBe(
        findHondaSfTable('portalhondaleads')!.filters
      );
    });

    // Documenta el comportamiento, no lo aprueba: una tabla que no este en el
    // catalogo deja la barra de filtros vacia en vez de fallar. La tabla, en
    // cambio, cae en HONDA_SF_TABLES[0], asi que ambos dejarian de coincidir.
    it('returns an empty list for a table outside the catalog', () => {
      component.onHondaSfTableChanged('portalhondainexistente');

      expect(component.hondaSfFilterFields).toEqual([]);
    });
  });

  // La sub-pestana inicial se decide en dos lugares: el componente de
  // sub-pestanas y el home. Hoy los dos toman la primera de la lista, pero nada
  // lo obliga; si se separan, el usuario veria los filtros de una tabla sobre
  // los datos de otra sin ningun aviso.
  describe('sub-pestana inicial', () => {
    it('matches the one Honda SF opens on', () => {
      const subtabs = TestBed.createComponent(HondaSfSubtabsComponent);
      subtabs.detectChanges();

      expect(component.activeHondaSfTable).toBe(
        subtabs.componentInstance.activeTab
      );
      expect(component.activeHondaSfTable).toBe(HONDA_SF_TABLES[0].id);
    });

    it('matches the one Integracion SF opens on', () => {
      const subtabs = TestBed.createComponent(SalesforceSubtabsComponent);
      subtabs.detectChanges();

      expect(component.activeSalesforceTable).toBe(
        subtabs.componentInstance.activeTab
      );
    });
  });
});
