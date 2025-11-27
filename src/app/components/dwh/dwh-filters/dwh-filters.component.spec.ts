import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwhFiltersComponent } from './dwh-filters.component';

describe('DwhFiltersComponent', () => {
  let component: DwhFiltersComponent;
  let fixture: ComponentFixture<DwhFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DwhFiltersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DwhFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
