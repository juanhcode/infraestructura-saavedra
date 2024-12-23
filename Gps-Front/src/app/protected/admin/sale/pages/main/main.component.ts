import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls:['../../../css/style.css']
})
export class MainComponent {

  constructor(private router:Router){

  }

  redirectKindOfSale(kindSale:string){
    this.router.navigateByUrl(`administrador/venta/${kindSale}`);
  }
}
