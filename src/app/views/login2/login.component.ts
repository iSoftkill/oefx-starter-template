import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OefaButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-login2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OefaButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent2 {
  private readonly fb = inject(FormBuilder);

  readonly formulario = this.fb.group({
    usuario: ['', [Validators.required]],
    contrasena: ['', [Validators.required]]
  });

  readonly mostrarClave = signal(false);
  readonly error = signal<string | null>(null);
  readonly cargando = signal(false);

  alternarClave(): void {
    this.mostrarClave.update((v) => !v);
  }

  ingresar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.error.set(null);
    this.cargando.set(true);

    setTimeout(() => {
      this.cargando.set(false);
      this.error.set('Credenciales no validas.');
    }, 1000);
  }
}
