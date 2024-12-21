import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from 'src/guards/validate-jwt.guard';

const routes: Routes = [
  {
    path:'auth',
    loadChildren:()=> import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:'administrador',
    loadChildren:()=>import('./protected/admin/admin.module').then(m=>m.AdminModule),
    canActivate: [ValidarTokenGuard],
    canLoad:[ValidarTokenGuard]
  },
  {
    path:'empleado',
    loadChildren:()=>import('./protected/employee/employee.module').then(m=>m.EmployeeModule),
    canActivate: [ValidarTokenGuard],
    canLoad:[ValidarTokenGuard]
  },
  {
    path:'cliente',
    loadChildren:()=>import('./protected/customer/customer.module').then(m=>m.CustomerModule),
    canActivate: [ValidarTokenGuard],
    canLoad:[ValidarTokenGuard]
  },
  {
    path:'',
    loadChildren:()=>import('./shop/shop.module').then(m=>m.ShopModule)
  },
  {
    path:'**',
    redirectTo:'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
