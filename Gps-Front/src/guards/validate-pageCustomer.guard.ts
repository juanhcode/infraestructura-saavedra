import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarPageCustomerGuard implements CanActivate {

  constructor(private authService:AuthService, private router:Router){

  }
  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> {
      const rolUser = this.authService.user.rol;
    if(rolUser==='cliente' || rolUser=='usuario'){
      return true;
    }
    return this.router.navigateByUrl('auth');
  }

}
