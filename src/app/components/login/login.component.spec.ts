import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { httpTestProviders, routerTestProviders } from '@testing/test-providers';
import { clearSession } from '@testing/auth-testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    clearSession();
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [...routerTestProviders, ...httpTestProviders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
    clearSession();
  });

  const submit = (profileIndex: number, password: string) => {
    component.selectProfile(component.profiles[profileIndex]);
    component.loginForm.get('password')?.setValue(password);
    component.onSubmit();
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ofrece los perfiles CRABI y SALES FORCE', () => {
    const labels = Array.from(
      fixture.nativeElement.querySelectorAll('.profile-option')
    ).map((el) => (el as HTMLElement).textContent?.trim());
    expect(labels).toEqual(['CRABI', 'SALES FORCE']);
  });

  it('pide elegir perfil antes de enviar', () => {
    component.loginForm.get('password')?.setValue('x');
    component.onSubmit();

    expect(component.errorMessage).toBe('Elige tu perfil');
    httpMock.expectNone('/auth/login');
  });

  it('pide la contraseña', () => {
    component.selectProfile(component.profiles[0]);
    component.onSubmit();

    expect(component.errorMessage).toBe('Por favor ingresa la contraseña');
    httpMock.expectNone('/auth/login');
  });

  it('con la contraseña correcta entra al home', () => {
    const navigate = spyOn(router, 'navigate');
    submit(0, 'clave');

    httpMock.expectOne('/auth/login').flush({
      token: 't',
      profile: 'crabi',
      expiresAt: Date.now() + 60_000
    });

    expect(navigate).toHaveBeenCalledWith(['/home']);
    expect(component.isLoading).toBeFalse();
  });

  it('manda el perfil elegido y no otro', () => {
    submit(1, 'clave');

    const req = httpMock.expectOne('/auth/login');
    expect(req.request.body).toEqual({ profile: 'sales_force', password: 'clave' });
    req.flush({}, { status: 401, statusText: 'x' });
  });

  it('contraseña incorrecta: avisa y limpia el campo', () => {
    const navigate = spyOn(router, 'navigate');
    submit(0, 'mala');

    httpMock
      .expectOne('/auth/login')
      .flush({ error: 'invalid_credentials' }, { status: 401, statusText: 'x' });

    expect(component.errorMessage).toBe('Contraseña incorrecta');
    expect(component.loginForm.get('password')?.value).toBe('');
    expect(navigate).not.toHaveBeenCalled();
  });

  it('demasiados intentos: avisa cuánto esperar', () => {
    submit(0, 'mala');

    httpMock
      .expectOne('/auth/login')
      .flush({ retryAfter: 600 }, { status: 429, statusText: 'x' });

    expect(component.errorMessage).toContain('10 min');
  });

  it('sin conexión con el servicio: mensaje claro', () => {
    submit(0, 'x');

    httpMock
      .expectOne('/auth/login')
      .flush('', { status: 502, statusText: 'Bad Gateway' });

    expect(component.errorMessage).toContain('No se pudo conectar');
    expect(component.isLoading).toBeFalse();
  });
});
