import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { httpTestProviders } from '@testing/test-providers';

import { SalesforceTableComponent } from './salesforce-table.component';
import { MockDataService } from '../../../services/mock-data.service';

describe('SalesforceTableComponent', () => {
  let component: SalesforceTableComponent;
  let fixture: ComponentFixture<SalesforceTableComponent>;
  let tables: string[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesforceTableComponent],
      providers: httpTestProviders
    }).compileComponents();

    fixture = TestBed.createComponent(SalesforceTableComponent);
    component = fixture.componentInstance;
    tables = TestBed.inject(MockDataService).getSalesforceTables();
    component.table = tables[0];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the table given as input', fakeAsync(() => {
    fixture.detectChanges();
    tick(500);

    expect(component.loading).toBeFalse();
    expect(component.data.length).toBeGreaterThan(0);
    expect(component.columns.length).toBeGreaterThan(0);
  }));

  it('does not query when no table is set', fakeAsync(() => {
    component.table = '';
    fixture.detectChanges();
    tick(500);

    expect(component.data).toEqual([]);
    expect(component.loading).toBeFalse();
  }));

  it('rebuilds the columns when the table changes', fakeAsync(() => {
    fixture.detectChanges();
    tick(500);
    const firstColumns = component.displayedColumns.join(',');

    // Simula el cambio de sub-pestaña
    component.table = tables[1];
    component.ngOnChanges({
      table: {
        currentValue: tables[1],
        previousValue: tables[0],
        firstChange: false,
        isFirstChange: () => false
      }
    });
    tick(500);

    expect(component.displayedColumns.join(',')).not.toBe(firstColumns);
    expect(component.data.length).toBeGreaterThan(0);
  }));

  it('returns to the first page when the table changes', fakeAsync(() => {
    fixture.detectChanges();
    tick(500);

    component.loadPage(2, 5);
    tick(500);
    expect(component.pageIndex).toBe(2);

    component.table = tables[1];
    component.ngOnChanges({
      table: {
        currentValue: tables[1],
        previousValue: tables[0],
        firstChange: false,
        isFirstChange: () => false
      }
    });
    tick(500);

    expect(component.pageIndex).toBe(0);
  }));

  it('ignores the first change so it does not double-load on init', fakeAsync(() => {
    fixture.detectChanges();
    tick(500);

    const spy = spyOn(component, 'loadPage').and.callThrough();
    component.ngOnChanges({
      table: {
        currentValue: tables[0],
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true
      }
    });
    tick(500);

    expect(spy).not.toHaveBeenCalled();
  }));

  it('always ends with the details button column', fakeAsync(() => {
    fixture.detectChanges();
    tick(500);

    const last = component.columns[component.columns.length - 1];
    expect(last.property).toBe('actions');
    expect(last.type).toBe('button');
  }));

  it('hides internal fields but keeps the agency first', fakeAsync(() => {
    fixture.detectChanges();
    tick(500);

    expect(component.displayedColumns).not.toContain('id');
    expect(component.displayedColumns).not.toContain('idAgency');
    expect(component.displayedColumns[0]).toBe('agencyName');
  }));
});
