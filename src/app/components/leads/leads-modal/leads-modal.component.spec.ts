import { ComponentFixture, TestBed } from '@angular/core/testing';
import { dialogTestProviders } from '@testing/test-providers';

import { LeadsModalComponent } from './leads-modal.component';

describe('LeadsModalComponent', () => {
  let component: LeadsModalComponent;
  let fixture: ComponentFixture<LeadsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadsModalComponent],
      providers: dialogTestProviders()
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeadsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
