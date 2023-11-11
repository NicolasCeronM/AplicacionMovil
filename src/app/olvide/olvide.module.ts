import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OlvidePageRoutingModule } from './olvide-routing.module';
import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


import { OlvidePage } from './olvide.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OlvidePageRoutingModule, 
    MatFormFieldModule, 
    MatInputModule, 
    NgIf, 
    MatButtonModule, 
    MatIconModule
  ],
  declarations: [OlvidePage]
})
export class OlvidePageModule {}
