import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner'; //Escanear Codigos QR
import { ApiService } from '../service/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  state: any;

  user: any;

  local_user: any;

  qr = 'https://www.youtube.com'

  constructor(private activeroute: ActivatedRoute, private router: Router, private api: ApiService, private alertController: AlertController) {

  }

  ngOnInit() {


    this.activeroute.queryParams.subscribe(params => {
      this.state = this.router.getCurrentNavigation()?.extras.state;
      this.user = this.state.user
      console.log(this.user);
    })



  }

  //PRUEBAS DE ESCANER

  async scanBarcode() {
    const status = await BarcodeScanner.checkPermission({ force: true });

    if (status.granted) {
      BarcodeScanner.hideBackground();
      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {

        //Muestra una alerta con el contenido
        const alert = await this.alertController.create({
          header: 'Exito!',
          message: result.content,
          buttons: ['OK'],
        });
        await alert.present();

        console.log('Código de barras escaneado:', result.content);
      }
    } else {
      console.error('Permiso de cámara no concedido');
    }
  }

  // FIN DE PRUEBAS


  salir() {
    localStorage.removeItem('ingresado');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }


}
