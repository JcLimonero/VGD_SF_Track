import { ComponentFixture, TestBed } from '@angular/core/testing';
import { httpTestProviders } from '@testing/test-providers';

import { SalesforceSubtabsComponent } from './salesforce-subtabs.component';

describe('SalesforceSubtabsComponent', () => {
  let component: SalesforceSubtabsComponent;
  let fixture: ComponentFixture<SalesforceSubtabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesforceSubtabsComponent],
      providers: httpTestProviders
    }).compileComponents();

    fixture = TestBed.createComponent(SalesforceSubtabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('builds one sub-tab per honda table', () => {
    expect(component.tabs.length).toBeGreaterThan(0);
    expect(component.tabs.every((t) => t.id.includes('honda'))).toBeTrue();
    expect(component.tabs.every((t) => !!t.label)).toBeTrue();
  });

  it('selects the first table by default', () => {
    expect(component.activeTab).toBe(component.tabs[0].id);
    expect(component.isActive(component.tabs[0].id)).toBeTrue();
  });

  it('emits when a different sub-tab is selected', () => {
    const emitted: string[] = [];
    component.tabChanged.subscribe((t) => emitted.push(t));

    component.selectTab(component.tabs[1].id);

    expect(component.activeTab).toBe(component.tabs[1].id);
    expect(emitted).toEqual([component.tabs[1].id]);
  });

  it('does not re-emit when the active sub-tab is clicked again', () => {
    const emitted: string[] = [];
    component.tabChanged.subscribe((t) => emitted.push(t));

    component.selectTab(component.activeTab);

    expect(emitted).toEqual([]);
  });

  it('renders a button per sub-tab', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button.subtab');
    expect(buttons.length).toBe(component.tabs.length);
  });
});
