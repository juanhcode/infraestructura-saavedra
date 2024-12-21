import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './pages/orders/orders.component';
import { CreateComponent } from './pages/create/create.component';

const routes: Routes = [
  {
    path: '',
    component:OrdersComponent,
    data: { titulo:'Listado de Pedidos',icon:'pending_actions' }
  },{
    path: 'editar/:id',
    component:CreateComponent,
    data:{ titulo:'Confirmar pedido',icon:'mode_edit'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
