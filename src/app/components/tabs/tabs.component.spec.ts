import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsComponent } from './tabs.component';

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('opens on the orders tab', () => {
    expect(component.activeTab).toBe('orders');
    expect(component.isActive('orders')).toBeTrue();
  });

  it('includes every module tab', () => {
    expect(component.tabs.map((t) => t.id)).toEqual([
      'orders',
      'inventory',
      'services',
      'clients',
      'leads',
      'dwh',
      'crabi',
      'hondasf'
    ]);
  });

  it('gives every tab a label and an icon', () => {
    expect(component.tabs.every((t) => !!t.label && !!t.icon)).toBeTrue();
  });

  it('emits the selected tab', () => {
    const emitted: string[] = [];
    component.tabChanged.subscribe((t) => emitted.push(t));

    component.selectTab('crabi');

    expect(component.activeTab).toBe('crabi');
    expect(component.isActive('crabi')).toBeTrue();
    expect(component.isActive('orders')).toBeFalse();
    expect(emitted).toEqual(['crabi']);
  });

  it('renders one item per tab', () => {
    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toBe(component.tabs.length);
  });
});
