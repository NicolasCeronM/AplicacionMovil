import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

import { QRCodeModule } from 'angularx-qrcode';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx'




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,MatButtonModule, MatTooltipModule, MatIconModule,QRCodeModule
  ],
  declarations: [HomePage],
  providers: [
    // Agrega EmailComposer al array de proveedores
    EmailComposer,
    // ...
  ],
})
export class HomePageModule {}
