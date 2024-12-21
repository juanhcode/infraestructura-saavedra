import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ComponentsModule } from 'src/app/Components/components.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ProfileModule as ProfileModulePrincipal  }  from '../../profile/profile.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ComponentsModule,
    MaterialModule,
    ProfileModulePrincipal
  ]
})
export class ProfileModule { }
