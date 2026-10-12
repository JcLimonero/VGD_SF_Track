import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'vex-menu',
  imports: [CommonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  logout(): void {
    this.auth.logout();

    // Redirigir a login
    this.router.navigate(['/login']);
  }
}
