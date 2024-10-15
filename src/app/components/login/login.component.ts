import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  servicio = inject(LoginService);
  ruta = inject(Router);

  email: string = '';
  password: string = '';
  token: string = '';
  rol: string = '';

  errorMessage: string = '';

  login(formulario: any) {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }

    this.servicio.login(formulario.value).subscribe(
      (response) => {
        this.token = response.accessToken;
        this.rol = response.roles;

        if (this.token) {
          localStorage.setItem('token', this.token);  

          if (this.rol === 'admin') {
            localStorage.setItem('rol2', 'admin');
            this.ruta.navigate(['/admin']);
          } else if (this.rol === 'mecanico') {
            localStorage.setItem('rol2', 'mecanico');
            this.ruta.navigate(['/mecanico']);
          }
        } else {
          this.errorMessage = 'Error de autenticación: No se recibió un token.';
        }
      },
      (error) => {
        this.errorMessage = 'Error en el login: Credenciales incorrectas o error del servidor.';
        console.error('Error en el login:', error);
      }
    );
  }
}
