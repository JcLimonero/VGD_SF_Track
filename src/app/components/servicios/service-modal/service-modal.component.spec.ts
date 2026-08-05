import { ComponentFixture, TestBed } from '@angular/core/testing';
import { dialogTestProviders } from '@testing/test-providers';

import { ServiceModalComponent } from './service-modal.component';

describe('ServiceModalComponent', () => {
  let component: ServiceModalComponent;
  let fixture: ComponentFixture<ServiceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceModalComponent],
      providers: dialogTestProviders()
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
