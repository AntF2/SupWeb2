import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  servicio = inject(LoginService);
  usuarios: any[] = [];

  constructor(private router: Router) {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.servicio.getUsuarios().subscribe((usuarios: any[]) => {
      this.usuarios = usuarios;
    });
  }

  eliminarUsuario(id: string) {
    this.servicio.deleteUsuario(id).subscribe(() => {
      this.obtenerUsuarios();  
    });
  }
  editarUsuario(usuario: any) {
    this.servicio.putUsuarios(usuario).subscribe(() => {
      this.obtenerUsuarios();  
    });
  }
}