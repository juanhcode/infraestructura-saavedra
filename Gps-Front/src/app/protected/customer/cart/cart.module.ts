import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { DetailComponent } from './pages/detail/detail.component';
import { MainComponent } from './pages/main/main.component';
import { ComponentsModule } from 'src/app/Components/components.module';
import { MaterialModule } from '../../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DetailComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class CartModule { }
