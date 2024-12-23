import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomersComponent } from './pages/customers/customers.component';
import { CreateComponent } from './pages/create/create.component';
import { ComponentsModule } from 'src/app/Components/components.module';
import { DeleteComponent } from './pages/delete/delete.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CustomersComponent,
    CreateComponent,
    DeleteComponent

  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ComponentsModule,
    MaterialModule,
    ReactiveFormsModule,

  ]
})
export class CustomerModule { }
