import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-olvide',
  templateUrl: './olvide.page.html',
  styleUrls: ['./olvide.page.scss'],
})
export class OlvidePage {

   user = {
    username: "",
    password: ""
  }
  
  
  constructor(private router: Router) {}

  IrAlHome(){
    let navegationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    }
      this.router.navigate(['/login'], navegationExtras)
    }
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
}
