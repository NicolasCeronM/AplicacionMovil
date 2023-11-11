import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner'; //Escanear Codigos QR
import { ApiService } from '../service/api.service';
import { AlertController } from '@ionic/angular';
import { EmailComposer, EmailComposerOptions } from '@awesome-cordova-plugins/email-composer/ngx'


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  state: any;

  user: any;

  local_user: any;

  qrData: any;

  content_visbility = 'hidden';

  content = document.getElementById('content')

  constructor(private activeroute: ActivatedRoute, private router: Router, private api: ApiService, private alertController: AlertController, private emailCompose: EmailComposer) {

  }

  ngOnInit() {

    this.activeroute.queryParams.subscribe(params => {
      this.state = this.router.getCurrentNavigation()?.extras.state;
      this.user = this.state.user
      console.log(this.user);
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


  async startScan() {

    const permisos = this.checkPermission();

    if (!permisos) {
      return;
    }
    await BarcodeScanner.hideBackground();
    document.getElementById('main-content')?.classList.add('scanner-active')
    document.getElementById('main-content')?.classList.add('ocultar')
    const result = await BarcodeScanner.startScan();
    console.log(result);
    if(result.hasContent){
      BarcodeScanner.showBackground();
      document.getElementById('main-content')?.classList.remove('scanner-active')
      document.getElementById('main-content')?.classList.remove('ocultar')

      const alert = await this.alertController.create({
        header: 'A Short Title Is Best',
        subHeader: 'A Sub Header Is Optional',
        message: result.content,
        buttons: ['Action'],
      });
  
      await alert.present();

    }
  };

  //Genera Codigo QR - Profesor

  generarCodigoQR() {

    this.qrData = this.user.correo;
  }



  salir() {
    localStorage.removeItem('ingresado');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }



}
