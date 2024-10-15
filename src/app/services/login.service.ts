import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  // Definir las URLs para la API
  private API_USUARIOS = "http://localhost:3000/users"; // Para manejar usuarios
  private API_LOGIN = "http://localhost:3000/login";   // Endpoint para inicio de sesión

  // Manejar el registro de usuarios
  postUser2(usuarios: any): Observable<any> {
    return this.http.post(this.API_USUARIOS, usuarios).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener todos los usuarios
  getUsuarios(): Observable<any> {
    return this.http.get(this.API_USUARIOS).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener un usuario específico por ID
  getUsuarioUnico(id: any): Observable<any> {
    return this.http.get(`${this.API_USUARIOS}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar un usuario por ID
  deleteUsuario(id: any): Observable<any> {
    return this.http.delete(`${this.API_USUARIOS}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Editar un usuario
  putUsuarios(usuarios: any): Observable<any> {
    return this.http.put(`${this.API_USUARIOS}/${usuarios.id}`, usuarios).pipe(
      catchError(this.handleError)
    );
  }

  // Login de usuarios
  login(usuario: any): Observable<any> {
    return this.http.post(this.API_LOGIN, usuario).pipe(
      map((response: any) => {
        // Guardar el token o hacer alguna transformación si es necesario
        if (response && response.accessToken) {
          localStorage.setItem('token', response.accessToken);
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Manejo de permisos (si fuera necesario)
  obtenerPermisos(): Observable<any[]> {
    return this.http.get<any[]>(this.API_USUARIOS).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: any) {
    console.error('Error en la API:', error);
    return throwError(() => new Error('Error en la comunicación con el servidor.'));
  }
}
