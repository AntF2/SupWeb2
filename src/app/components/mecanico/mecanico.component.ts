import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-mecanico',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './mecanico.component.html',
  styleUrl: './mecanico.component.css'
})
export class MecanicoComponent {
  servicio = inject(LoginService);
  revisiones: any[] = [];
  placa: string = '';
  descripcion: string = '';

  constructor() {
    this.obtenerRevisiones();
  }

  obtenerRevisiones() {
    this.servicio.getUsuarios().subscribe((revisiones: any[]) => {
      this.revisiones = revisiones;
    });
  }

  crearRevision() {
    const nuevaRevision = {
      placa: this.placa,
      descripcion: this.descripcion
    };
    this.servicio.postUser2(nuevaRevision).subscribe(() => {
      this.obtenerRevisiones();
    });
  }

  buscarPorPlaca() {
    this.revisiones = this.revisiones.filter(revision => revision.placa === this.placa);
  }
}