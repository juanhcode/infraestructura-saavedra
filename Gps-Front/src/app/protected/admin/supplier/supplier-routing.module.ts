import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupliersComponent } from './pages/supliers/supliers.component';
import { DeleteComponent } from './pages/delete/delete.component';
import { CreateComponent } from './pages/create/create.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SupliersComponent,
        data: { titulo:'Listado de Proovedores',icon:'article' },
        children: [
          {
            path: 'eliminar/:id',
            component: DeleteComponent,
            data: { titulo:'Listado de Proovedores',icon:'article' }
          }
        ]
      },
      {
        path: 'crear',
        component: CreateComponent,
        data: { titulo:'Crear Proovedor',icon:'add' }
      },
      {
        path: 'editar/:id',
        component: CreateComponent,
        data: { titulo:'Editar Proovedor',icon:'mode_edit' }
      },
      {
        path: 'ver/:id',
        component: CreateComponent,
        data: { titulo:'Ver Proovedor',icon:'visibility' }
      },

    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
