import { ComponentFixture, TestBed } from '@angular/core/testing';
import { httpTestProviders } from '@testing/test-providers';

import { InventoryFilterComponent } from './inventory-filter.component';

describe('InventoryFilterComponent', () => {
  let component: InventoryFilterComponent;
  let fixture: ComponentFixture<InventoryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryFilterComponent],
      providers: httpTestProviders
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ofrece Demo en el filtro de Tipo y lo envía como typeDescription', () => {
    const options = Array.from(
      fixture.nativeElement.querySelectorAll('.dropdown-panel label.checkbox')
    ).map((el) => (el as HTMLElement).textContent?.trim());
    expect(options).toContain('Demo');

    const emitted: any[] = [];
    component.filterChange.subscribe((f: any) => emitted.push(f));
    component.onTypeToggle('Demo', { target: { checked: true } } as unknown as Event);

    expect(emitted.length).toBe(1);
    expect(emitted[0].typeDescription).toBe('Demo');
  });
});
