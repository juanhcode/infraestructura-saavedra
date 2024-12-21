import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../css/style.css']
})
export class HomeComponent {
  constructor(private authService: AuthService,private router:Router) {

  }
  get user() {
    return this.authService.user;
  }

  navigateUrl(url: string) {
    if(Object.keys(this.user).length !== 0){
      this.router.navigateByUrl(`${this.user.rol}/${url}`);
    }else{
      this.router.navigateByUrl(`${url}`);
    }
  }
}
