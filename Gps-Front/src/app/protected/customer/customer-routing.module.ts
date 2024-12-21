import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarPageCustomerGuard } from '../../../guards/validate-pageCustomer.guard';

const routes: Routes = [
  {
    path:'usuario',
    loadChildren:() => import('./profile/profile.module').then(m=>m.ProfileModule),
    canActivate: [ValidarPageCustomerGuard]
  },
  {
    path:'pedidos',
    loadChildren:()=>import('./cart/cart.module').then(m=>m.CartModule),
    canActivate: [ValidarPageCustomerGuard]
  },
  {
    path: '',
    loadChildren: () => import('../../shop/shop.module').then(m => m.ShopModule),
    canActivate: [ValidarPageCustomerGuard]
  },
  {
    path:'**',
    redirectTo:'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
