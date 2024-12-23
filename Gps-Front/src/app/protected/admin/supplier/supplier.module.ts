import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { DeleteComponent } from './pages/delete/delete.component';
import { CreateComponent } from './pages/create/create.component';
import { SupliersComponent } from './pages/supliers/supliers.component';
import { MaterialModule } from '../../../material/material.module';
import { ComponentsModule } from '../../../Components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    DeleteComponent,
    CreateComponent,
    SupliersComponent
  ],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ]
})
export class SupplierModule { }
