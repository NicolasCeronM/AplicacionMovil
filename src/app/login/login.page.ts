import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  hide = true;

  user = {
    username: "",
    password: ""
  }

  constructor(private router: Router, private api: ApiService) { }


  IrAlHome() {
    let navegationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    }
    this.router.navigate(['/home'], navegationExtras)
  }

  cargarApi(){

    this.api.get().subscribe((contenido) =>{
      console.log(contenido)
    },
    (error) =>{
      console.log(error)
    })

  }


}
