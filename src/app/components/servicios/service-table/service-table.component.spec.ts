import { ComponentFixture, TestBed } from '@angular/core/testing';
import { httpTestProviders } from '@testing/test-providers';

import { ServiceTableComponent } from './service-table.component';

describe('ServiceTableComponent', () => {
  let component: ServiceTableComponent;
  let fixture: ComponentFixture<ServiceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceTableComponent],
      providers: httpTestProviders
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
