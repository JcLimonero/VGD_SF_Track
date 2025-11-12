import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryFilterComponent } from './inventory-filter.component';

describe('InventoryFilterComponent', () => {
  let component: InventoryFilterComponent;
  let fixture: ComponentFixture<InventoryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
