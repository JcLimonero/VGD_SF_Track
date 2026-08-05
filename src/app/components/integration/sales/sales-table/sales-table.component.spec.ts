import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationSalesTableComponent } from './sales-table.component';

describe('IntegrationSalesTableComponent', () => {
  let component: IntegrationSalesTableComponent;
  let fixture: ComponentFixture<IntegrationSalesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntegrationSalesTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntegrationSalesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
