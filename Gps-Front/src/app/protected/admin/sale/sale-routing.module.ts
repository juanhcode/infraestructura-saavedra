import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { SalesComponent } from './pages/sales/sales.component';
import { CreateComponent } from './pages/create/create.component';
import { DeleteComponent } from './pages/delete/delete.component';

const routes: Routes = [
  {
    path:'',
    children: [
      {
        path:'',
        component: MainComponent,
        data: { titulo:null , showCard:false,icon:null},
      },
      {
        path: 'crear',
        component: CreateComponent,
        data: { titulo:'Crear Venta',icon:'add' },
      },
      {
        path: 'editar/:id',
        component: CreateComponent,
        data: { titulo:'Editar Venta',icon:'mode_edit' },
      },
      {
        path: 'ver/:id',
        component: CreateComponent,
        data: { titulo:'Ver Venta',icon:'visibility' },
      },
      {
        path:':venta',
        component: SalesComponent,
        data: { titulo:'Listado de Ventas',icon:'article' },
        children: [
          {
            path: 'eliminar/:id',
            component: DeleteComponent,
            data: { titulo:'Listado de Ventas',icon:'article' },
          }
        ]
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
