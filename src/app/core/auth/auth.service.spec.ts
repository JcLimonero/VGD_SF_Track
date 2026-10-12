import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { httpTestProviders } from '@testing/test-providers';
import { clearSession, loginAs } from '@testing/auth-testing';

import { AuthService } from './auth.service';
import { PROFILES } from './profiles';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    clearSession();
    TestBed.configureTestingModule({ providers: httpTestProviders });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    clearSession();
  });

  it('sin sesión no hay perfil y no se ve ninguna pestaña', () => {
    expect(service.isAuthenticated()).toBeFalse();
    expect(service.profile()).toBeNull();
    expect(service.canSee('crabi')).toBeFalse();
    expect(service.defaultTab()).toBeNull();
  });

  it('el login manda perfil y contraseña al servicio y guarda la sesión', () => {
    service.login('crabi', 'clave').subscribe();

    const req = httpMock.expectOne('/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ profile: 'crabi', password: 'clave' });
    req.flush({
      token: 't',
      profile: 'crabi',
      expiresAt: Date.now() + 1000 * 60
    });

    expect(service.isAuthenticated()).toBeTrue();
    expect(service.profile()?.label).toBe('CRABI');
  });

  it('un login rechazado no deja sesión', () => {
    service.login('crabi', 'mala').subscribe({ error: () => undefined });
    httpMock
      .expectOne('/auth/login')
      .flush({ error: 'invalid_credentials' }, { status: 401, statusText: 'x' });

    expect(service.isAuthenticated()).toBeFalse();
  });

  it('CRABI ve solo Crabi', () => {
    loginAs('crabi');
    expect(service.canSee('crabi')).toBeTrue();
    expect(service.defaultTab()).toBe('crabi');
    for (const tab of ['orders', 'inventory', 'demos', 'hondasf', 'salesforce']) {
      expect(service.canSee(tab)).withContext(tab).toBeFalse();
    }
  });

  it('SALES FORCE ve todo menos Crabi', () => {
    loginAs('sales_force');
    expect(service.canSee('crabi')).toBeFalse();
    for (const tab of ['orders', 'inventory', 'demos', 'services', 'clients',
      'leads', 'dwh', 'salesforce', 'hondasf']) {
      expect(service.canSee(tab)).withContext(tab).toBeTrue();
    }
    expect(service.defaultTab()).toBe('orders');
  });

  it('una sesión caducada se descarta', () => {
    localStorage.setItem(
      'vgd_session',
      JSON.stringify({ token: 't', profile: 'crabi', expiresAt: Date.now() - 1 })
    );
    expect(service.isAuthenticated()).toBeFalse();
    expect(localStorage.getItem('vgd_session')).toBeNull();
  });

  it('una sesión alterada o de un perfil inexistente no cuenta', () => {
    localStorage.setItem('vgd_session', '{no es json');
    expect(service.isAuthenticated()).toBeFalse();

    localStorage.setItem(
      'vgd_session',
      JSON.stringify({ token: 't', profile: 'admin', expiresAt: Date.now() + 1e6 })
    );
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('cerrar sesión la borra', () => {
    loginAs('crabi');
    service.logout();
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('borra las llaves del acceso anterior al arrancar', () => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('loginTime', '1');
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: httpTestProviders });
    TestBed.inject(AuthService);

    expect(localStorage.getItem('isAuthenticated')).toBeNull();
    expect(localStorage.getItem('loginTime')).toBeNull();
  });

  it('las pestañas de los dos perfiles no se traslapan', () => {
    const [a, b] = PROFILES.map((p) => p.tabs);
    expect(a.filter((tab) => b.includes(tab))).toEqual([]);
  });
});
