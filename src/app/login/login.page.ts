import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras , ActivatedRoute} from '@angular/router';
import { ApiService } from '../service/api.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  hide = true;

  state: any;

  recuerdame = false

  user = {
    username: "",
    password: ""
  }

  usuarios: any

  constructor(private router: Router, private api: ApiService, private alertController: AlertController, private activeroute: ActivatedRoute) { }

  ngOnInit() {

    //Se carga el contenido de la api a la variable

    this.api.get().subscribe(res => {
      this.usuarios = res
      //console.log(this.usuarios) Muestra los datos de la API en la consola

    })

    //Funcion para recibir lo que se manda de Olvide
    this.activeroute.queryParams.subscribe(params => {
      this.state = this.router.getCurrentNavigation()?.extras.state;
      console.log(this.state)
      if(this.state){
        
      this.user.username = this.state.username
      this.user.password = this.state.password

      }
      
    })



  }


  async IrAlHome() {

    //todo| Validamos el inicio de sesion con datos de la API

    for (let i = 0; i < this.usuarios.length; i++) { //Recorre la lista de usuarios
      const item = this.usuarios[i]

      if (this.user.username == item.nombre_usuario) { //Vlida el ingeso de usuario

        if (this.recuerdame) {

          localStorage.setItem('username', this.user.username)

        }

        let navegationExtras: NavigationExtras = { //Se envia el user al home
          state: {
            user: this.user
          }
        }
        this.router.navigate(['/home'], navegationExtras)

        break;
      } else {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Usuario no encontrado',
          buttons: ['OK'],
        });
        await alert.present();

        break;
      }
    }
  }





}

