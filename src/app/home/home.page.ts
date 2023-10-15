import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  state:any;

  user :any;

  local_user: any;

  constructor(private activeroute: ActivatedRoute, private router: Router) { //Funcion para recibir lo que se manda 
    
  }

  ngOnInit() {

    if(localStorage.getItem('user')){
      this.local_user = localStorage.getItem('user');
       this.user=  JSON.parse(this.local_user)

    }else{
      this.activeroute.queryParams.subscribe(params => {
        this.state = this.router.getCurrentNavigation()?.extras.state;
        this.user=this.state.user
        // console.log(this.user); Muestra lo que se mando del login
      })

    }

  }

  salir(){
    localStorage.removeItem('ingresado');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  

}
