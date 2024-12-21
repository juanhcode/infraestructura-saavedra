import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeesComponent } from './pages/employees/employees.component';
import { CreateComponent } from './pages/create/create.component';
import { DeleteComponent } from './pages/delete/delete.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ComponentsModule } from '../../../Components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminModule } from '../admin.module';


@NgModule({
  declarations: [
    EmployeesComponent,
    CreateComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AdminModule
  ]
})
export class EmployeeModule { }
