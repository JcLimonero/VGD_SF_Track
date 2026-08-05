import { ComponentFixture, TestBed } from '@angular/core/testing';
import { dialogTestProviders } from '@testing/test-providers';

import { CustomerModalComponent } from './customer-modal.component';

describe('CustomerModalComponent', () => {
  let component: CustomerModalComponent;
  let fixture: ComponentFixture<CustomerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerModalComponent],
      providers: dialogTestProviders()
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
