import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { httpTestProviders } from '@testing/test-providers';

import { HondaSfTableComponent } from './honda-sf-table.component';

describe('HondaSfTableComponent', () => {
  let component: HondaSfTableComponent;
  let fixture: ComponentFixture<HondaSfTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HondaSfTableComponent],
      providers: httpTestProviders
    }).compileComponents();

    fixture = TestBed.createComponent(HondaSfTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the first page on init and builds columns from the data', fakeAsync(() => {
    fixture.detectChanges();
    tick(500);

    expect(component.loading).toBeFalse();
    expect(component.error).toBeNull();
    expect(component.data.length).toBeGreaterThan(0);
    expect(component.total).toBeGreaterThan(0);

    // La última columna siempre es el botón de detalles
    const last = component.columns[component.columns.length - 1];
    expect(last.property).toBe('actions');
    expect(last.type).toBe('button');
  }));

  it('uses the Spanish label overrides for the columns', fakeAsync(() => {
    fixture.detectChanges();
    tick(500);

    const recordColumn = component.columns.find((c) => c.property === 'record_id');
    expect(recordColumn?.label).toBe('No. Registro');
  }));

  it('hides the internal fields from the table', fakeAsync(() => {
    fixture.detectChanges();
    tick(500);

    expect(component.displayedColumns).not.toContain('id');
    expect(component.displayedColumns).not.toContain('dealer_code');
    expect(component.displayedColumns).not.toContain('error_message');
  }));

  it('reports no active filters until one is applied', fakeAsync(() => {
    fixture.detectChanges();
    tick(500);
    expect(component.hasActiveFilters).toBeFalse();

    component.applyFilter({ sf_object: 'Lead' });
    tick(500);
    expect(component.hasActiveFilters).toBeTrue();
  }));

  it('narrows the results when a filter is applied', fakeAsync(() => {
    fixture.detectChanges();
    tick(500);
    const unfiltered = component.total!;

    component.applyFilter({ sync_status: 'Pendiente' });
    tick(500);

    expect(component.total).toBeLessThan(unfiltered);
    expect(component.total).toBeGreaterThan(0);
  }));

  it('returns to the first page when filtering', fakeAsync(() => {
    fixture.detectChanges();
    tick(500);

    component.loadPage(2, 5);
    tick(500);
    expect(component.pageIndex).toBe(2);

    component.applyFilter({ sf_object: 'Order' });
    tick(500);
    expect(component.pageIndex).toBe(0);
  }));

  it('clears the sort when an empty column is emitted', fakeAsync(() => {
    fixture.detectChanges();
    tick(500);

    component.onSortChange({ column: '', direction: 'asc' });
    tick(500);
    expect(component.currentSort).toBeNull();

    component.onSortChange({ column: 'record_id', direction: 'asc' });
    tick(500);
    expect(component.currentSort).toEqual({
      column: 'record_id',
      direction: 'asc'
    });
  }));

  it('keeps the chosen page size when changing pages', fakeAsync(() => {
    fixture.detectChanges();
    tick(500);

    component.loadPage(0, 25);
    tick(500);
    expect(component.currentPageSize).toBe(25);

    component.applyFilter({});
    tick(500);
    expect(component.currentPageSize).toBe(25);
  }));

  it('does not attempt an Excel download when there is nothing to export', () => {
    const warn = spyOn(console, 'warn');
    component.total = 0;
    component.downloadExcel();

    expect(warn).toHaveBeenCalled();
    expect(component.isDownloadingExcel).toBeFalse();
  });
});
