import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'vex-menu',
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  constructor(private router: Router) {}

  logout(): void {
    // Limpiar datos de autenticación
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('loginTime');

    // Redirigir a login
    this.router.navigate(['/login']);
  }
}
