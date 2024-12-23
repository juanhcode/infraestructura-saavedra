import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { DeleteComponent } from './pages/delete/delete.component';
import { CreateComponent } from './pages/create/create.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      component:ExpensesComponent,
      data: { titulo:'Listado de Gastos',icon:'article' },
      children: [
        {
          path:'eliminar/:id',
          component: DeleteComponent,
          data: { titulo:'Listado de Gastos',icon:'article' },
        }
      ]
    },{
      path: 'crear',
      component:CreateComponent,
      data: { titulo:'Crear Gasto',icon:'add' },
    },{
      path: 'editar/:id',
      component:CreateComponent,
      data: { titulo:'Editar Gasto',icon:'mode_edit' },
    },{
      path: 'ver/:id',
      component:CreateComponent,
      data: { titulo:'Ver Gasto',icon:'visibility' }
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }
