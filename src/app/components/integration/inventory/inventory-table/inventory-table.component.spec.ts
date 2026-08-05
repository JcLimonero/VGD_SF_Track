import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationInventoryTableComponent } from './inventory-table.component';

describe('IntegrationInventoryTableComponent', () => {
  let component: IntegrationInventoryTableComponent;
  let fixture: ComponentFixture<IntegrationInventoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntegrationInventoryTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntegrationInventoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
