import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { PROFILES, Profile, ProfileId } from '../../core/auth/profiles';

@Component({
  selector: 'vex-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  readonly profiles = PROFILES;

  loginForm: FormGroup;
  /** SALES FORCE (el primero de la lista) viene elegido */
  selectedProfile: ProfileId | null = PROFILES[0].id;
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.loginForm = this.fb.group({
      password: ['', [Validators.required]]
    });
    if (!this.selectedProfile) this.loginForm.get('password')?.disable();
  }

  /**
   * Elige un perfil; pulsar el que ya está elegido lo quita. Sin perfil no se
   * puede escribir la contraseña ni entrar.
   */
  selectProfile(profile: Profile): void {
    this.selectedProfile =
      this.selectedProfile === profile.id ? null : profile.id;
    this.errorMessage = '';

    const password = this.loginForm.get('password');
    if (this.selectedProfile) {
      password?.enable();
    } else {
      password?.disable();
    }
  }

  onSubmit(): void {
    if (!this.selectedProfile) {
      this.errorMessage = 'Elige tu perfil';
      return;
    }
    if (this.loginForm.invalid || this.loginForm.get('password')?.disabled) {
      this.errorMessage = 'Por favor ingresa la contraseña';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    const password = this.loginForm.get('password')?.value;

    this.auth.login(this.selectedProfile, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/home']);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.errorMessage = this.messageFor(error);
        this.loginForm.get('password')?.setValue('');
      }
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  private messageFor(error: HttpErrorResponse): string {
    if (error.status === 401) return 'Contraseña incorrecta';
    if (error.status === 429) {
      const seconds = Number(error.error?.retryAfter ?? 0);
      const minutes = Math.max(1, Math.ceil(seconds / 60));
      return `Demasiados intentos. Vuelve a intentar en ${minutes} min`;
    }
    return 'No se pudo conectar. Intenta de nuevo en un momento';
  }
}
