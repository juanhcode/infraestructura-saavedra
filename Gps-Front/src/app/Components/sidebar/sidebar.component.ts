import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;
  showComponents:boolean = false;
  showComponentsNav:boolean = true;
   user!:User;
  constructor( private router: Router,private service:AuthService) {
    this.user= this.service.user;
   }



  items = [
    {
      number: '1',
      name: 'cliente',
      acessRole:'administrador',
      icon: 'fa-sharp fa-solid fa-users'
    },
    {
      number: '2',
      name: 'venta',
      acessRole:'administrador',
      icon: 'fa-solid fa-cart-arrow-down'
    },
    {
      number: '3',
      name: 'producto',
      acessRole:'administrador',
      icon: 'fa-sharp fa-solid fa-mug-saucer'
    },
    {
      number:'4',
      name:'proveedor',
      acessRole:'administrador',
      icon:'fa-solid fa-handshake'
    },
    {
      number:'5',
      name:'gasto',
      acessRole:'administrador',
      icon:'fa-solid fa-sack-dollar'
    },
    {
      number: '6',
      name: 'manufactura',
      acessRole: 'empleado',
      icon: 'fa-solid fa-person-digging'
    },
     {
      number: '7',
      name: 'empleado',
      acessRole:'administrador',
      icon: 'fa-solid fa-users-gear'
    },
    {
      number: '8',
      name: 'estadistica',
      acessRole:'administrador',
      icon: 'fa-sharp fa-solid fa-chart-simple'
    }
  ]
  sideNavToggle(){
    this.showComponents = true;
    this.showComponentsNav = false;
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }

  sendUrl(url:string){
    if(screen.width <= 768){
      this.menuStatus = !this.menuStatus;

      this.sideNavToggled.emit(this.menuStatus);
    }
    this.router.navigateByUrl(`${this.service.user.rol}/${url}`);
  }



}
