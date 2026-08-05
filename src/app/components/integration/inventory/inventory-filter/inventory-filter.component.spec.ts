import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationInventoryFilterComponent } from './inventory-filter.component';

describe('IntegrationInventoryFilterComponent', () => {
  let component: IntegrationInventoryFilterComponent;
  let fixture: ComponentFixture<IntegrationInventoryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntegrationInventoryFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntegrationInventoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
