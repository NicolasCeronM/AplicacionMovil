import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  URL = 'https://jbbrf9d9-8000.brs.devtunnels.ms/api/'

  constructor(private http: HttpClient) { }


  verificarUsuario(body: any):Observable<any>{
    return this.http.post(this.URL+'verificar-usuario/',body).pipe(retry(3))
  }

  obtenerUsuario(body:any):Observable<any>{
    return this.http.post(this.URL+'obtener-usuario/',body).pipe(retry(3))
  }

  obtenerAsistencia(body:any):Observable<any>{
    return this.http.post(this.URL+'obtener-asistencias/',body).pipe(retry(3))
  }

  //Se puede con metodo POST y GET
  asistencia(body:any):Observable<any>{
    return this.http.post(this.URL+'asistencia/',body).pipe(retry(3))
  }

  pruebasQr(body:any):Observable<any>{
    return this.http.post(this.URL+'obtener-asignatura/',body).pipe(retry(3))
  }

  dataQr(body:any):Observable<any>{
    return this.http.post(this.URL+'asignatura/',body).pipe(retry(3))
  }

}
