import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  servicio = inject(LoginService);
  token: string | null = '';
  rol2: string | null = '';
  
  constructor(private router: Router) {}

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.rol2 = localStorage.getItem('rol2');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol2');
    this.router.navigate(['/login']);
  }
}
