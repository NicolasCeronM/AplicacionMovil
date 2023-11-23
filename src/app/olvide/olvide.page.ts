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

  usuario: any;


  constructor(private router: Router, private api: ApiService, private alertController: AlertController) { }

  ngOnInit() {
   
  }

  async recuperar() {

    //CARGA USUARIO
    this.api.obtenerUsuario({"nombre_usuario":this.username}).subscribe((res) => {

      this.usuario = res.usuario
      console.log(this.usuario)

      let navegationExtras: NavigationExtras = {
        state: {
          username : this.usuario.nombre_usuario,
        }
      }
      this.router.navigate(['/login'], navegationExtras)
    },
    async (error)=> {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Usuario no encontrado',
        buttons: ['OK'],
      });
      await alert.present();
    })
    

  }


}
