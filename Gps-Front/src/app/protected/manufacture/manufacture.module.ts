import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufactureRoutingModule } from './manufacture-routing.module';
import { CreateComponent } from './pages/create/create.component';
import { ManufacturesComponent } from './pages/manufactures/manufactures.component';
import { DeleteComponent } from './pages/delete/delete.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ComponentsModule } from 'src/app/Components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    CreateComponent,
    ManufacturesComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    ManufactureRoutingModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ]
})
export class ManufactureModule { }
