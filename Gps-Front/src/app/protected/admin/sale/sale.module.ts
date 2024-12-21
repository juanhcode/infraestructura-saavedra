import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleRoutingModule } from './sale-routing.module';
import { CreateComponent } from './pages/create/create.component';
import { DeleteComponent } from './pages/delete/delete.component';
import { SalesComponent } from './pages/sales/sales.component';
import { MainComponent } from './pages/main/main.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ComponentsModule } from 'src/app/Components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    CreateComponent,
    DeleteComponent,
    SalesComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    SaleRoutingModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ]
})
export class SaleModule { }
