import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationCustomerTableComponent } from './customer-table.component';

describe('IntegrationCustomerTableComponent', () => {
  let component: IntegrationCustomerTableComponent;
  let fixture: ComponentFixture<IntegrationCustomerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntegrationCustomerTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntegrationCustomerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
