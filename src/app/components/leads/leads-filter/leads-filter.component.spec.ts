import { ComponentFixture, TestBed } from '@angular/core/testing';
import { httpTestProviders } from '@testing/test-providers';

import { LeadsFilterComponent } from './leads-filter.component';

describe('LeadsFilterComponent', () => {
  let component: LeadsFilterComponent;
  let fixture: ComponentFixture<LeadsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadsFilterComponent],
      providers: httpTestProviders
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeadsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
