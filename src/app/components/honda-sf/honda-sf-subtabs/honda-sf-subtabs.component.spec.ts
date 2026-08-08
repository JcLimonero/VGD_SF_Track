import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HondaSfSubtabsComponent } from './honda-sf-subtabs.component';
import { HONDA_SF_TABLES } from '../honda-sf.catalog';

describe('HondaSfSubtabsComponent', () => {
  let component: HondaSfSubtabsComponent;
  let fixture: ComponentFixture<HondaSfSubtabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HondaSfSubtabsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HondaSfSubtabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows one sub-tab per table of the catalog', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button.subtab');
    expect(buttons.length).toBe(HONDA_SF_TABLES.length);
    expect(buttons[0].textContent.trim()).toBe('Clientes');
  });

  it('opens on the first table', () => {
    expect(component.activeTab).toBe(HONDA_SF_TABLES[0].id);
    expect(component.isActive(HONDA_SF_TABLES[0].id)).toBeTrue();
  });

  it('emits the selected table', () => {
    const emitted: string[] = [];
    component.tabChanged.subscribe((t) => emitted.push(t));

    component.selectTab('portalhondaleads');

    expect(component.activeTab).toBe('portalhondaleads');
    expect(component.isActive(HONDA_SF_TABLES[0].id)).toBeFalse();
    expect(emitted).toEqual(['portalhondaleads']);
  });

  it('does not reload when the active sub-tab is clicked again', () => {
    const emitted: string[] = [];
    component.tabChanged.subscribe((t) => emitted.push(t));

    component.selectTab(component.activeTab);

    expect(emitted).toEqual([]);
  });
});
