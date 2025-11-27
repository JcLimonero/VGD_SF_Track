import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwhTableComponent } from './dwh-table.component';

describe('DwhTableComponent', () => {
  let component: DwhTableComponent;
  let fixture: ComponentFixture<DwhTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DwhTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DwhTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
