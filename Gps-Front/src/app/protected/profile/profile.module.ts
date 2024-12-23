import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProfileMainComponent } from './pages/profile-main/profile-main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/Components/components.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ShopModule } from 'src/app/shop/shop.module';


@NgModule({
  declarations: [
    InicioComponent,
    ProfileMainComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    MaterialModule,
    ShopModule
  ],
  exports:[
    ProfileMainComponent
  ]
})
export class ProfileModule { }
