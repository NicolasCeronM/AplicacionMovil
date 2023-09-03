import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {ThemePalette} from '@angular/material/core';
import {NgFor} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    FormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatTooltipModule, 
    MatIconModule,
    MatCheckboxModule, 
    NgFor, 
    FormsModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
