import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { ComponentsModule } from 'src/app/Components/components.module';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ComponentsModule,
    MaterialModule
  ]
})
export class EmployeeModule { }
