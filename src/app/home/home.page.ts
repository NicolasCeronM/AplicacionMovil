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

  user: any;
  profesor_data:any;
  asistencia:any;

  local_user: any;

  qrData: any;

  constructor(private activeroute: ActivatedRoute, private router: Router, private api: ApiService, private alertController: AlertController, private emailComposer: EmailComposer,) {
    this.fecha = new Date();

  }

  ngOnInit() {

    this.activeroute.queryParams.subscribe(params => {
      this.state = this.router.getCurrentNavigation()?.extras.state;
      this.user = this.state.user
      //console.log(this.user);
    })

    this.api.getAsitencia().subscribe((res) => {
      console.log(res)
      this.asistencia=res;
    })

  }

  //BARCODE SCANER - Alumno

  async checkPermission() {
    // check or request permission
    const status = await BarcodeScanner.checkPermission({ force: true });

    if (status.granted) {
      // the user granted permission
      return true;
    }

    return false;
  };

  //TODO| SCANER
  async startScan() {

    const permisos = this.checkPermission();

    if (!permisos) {
      return;
    }
    await BarcodeScanner.hideBackground();
    document.getElementById('main-content')?.classList.add('scanner-active')
    document.getElementById('main-content')?.classList.add('ocultar')
    const result = await BarcodeScanner.startScan();
    //console.log(result);
    if (result.hasContent) {
      this.profesor_data = JSON.parse(result.content)
      console.log(this.profesor_data)
      BarcodeScanner.showBackground();
      document.getElementById('main-content')?.classList.remove('scanner-active')
      document.getElementById('main-content')?.classList.remove('ocultar')

      //Se guarda en la base de datos

      let nuevaAsistencia = {

        "fecha": Date,
        "hora": this.fecha,
        "alumno": this.user.id,
        "profesor": this.profesor_data.id

      };

      this.api.asitencia(nuevaAsistencia).subscribe((res) => {
        console.log(res)
      },
        (error) => {
          console.error('Status:', error.status);
          console.error('Error:', error.error);
          console.error('Error:', error);
        });

      //Enviar correo al profesor

      let email = {
        app: 'gmail',
        to: result.content,
        subject: 'Confirmación de Asistencia a Clase',
        body: `<p>Estimado profesor ${result.content}</p>

        <p>Espero que este mensaje le encuentre bien. La razón de la presente es confirmar mi participación en la clase de hoy, ${this.fecha}.</p>
        
        <p>Saludos cordiales</p>
        
        ${this.user.nombre} ${this.user.apellido}<br>
        ${this.user.correo}`,
        isHtml: true
      };

      // Abre el correo
      this.emailComposer.open(email);

    }
  };

  cargarAsistencia(){
    this.api.getAsitencia().subscribe((res) => {
      console.log(res)
      this.asistencia=res;
    })
    
  }

  //TODO| Genera Codigo QR - Profesor
  generarCodigoQR() {

    this.qrData = JSON.stringify(this.user);
  }


//TODO| SALE DE LA APLICACION
  salir() {
    localStorage.removeItem('ingresado');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
