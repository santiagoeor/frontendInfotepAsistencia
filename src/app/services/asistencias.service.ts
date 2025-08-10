import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsistenciasService {

  private http = inject(HttpClient);

  getDynamicQrToken(identification: number) {
    return this.http.get<{ token: string, signature: string }>(`http://192.168.18.5:8000/api/v1/getQrToken?cedulaStudent=${identification}`);
  }

}
