import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { CreateComponent } from './pages/create/create.component';

import { DeleteComponent } from './pages/delete/delete.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProductsComponent,
        data: { titulo:'Listado de Productos',icon:'article' },
        children: [
          {
            path: 'eliminar/:id',
            component: DeleteComponent,
            data: { titulo:'Listado de Productos',icon:'article' }
          }
        ]
      },

      {
        path: 'crear',
        component: CreateComponent,
        data: { titulo:'Crear Producto',icon:'add' }
      },
      {
        path: 'editar/:id',
        component: CreateComponent,
        data: { titulo:'Editar Producto',icon:'mode_edit' }
      },
      {
        path: 'ver/:id',
        component: CreateComponent,
        data: { titulo:'Ver Producto',icon:'visibility' }
      },
      {
        path:'**',
        redirectTo:''
      }
    ]
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
