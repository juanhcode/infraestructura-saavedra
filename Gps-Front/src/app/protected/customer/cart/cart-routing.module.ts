import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { DetailComponent } from './pages/detail/detail.component';
import { CreateComponent } from '../../order/pages/create/create.component';

const routes: Routes = [
  {
    path: '',
    component:MainComponent,
    children:[
      {
        path: 'detalle',
        data: {titulo:'Pedido',icon:'article' },
        component:DetailComponent
      },
      {
        path:'ver/:id',
        data: {titulo:'Ver Pedido',icon:'visibility' },
        component:CreateComponent
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
