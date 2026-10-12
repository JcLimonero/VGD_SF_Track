import { ComponentFixture, TestBed } from '@angular/core/testing';
import { httpTestProviders, routerTestProviders } from '@testing/test-providers';
import { clearSession, loginAs } from '@testing/auth-testing';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [...routerTestProviders, ...httpTestProviders]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('el logo lleva al home dentro del portal, no a una URL externa', () => {
    const brand: HTMLAnchorElement =
      fixture.nativeElement.querySelector('a.menu-brand');
    expect(brand.getAttribute('href')).toBe('/home');
  });

  it('cerrar sesión borra la sesión del perfil', () => {
    loginAs('crabi');
    component.logout();
    expect(localStorage.getItem('vgd_session')).toBeNull();
    clearSession();
  });
});
