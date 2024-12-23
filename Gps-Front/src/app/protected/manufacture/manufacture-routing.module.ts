import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManufacturesComponent } from './pages/manufactures/manufactures.component';
import { CreateComponent } from './pages/create/create.component';
import { ValidarPageEmployeeGuard } from '../../../guards/validate-pageEmployee.guard';
import { DeleteComponent } from './pages/delete/delete.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      component:ManufacturesComponent,
      data: { titulo:'Listado de manufacturas',icon:'article' },
      children: [
        {
          path:'eliminar/:id',
          component:DeleteComponent,
          data: { titulo:'Listado de Productos',icon:'article' },
          canActivate:[ValidarPageEmployeeGuard]
        }
      ]
    },
    {
      path: 'crear',
      component: CreateComponent,
      data: { titulo:'Crear Manufactura',icon:'add' },
      canActivate:[ValidarPageEmployeeGuard]
    },
    {
      path: 'editar/:id',
      component: CreateComponent,
      data: { titulo:'Editar Manufactura',icon:'mode_edit' },
      canActivate:[ValidarPageEmployeeGuard]
    },
    {
      path: 'ver/:id',
      component: CreateComponent,
      data: { titulo:'Ver Manufactura',icon:'visibility' }
    },
    {
      path:'**',
      redirectTo:''
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufactureRoutingModule { }
