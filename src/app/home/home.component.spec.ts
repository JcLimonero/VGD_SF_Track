import { Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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

  // El *ngIf destruye y recrea el componente de sub-pestanas cada vez que se
  // sale de la pestana y se vuelve, pero el home conserva la tabla abierta.
  // Cuando la sub-pestana marcada era estado interno del hijo, al volver
  // saltaba a la primera y la tabla se quedaba en la anterior; encima el guard
  // de selectTab daba por activa la pildora marcada, asi que pulsarla no hacia
  // nada y no habia forma de volver a esa tabla desde la interfaz.
  describe('sub-pestana al volver a la pestana', () => {
    const subtabsOf = <T>(type: Type<T>): T =>
      fixture.debugElement.query(By.directive(type as Type<unknown>))
        .componentInstance as T;

    it('Honda SF keeps the sub-tab that stayed open', () => {
      component.onTabChanged('hondasf');
      fixture.detectChanges();

      subtabsOf(HondaSfSubtabsComponent).selectTab('portalhondaleads');
      fixture.detectChanges();
      expect(component.activeHondaSfTable).toBe('portalhondaleads');

      component.onTabChanged('dwh');
      fixture.detectChanges();
      component.onTabChanged('hondasf');
      fixture.detectChanges();

      const subtabs = subtabsOf(HondaSfSubtabsComponent);
      expect(subtabs.activeTab).toBe('portalhondaleads');
      expect(subtabs.isActive(HONDA_SF_TABLES[0].id)).toBeFalse();
    });

    it('Integracion SF keeps the sub-tab that stayed open', () => {
      component.onTabChanged('salesforce');
      fixture.detectChanges();

      const wanted = subtabsOf(SalesforceSubtabsComponent).tabs[1].id;
      subtabsOf(SalesforceSubtabsComponent).selectTab(wanted);
      fixture.detectChanges();
      expect(component.activeSalesforceTable).toBe(wanted);

      component.onTabChanged('dwh');
      fixture.detectChanges();
      component.onTabChanged('salesforce');
      fixture.detectChanges();

      expect(subtabsOf(SalesforceSubtabsComponent).activeTab).toBe(wanted);
    });
  });
});
