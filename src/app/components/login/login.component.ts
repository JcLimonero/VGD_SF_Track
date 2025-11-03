import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'vex-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  private readonly VALID_PASSWORD = 'Vanguardia123';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor ingresa la contraseña';
      return;
    }

    this.isLoading = true;
    const password = this.loginForm.get('password')?.value;

    // Simular delay de autenticación
    setTimeout(() => {
      if (password === this.VALID_PASSWORD) {
        // Login exitoso - guardar estado en localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('loginTime', Date.now().toString());
        
        // Redirigir a home
        this.router.navigate(['/home']);
      } else {
        // Login fallido
        this.errorMessage = 'Contraseña incorrecta';
        this.loginForm.get('password')?.setValue('');
      }
      this.isLoading = false;
    }, 1000);
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }
}
