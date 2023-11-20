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

   
  }

  async recuperar() {
    
    // Validamos el inicio de sesión con datos de la API
    let usuarioEncontrado = false;

    for (const item of this.usuarios) {

      if (this.username === item.nombre_usuario) {
        usuarioEncontrado = true;

        let navegationExtras: NavigationExtras = {
          state: {
            username : this.username,
            password : item.contrasena
          }
        }
        this.router.navigate(['/login'], navegationExtras)
      }
    }

    if (!usuarioEncontrado) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Usuario no encontrado',
        buttons: ['OK'],
      });
      await alert.present();
    }

  }

}
