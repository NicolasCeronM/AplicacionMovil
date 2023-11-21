import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner'; //Escanear Codigos QR
import { ApiService } from '../service/api.service';
import { AlertController } from '@ionic/angular';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  fecha!: Date;

  state: any;

  profesor_data: any;

  usuario: any;

  nombre_usuario = {
    'nombre_usuario': ""
  }

  asistencia: any;

  qrData: any;

  constructor(private activeroute: ActivatedRoute, private router: Router, private api: ApiService, private alertController: AlertController, private emailComposer: EmailComposer,) {
    this.fecha = new Date();

  }

  ngOnInit() {

    this.activeroute.queryParams.subscribe(params => {
      this.state = this.router.getCurrentNavigation()?.extras.state;
      this.nombre_usuario.nombre_usuario = this.state.user.nombre_usuario
    })

    //CARGA USUARIO
    this.api.obtenerUsuario(this.nombre_usuario).subscribe((res) => {
      this.usuario = res.usuario
      console.log(this.usuario)
    })

  }


  //BARCODE SCANER - Alumno

  // En el método checkPermission
  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      try {
        const status = await BarcodeScanner.checkPermission({ force: true });

        if (status.granted) {
          resolve(true);
        } else if (status.denied) {
          const alert = await this.alertController.create({
            header: 'Sin Permisos',
            message: 'Por favor otorgue permisos de cámara en los ajustes de la aplicación',
            buttons: [
              {
                text: 'No',
                role: 'cancel',
                handler: () => {
                  reject('Permisos denegados');
                },
              },
              {
                text: 'Abrir ajustes',
                handler: () => {
                  BarcodeScanner.openAppSettings();
                  reject('Permisos denegados');
                },
              },
            ],
          });

          await alert.present();
        }
      } catch (error) {
        console.error('Error al verificar permisos:', error);
        reject(error);
      }
    });
  }

  // En el método startScan
  async startScan() {
    try {
      await this.checkPermission();

      await BarcodeScanner.hideBackground();
      document.getElementById('main-content')?.classList.add('scanner-active');
      document.getElementById('main-content')?.classList.add('ocultar');

      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        this.profesor_data = JSON.parse(result.content);
        console.log(this.profesor_data);
        BarcodeScanner.showBackground();
        document.getElementById('main-content')?.classList.remove('scanner-active');
        document.getElementById('main-content')?.classList.remove('ocultar');

        // Se guarda en la base de datos
        this.api.asistencia({ "alumno": this.usuario.id, "profesor": this.profesor_data.id }).subscribe(
          (res) => {
            console.log('ASISTENCIA REGISTRADA');
          },
          (error) => {
            console.log(error);
          }
        );

        // Enviar correo al profesor
        let email = {
          app: 'gmail',
          to: this.profesor_data.correo,
          subject: 'Confirmación de Asistencia a Clase',
          body: `<p>Estimado profesor ${this.profesor_data.nombre}</p>

          <p>Espero que este mensaje le encuentre bien. La razón de la presente es confirmar mi participación en la clase de hoy, ${this.fecha}.</p>

          <p>Saludos cordiales</p>

          ${this.usuario.nombre} ${this.usuario.apellido}<br>
          ${this.usuario.correo}`,
          isHtml: true,
        };

        // Abre el correo
        this.emailComposer.open(email);
      } else {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Error al escanear código QR',
          buttons: ['OK'],
        });
        await alert.present();
      }
    } catch (error) {
      console.error('Error al iniciar el escaneo:', error);
    }
  }

  cargarAsistencia() {

    //Carga asistencia de Alumno

    this.api.obtenerAsistencia({ "id": this.usuario.id }).subscribe((res) => {
      console.log(res)
      this.asistencia = res
      console.log('SI SE PUEDO obtener la sistencia')
    },
      (error) => {
        console.log(error)
        console.log('No se puedo obtener la asistencia de ' + this.usuario.id)
      })

  }

  //TODO| Genera Codigo QR - Profesor
  generarCodigoQR() {

    this.qrData = JSON.stringify(this.usuario);
  }


  //TODO| SALE DE LA APLICACION
  salir() {
    localStorage.removeItem('ingresado');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    location.reload()
  }

}
