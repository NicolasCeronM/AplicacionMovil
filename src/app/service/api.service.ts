import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  apiUrl = 'https://jbbrf9d9-8000.brs.devtunnels.ms/api/usuarios/';

  asitencia_url='https://jbbrf9d9-8000.brs.devtunnels.ms/api/asitencia/'

  constructor(private http: HttpClient) { }


  get():Observable<any>{
    return this.http.get(this.apiUrl).pipe(retry(3))
  }

  asitencia(body: any):Observable<any>{
    return this.http.post(this.asitencia_url, body).pipe(retry(3))
  }

  getAsitencia():Observable<any>{
    return this.http.get(this.asitencia_url).pipe(retry(3))
  }
}
