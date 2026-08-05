import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationCustomerFilterComponent } from './customer-filter.component';

describe('IntegrationCustomerFilterComponent', () => {
  let component: IntegrationCustomerFilterComponent;
  let fixture: ComponentFixture<IntegrationCustomerFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntegrationCustomerFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntegrationCustomerFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
