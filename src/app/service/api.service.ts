import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  //Endpint de usuario
  verUsu='https://jbbrf9d9-8000.brs.devtunnels.ms/api/verificar-usuario/'
  obtenerusuario ='https://jbbrf9d9-8000.brs.devtunnels.ms/api/obtener-usuario/'

  //Endpoint de asistencia
  obtener_asistencia = 'https://jbbrf9d9-8000.brs.devtunnels.ms/api/obtener-asistencias/'
  asitenciaUrl='https://jbbrf9d9-8000.brs.devtunnels.ms/api/asistencia/'

  constructor(private http: HttpClient) { }


  verificarUsuario(body: any):Observable<any>{
    return this.http.post(this.verUsu,body).pipe(retry(3))
  }

  obtenerUsuario(body:any):Observable<any>{
    return this.http.post(this.obtenerusuario,body).pipe(retry(3))
  }

  obtenerAsistencia(body:any):Observable<any>{
    return this.http.post(this.obtener_asistencia,body).pipe(retry(3))
  }

  //Se puede con metodo POST y GET
  asistencia(body:any):Observable<any>{
    return this.http.post(this.asitenciaUrl,body).pipe(retry(3))
  }

}
