import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './pages/employees/employees.component';
import { CreateComponent } from './pages/create/create.component';
import { DeleteComponent } from './pages/delete/delete.component';

const routes: Routes = [

  {
    path:'',
    children: [
      {
        path:'',
        component:EmployeesComponent,
        data: { titulo:'Listado de Empleados',icon:'article' },
        children:[
          {
            path:'eliminar/:id',
            component:DeleteComponent,
            data: { titulo:'Listado de Empleados',icon:'article' },
          }
        ]
      },
      {
        path:'crear',
        component: CreateComponent,
        data: { titulo:'Crear Empleado',icon:'add' }
      },
      {
        path:'editar/:id',
        component:CreateComponent,
        data: { titulo:'Editar Empleado',icon:'mode_edit' }
      },
      {
        path:'ver/:id',
        component:CreateComponent,
        data: { titulo:'Ver Empleado',icon:'visibility' }
      }

  ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
