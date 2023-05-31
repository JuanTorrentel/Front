import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  private url: string = `${environment.apiUrl}/uploader`;
  constructor(private http: HttpClient) { }

  guardarArchivo(archivo: File): Observable<any> {

    let formData: FormData = new FormData();
    formData.append('file', archivo);
    return this.http.post<any>(`${this.url}`, formData);
  }

}
 interface rta {
  respuesta: string
}
