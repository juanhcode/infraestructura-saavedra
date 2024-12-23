import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { MainComponent } from './pages/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from '../material/material.module';
import { ComponentsModule } from 'src/app/Components/components.module';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductHistoryComponent } from './pages/product-history/product-history.component';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    ProductsComponent,
    ProductComponent,
    ProductHistoryComponent
  ],
  exports:[
    ProductHistoryComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    MaterialModule,
    ComponentsModule
  ]
})
export class ShopModule { }
