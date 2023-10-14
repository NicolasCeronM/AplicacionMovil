import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../service/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-olvide',
  templateUrl: './olvide.page.html',
  styleUrls: ['./olvide.page.scss'],
})
export class OlvidePage {
  value = 'Clear me';

  username = "";

  usuarios: any;


  constructor(private router: Router, private api: ApiService, private alertController: AlertController) { }

  ngOnInit() {
    //Se carga el contenido de la api a la variable

    this.api.get().subscribe(res => {
      this.usuarios = res
      console.log(this.usuarios)

    })
  }

  recuperar() {

    //todo| Validamos el inicio de sesion con datos de la API

    for (let i = 0; i < this.usuarios.length; i++) { //Recorre la lista de usuarios
      const item = this.usuarios[i]

      if (this.username == item.nombre_usuario) { //Vlida el ingeso de usuario

        let navegationExtras: NavigationExtras = {
          state: {
            username : this.username,
            password : item.contrasena
          }
        }
        this.router.navigate(['/login'], navegationExtras)

        break;
      } else {
        ;

        break;
      }
    }
  }




}
