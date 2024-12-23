import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { DeleteComponent } from './pages/delete/delete.component';
import { CreateComponent } from './pages/create/create.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ComponentsModule } from 'src/app/Components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    ExpensesComponent,
    DeleteComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  
})
export class ExpenseModule { }
