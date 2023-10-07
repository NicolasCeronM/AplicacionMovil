import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'http://localhost:8000/api/usuarios/';

  constructor(private http: HttpClient) { }


  get():Observable<any>{
    return this.http.get(this.apiUrl).pipe(retry(3))
  }
}
