import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls:['../../../css/style.css']
})
export class StatisticsComponent {

  constructor(private router:Router){

  }

  navigateUrl(url:string){
    this.router.navigateByUrl(`administrador/estadistica/${url}`);
  }
}
