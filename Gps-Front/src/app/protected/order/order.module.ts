import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { CreateComponent } from './pages/create/create.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ComponentsModule } from '../../Components/components.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class OrderModule { }
