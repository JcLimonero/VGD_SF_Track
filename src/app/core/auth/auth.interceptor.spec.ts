import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { routerTestProviders } from '@testing/test-providers';
import { clearSession, loginAs } from '@testing/auth-testing';

import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    clearSession();
    TestBed.configureTestingModule({
      providers: [
        ...routerTestProviders,
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting()
      ]
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
    clearSession();
  });

  it('manda la sesión a /api', () => {
    loginAs('crabi');
    http.get('/api/vgd/orderscrabi').subscribe();

    const req = httpMock.expectOne('/api/vgd/orderscrabi');
    expect(req.request.headers.get('Authorization')).toBe(
      'Bearer token-de-prueba'
    );
    req.flush({});
  });

  it('no manda la sesión a otras URL', () => {
    loginAs('crabi');
    http.get('https://otro-sitio.example.com/x').subscribe();
    http.post('/auth/login', {}).subscribe();

    for (const req of httpMock.match(() => true)) {
      expect(req.request.headers.has('Authorization')).toBeFalse();
      req.flush({});
    }
  });

  it('sin sesión no inventa un token', () => {
    http.get('/api/vgd/dwh').subscribe({ error: () => undefined });

    const req = httpMock.expectOne('/api/vgd/dwh');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({}, { status: 401, statusText: 'Unauthorized' });
  });

  it('la sesión vencida (401 session_expired) cierra la sesión y manda al login', () => {
    loginAs('sales_force');
    const navigate = spyOn(router, 'navigate');
    http.get('/api/vgd/dwh').subscribe({ error: () => undefined });

    httpMock
      .expectOne('/api/vgd/dwh')
      .flush({ error: 'session_expired' }, { status: 401, statusText: 'Unauthorized' });

    expect(localStorage.getItem('vgd_session')).toBeNull();
    expect(navigate).toHaveBeenCalledWith(['/login']);
  });

  it('un 401 que viene de la API no cierra la sesión', () => {
    loginAs('sales_force');
    const navigate = spyOn(router, 'navigate');
    http.get('/api/vgd/dwh').subscribe({ error: () => undefined });

    httpMock
      .expectOne('/api/vgd/dwh')
      .flush({ message: 'invalid provider token' }, { status: 401, statusText: 'Unauthorized' });

    expect(localStorage.getItem('vgd_session')).not.toBeNull();
    expect(navigate).not.toHaveBeenCalled();
  });

  it('un 403 no cierra la sesión: el perfil sigue siendo válido', () => {
    loginAs('crabi');
    const navigate = spyOn(router, 'navigate');
    http.get('/api/vgd/dwh').subscribe({ error: () => undefined });

    httpMock
      .expectOne('/api/vgd/dwh')
      .flush({}, { status: 403, statusText: 'Forbidden' });

    expect(localStorage.getItem('vgd_session')).not.toBeNull();
    expect(navigate).not.toHaveBeenCalled();
  });
});
