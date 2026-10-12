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

  /** Elige el perfil (si no es el que ya está elegido) y envía la contraseña. */
  const submit = (profile: 'sales_force' | 'crabi', password: string) => {
    if (component.selectedProfile !== profile) {
      component.selectProfile(component.profiles.find((p) => p.id === profile)!);
    }
    component.loginForm.get('password')?.setValue(password);
    component.onSubmit();
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ofrece SALES FORCE primero y luego CRABI', () => {
    const labels = Array.from(
      fixture.nativeElement.querySelectorAll('.profile-option')
    ).map((el) => (el as HTMLElement).textContent?.trim());
    expect(labels).toEqual(['SALES FORCE', 'CRABI']);
  });

  it('SALES FORCE viene elegido y se puede escribir la contraseña', () => {
    expect(component.selectedProfile).toBe('sales_force');

    const selected = fixture.nativeElement.querySelectorAll('.profile-option.selected');
    expect(selected.length).toBe(1);
    expect(selected[0].textContent.trim()).toBe('SALES FORCE');

    expect(component.loginForm.get('password')?.disabled).toBeFalse();
    expect(fixture.nativeElement.querySelector('input#password').disabled).toBeFalse();
    expect(fixture.nativeElement.querySelector('.login-btn').disabled).toBeFalse();
  });

  it('pulsar el perfil elegido lo quita y deshabilita contraseña y Entrar', () => {
    const sales = component.profiles[0];
    component.selectProfile(sales);
    fixture.detectChanges();

    expect(component.selectedProfile).toBeNull();
    expect(fixture.nativeElement.querySelectorAll('.profile-option.selected').length).toBe(0);
    expect(fixture.nativeElement.querySelector('input#password').disabled).toBeTrue();
    expect(fixture.nativeElement.querySelector('.login-btn').disabled).toBeTrue();
    expect(fixture.nativeElement.querySelector('.toggle-password').disabled).toBeTrue();
  });

  it('elegir otro perfil cambia la selección y habilita de nuevo', () => {
    component.selectProfile(component.profiles[0]); // quita SALES FORCE
    component.selectProfile(component.profiles[1]); // elige CRABI
    fixture.detectChanges();

    expect(component.selectedProfile).toBe('crabi');
    expect(fixture.nativeElement.querySelector('input#password').disabled).toBeFalse();
    expect(fixture.nativeElement.querySelector('.login-btn').disabled).toBeFalse();
  });

  it('sin perfil elegido no envía nada aunque se fuerce el envío', () => {
    component.selectProfile(component.profiles[0]); // quita SALES FORCE
    component.onSubmit();

    expect(component.errorMessage).toBe('Elige tu perfil');
    httpMock.expectNone('/auth/login');
  });

  it('pide la contraseña', () => {
    component.onSubmit();

    expect(component.errorMessage).toBe('Por favor ingresa la contraseña');
    httpMock.expectNone('/auth/login');
  });

  it('con la contraseña correcta entra al home', () => {
    const navigate = spyOn(router, 'navigate');
    submit('crabi', 'clave');

    httpMock.expectOne('/auth/login').flush({
      token: 't',
      profile: 'crabi',
      expiresAt: Date.now() + 60_000
    });

    expect(navigate).toHaveBeenCalledWith(['/home']);
    expect(component.isLoading).toBeFalse();
  });

  it('manda el perfil elegido y no otro', () => {
    submit('sales_force', 'clave');

    const req = httpMock.expectOne('/auth/login');
    expect(req.request.body).toEqual({ profile: 'sales_force', password: 'clave' });
    req.flush({}, { status: 401, statusText: 'x' });
  });

  it('contraseña incorrecta: avisa y limpia el campo', () => {
    const navigate = spyOn(router, 'navigate');
    submit('sales_force', 'mala');

    httpMock
      .expectOne('/auth/login')
      .flush({ error: 'invalid_credentials' }, { status: 401, statusText: 'x' });

    expect(component.errorMessage).toBe('Contraseña incorrecta');
    expect(component.loginForm.get('password')?.value).toBe('');
    expect(navigate).not.toHaveBeenCalled();
  });

  it('demasiados intentos: avisa cuánto esperar', () => {
    submit('crabi', 'mala');

    httpMock
      .expectOne('/auth/login')
      .flush({ retryAfter: 600 }, { status: 429, statusText: 'x' });

    expect(component.errorMessage).toContain('10 min');
  });

  it('sin conexión con el servicio: mensaje claro', () => {
    submit('sales_force', 'x');

    httpMock
      .expectOne('/auth/login')
      .flush('', { status: 502, statusText: 'Bad Gateway' });

    expect(component.errorMessage).toContain('No se pudo conectar');
    expect(component.isLoading).toBeFalse();
  });
});
