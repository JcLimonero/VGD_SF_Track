import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationSalesFilterComponent } from './sales-filter.component';

describe('IntegrationSalesFilterComponent', () => {
  let component: IntegrationSalesFilterComponent;
  let fixture: ComponentFixture<IntegrationSalesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntegrationSalesFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntegrationSalesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
