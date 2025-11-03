import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (isAuthenticated) {
      // Verificar si la sesión no ha expirado (opcional: 24 horas)
      const loginTime = localStorage.getItem('loginTime');
      if (loginTime) {
        const now = Date.now();
        const sessionDuration = 24 * 60 * 60 * 1000; // 24 horas
        
        if (now - parseInt(loginTime) > sessionDuration) {
          // Sesión expirada
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('loginTime');
          this.router.navigate(['/login']);
          return false;
        }
      }
      
      return true;
    }
    
    // No autenticado, redirigir a login
    this.router.navigate(['/login']);
    return false;
  }
}