import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { httpTestProviders } from '@testing/test-providers';

import { CrabiTableComponent } from './crabi-table.component';

describe('CrabiTableComponent', () => {
  let component: CrabiTableComponent;
  let fixture: ComponentFixture<CrabiTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrabiTableComponent],
      providers: httpTestProviders
    }).compileComponents();

    fixture = TestBed.createComponent(CrabiTableComponent);
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

    const orderColumn = component.columns.find((c) => c.property === 'order_dms');
    expect(orderColumn?.label).toBe('No. Orden');
  }));

  it('hides the internal fields from the table', fakeAsync(() => {
    fixture.detectChanges();
    tick(500);

    expect(component.displayedColumns).not.toContain('id');
    expect(component.displayedColumns).not.toContain('idAgency');
  }));

  it('reports no active filters until one is applied', fakeAsync(() => {
    fixture.detectChanges();
    tick(500);
    expect(component.hasActiveFilters).toBeFalse();

    component.applyFilter({ vin: 'VIN00000021' });
    tick(500);
    expect(component.hasActiveFilters).toBeTrue();
  }));

  it('narrows the results when a filter is applied', fakeAsync(() => {
    fixture.detectChanges();
    tick(500);
    const unfiltered = component.total!;

    component.applyFilter({ status: 'Pendiente' });
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

    component.applyFilter({ status: 'Enviado' });
    tick(500);
    expect(component.pageIndex).toBe(0);
  }));

  it('clears the sort when an empty column is emitted', fakeAsync(() => {
    fixture.detectChanges();
    tick(500);

    component.onSortChange({ column: '', direction: 'asc' });
    tick(500);
    expect(component.currentSort).toBeNull();

    component.onSortChange({ column: 'premium', direction: 'asc' });
    tick(500);
    expect(component.currentSort).toEqual({ column: 'premium', direction: 'asc' });
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
