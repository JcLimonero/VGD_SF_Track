import { ComponentFixture, TestBed } from '@angular/core/testing';
import { httpTestProviders } from '@testing/test-providers';
import { clearSession, loginAs } from '@testing/auth-testing';

import { TabsComponent } from './tabs.component';

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  beforeEach(async () => {
    loginAs('sales_force');
    await TestBed.configureTestingModule({
      imports: [TabsComponent],
      providers: httpTestProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => clearSession());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('opens on the orders tab', () => {
    expect(component.activeTab).toBe('orders');
    expect(component.isActive('orders')).toBeTrue();
  });

  it('SALES FORCE ve todos los módulos menos Crabi', () => {
    expect(component.tabs.map((t) => t.id)).toEqual([
      'orders',
      'inventory',
      'demos',
      'services',
      'clients',
      'leads',
      'dwh',
      'salesforce',
      'hondasf'
    ]);
  });

  it('gives every tab a label and an icon', () => {
    expect(component.tabs.every((t) => !!t.label && !!t.icon)).toBeTrue();
  });

  it('emits the selected tab', () => {
    const emitted: string[] = [];
    component.tabChanged.subscribe((t) => emitted.push(t));

    component.selectTab('dwh');

    expect(component.activeTab).toBe('dwh');
    expect(component.isActive('dwh')).toBeTrue();
    expect(component.isActive('orders')).toBeFalse();
    expect(emitted).toEqual(['dwh']);
  });

  it('renders one item per tab', () => {
    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toBe(component.tabs.length);
  });

  it('SALES FORCE no puede abrir Crabi', () => {
    const emitted: string[] = [];
    component.tabChanged.subscribe((t) => emitted.push(t));

    component.selectTab('crabi');

    expect(component.activeTab).toBe('orders');
    expect(emitted).toEqual([]);
  });

  it('CRABI ve solo Crabi y abre en ella', () => {
    loginAs('crabi');
    const crabi = TestBed.createComponent(TabsComponent);
    crabi.detectChanges();

    expect(crabi.componentInstance.tabs.map((t) => t.id)).toEqual(['crabi']);
    expect(crabi.componentInstance.activeTab).toBe('crabi');
    expect(crabi.nativeElement.querySelectorAll('li').length).toBe(1);
  });

  it('CRABI no puede abrir ninguna otra pestaña', () => {
    loginAs('crabi');
    const crabi = TestBed.createComponent(TabsComponent).componentInstance;

    crabi.selectTab('orders');
    crabi.selectTab('hondasf');

    expect(crabi.activeTab).toBe('crabi');
  });
});
