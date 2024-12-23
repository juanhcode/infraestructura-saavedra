import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageAdminComponent } from './main-page-admin/main-page-admin.component';
import { ValidarPageAdminGuard } from '../../../guards/validate-pageAdmin.guard';
import { InicioComponent } from '../profile/pages/inicio/inicio.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageAdminComponent,
    children: [
      {
        path: 'usuario',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule),
        canActivate: [ValidarPageAdminGuard]
      },
      {
        path: 'cliente',
        loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
        canActivate: [ValidarPageAdminGuard]
      },
      {
        path: 'empleado',
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
        canActivate: [ValidarPageAdminGuard]
      },
      {
        path: 'producto',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
        canActivate: [ValidarPageAdminGuard],

      },
      {
        path: 'proveedor',
        loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierModule),
        canActivate: [ValidarPageAdminGuard]
      },
      {
        path:'venta',
        loadChildren:()=> import('./sale/sale.module').then(m=>m.SaleModule),
        canActivate: [ValidarPageAdminGuard]
      },
      {
        path:'gasto',
        loadChildren:()=>import('./expense/expense.module').then(m=>m.ExpenseModule),
        canActivate: [ValidarPageAdminGuard]
      },
      {
        path:'pedidos',
        loadChildren:()=>import('../order/order.module').then(m=>m.OrderModule),
        canActivate: [ValidarPageAdminGuard]
      },
      {
        path:'manufactura',
        loadChildren:()=>import('../manufacture/manufacture.module').then(m=>m.ManufactureModule),
        canActivate: [ValidarPageAdminGuard]
      },
      {
        path:'estadistica',
        loadChildren:()=>import('./statistic/statistic.module').then(m=>m.StatisticModule),
        canActivate:[ValidarPageAdminGuard]
      },
      {
        path: 'inicio',
        component:InicioComponent,
        data: { titulo:'Inicio',icon:'home' },
      },
      {
        path:'**',
        redirectTo:'inicio'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
