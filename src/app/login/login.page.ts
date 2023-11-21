import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';
import { AlertController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  hide = true;
  state: any;
  recuerdame = false;

  user = {
    nombre_usuario: '',
    contrasena: '',
  };

  nuevaAsistencia = {
    // Puedes agregar aquí los datos necesarios para la nueva asistencia
    // Por ejemplo:
    profesorId: 1,
    alumnoId: 2,
    fecha: '2023-11-20',
    // ... otros datos ...
  };



  usuarios: any;

  constructor(
    private router: Router,
    private api: ApiService,
    private alertController: AlertController,
    private activeroute: ActivatedRoute
  ) { }

  ngOnInit() {

    // Función para recibir lo que se manda de Olvide
    this.activeroute.queryParams.subscribe((params) => {
      this.state = this.router.getCurrentNavigation()?.extras.state;
      // console.log(this.state); Muestra lo que se manda de Olvide
      if (this.state) {
        this.user.nombre_usuario = this.state.username;
        this.user.contrasena = this.state.password;
      }
    });
  }

  async IrAlHome() {

    this.api.verificarUsuario(this.user).subscribe((res) => {

      const navegationExtras: NavigationExtras = {
        state: {
          user: this.user,
        },
      };
      localStorage.setItem('user', JSON.stringify(this.user));
      localStorage.setItem('ingresado', 'true');
      this.router.navigate(['/home'], navegationExtras);

    },
      async (error) => {

        console.log(error)

        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Usuario o contraseña Incorrecto',
          buttons: ['OK'],
        });
        await alert.present();
      })

  }
}
