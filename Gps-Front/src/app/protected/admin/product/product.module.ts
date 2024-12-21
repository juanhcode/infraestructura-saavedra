import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { CreateComponent } from './pages/create/create.component';
import { DeleteComponent } from './pages/delete/delete.component';
import { ComponentsModule } from 'src/app/Components/components.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    ProductsComponent,
    CreateComponent,
    DeleteComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ComponentsModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ]
})
export class ProductModule { }
