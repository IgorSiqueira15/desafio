import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from './usuario';

const url = environment.url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(public http: HttpClient) {}

  findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${url}usuario`);
  }

  findOne(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${url}usuario/${id}`);
  }

  save(usuario: Usuario): Observable<Usuario> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    if (usuario.id) {
      return this.http.put<Usuario>(
        `${url}usuario`,
        JSON.stringify(usuario),
        httpOptions
      );
    } else {
      return this.http.post<Usuario>(
        `${url}usuario`,
        JSON.stringify(usuario),
        httpOptions
      );
    }
  }

  deteleById(id: number): Observable<any> {
    return this.http.delete(`${url}usuario/${id}`);
  }
}
