import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ComponentsModule } from 'src/app/Components/components.module';
import { MaterialModule } from '../../material/material.module';
import { MainPageAdminComponent } from './main-page-admin/main-page-admin.component';


@NgModule({
  declarations: [MainPageAdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ComponentsModule,
    MaterialModule,

  ],

})
export class AdminModule { }
