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

  recuerdame = false

  user = {
    username: "",
    password: ""
  }

  usuarios: any

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit() {

    //Se carga el contenido de la api a la variable

    this.api.get().subscribe(res => {
      this.usuarios = res
      console.log(this.usuarios)

    })


  }


  IrAlHome() {

    //todo| Validamos el inicio de sesion con datos de la API

    for (let i = 0; i < this.usuarios.length; i++) { //Recorre la lista de usuarios
      const item = this.usuarios[i]

      if (this.user.username == item.nombre_usuario) { //Vlida el ingeso de usuario

        if (this.recuerdame) {

          localStorage.setItem('username', this.user.username)

        }

        let navegationExtras: NavigationExtras = {
          state: {
            user: this.user
          }
        }

        this.router.navigate(['/home'], navegationExtras)
      } else {
        console.log('NO PAPITO')
      }
    }
  }





}

