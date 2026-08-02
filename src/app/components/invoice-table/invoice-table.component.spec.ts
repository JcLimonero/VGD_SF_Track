import { ComponentFixture, TestBed } from '@angular/core/testing';
import { httpTestProviders } from '@testing/test-providers';

import { InvoiceTableComponent } from './invoice-table.component';

describe('InvoiceTableComponent', () => {
  let component: InvoiceTableComponent;
  let fixture: ComponentFixture<InvoiceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceTableComponent],
      providers: httpTestProviders
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoiceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
