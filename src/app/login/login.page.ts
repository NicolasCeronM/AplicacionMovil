import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';
import { AlertController } from '@ionic/angular';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

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
    username: '',
    password: '',
  };

  isSupported = false;
  barcodes: Barcode[] = [];

  usuarios: any;

  constructor(
    private router: Router,
    private api: ApiService,
    private alertController: AlertController,
    private activeroute: ActivatedRoute
  ) { }

  ngOnInit() {
    // Se guarda la API en la variable
    this.api.get().subscribe((res) => {
      this.usuarios = res;
      // console.log(this.usuarios); // Muestra los datos de la API en la consola
    });


    // Función para recibir lo que se manda de Olvide
    this.activeroute.queryParams.subscribe((params) => {
      this.state = this.router.getCurrentNavigation()?.extras.state;
      // console.log(this.state); Muestra lo que se manda de Olvide
      if (this.state) {
        this.user.username = this.state.username;
        this.user.password = this.state.password;
      }
    });


    //PRUEBAS DE ESCANER







    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }


  // FIN DE PRUEBAS


  async IrAlHome() {
    // Validamos el inicio de sesión con datos de la API
    let usuarioEncontrado = false;

    for (const item of this.usuarios) {
      if (this.user.username === item.nombre_usuario && this.user.password === item.contrasena) {
        usuarioEncontrado = true;


        const navegationExtras: NavigationExtras = {
          state: {
            user: this.user,
          },
        };
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('ingresado', 'true');
        this.router.navigate(['/home'], navegationExtras);
      }
    }

    if (!usuarioEncontrado) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Usuario o contraseña Incorrecto',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
