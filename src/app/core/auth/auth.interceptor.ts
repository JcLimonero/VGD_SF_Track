import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

/** Prefijo que nginx reenvía a la API de Vanguardia. */
const API_PREFIX = '/api/';

/**
 * Manda la sesión del perfil a `/api`. nginx la valida con el servicio de
 * acceso y solo entonces agrega el token de proveedor y reenvía la llamada.
 *
 * Si la sesión ya no vale, nginx responde 401 con `session_expired`: se cierra y
 * se vuelve al login. Un 401 que venga de la API (token de proveedor mal
 * cargado, endpoint inexistente) NO cierra la sesión: no es culpa del usuario y
 * mandarlo al login en bucle solo escondería el problema. Un 403 tampoco: el
 * perfil está bien pero no puede hacer esa llamada.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(API_PREFIX)) return next(req);

  const auth = inject(AuthService);
  const router = inject(Router);
  const token = auth.token();

  const authorized = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authorized).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && error.error?.error === 'session_expired') {
        auth.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
