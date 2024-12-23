import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageAdminComponent } from '../admin/main-page-admin/main-page-admin.component';
import { ValidarPageEmployeeGuard } from '../../../guards/validate-pageEmployee.guard';
import { InicioComponent } from '../profile/pages/inicio/inicio.component';

const routes: Routes = [{
  path: '',
    component: MainPageAdminComponent,
    children: [
      {
        path: 'usuario',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule),
        canActivate: [ValidarPageEmployeeGuard],
      },{
        path:'manufactura',
        loadChildren:()=>import('../manufacture/manufacture.module').then(m=>m.ManufactureModule),
        canActivate: [ValidarPageEmployeeGuard],
      },
      {
        path: 'inicio',
        component:InicioComponent,
        data: { titulo:'Inicio',icon:'home' },
      },{
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
export class EmployeeRoutingModule { }
