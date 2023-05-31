import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrarService {

  private URL: string = `${environment.host}/api/usuario`;
  constructor(private http: HttpClient) { }

  crear(usuario: Usuario): Observable<void> {
    return this.http.post<void>(`${this.URL}/insert`, usuario);
  }
}
