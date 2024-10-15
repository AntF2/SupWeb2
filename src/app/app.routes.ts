import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { MecanicoComponent } from './components/mecanico/mecanico.component';
import { loginGuard } from './guards/login.guard';
import { adminGuard } from './guards/login.guard';
import { mecanicoGuard } from './guards/login.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [loginGuard, adminGuard] },
  { path: 'mecanico', component: MecanicoComponent, canActivate: [loginGuard, mecanicoGuard] }
];
