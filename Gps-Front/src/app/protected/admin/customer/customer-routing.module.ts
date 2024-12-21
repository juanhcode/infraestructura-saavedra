import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './pages/customers/customers.component';
import { CreateComponent } from './pages/create/create.component';
import { DeleteComponent } from './pages/delete/delete.component';

const routes: Routes = [

  {
    path: '',
    component: CustomersComponent,
    data:{titulo:'Listado de Clientes',icon:'article'},
    children: [
      {
        path: 'ver/:id',
        component: CreateComponent,
        data: { titulo:'Listado de s',icon:'article' }
      },
      {
        path: 'crear',
        component: CreateComponent,
        data: { titulo:'Listado de Clientes',icon:'article' }
      },
      {
        path: 'editar/:id',
        component: CreateComponent,
        data: { titulo:'Listado de Clientes',icon:'article' }
      },
      {
        path: 'eliminar/:id',
        component: DeleteComponent,
        data: { titulo:'Listado de Clientes',icon:'article' }
      },
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
