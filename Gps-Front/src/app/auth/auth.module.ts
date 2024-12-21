import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../Components/components.module';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { RegisterComponent } from './pages/register/register.component';
import { MaterialModule } from '../material/material.module';
import { AuthModule as Auth0Module } from  "@auth0/auth0-angular"
;

@NgModule({
  declarations: [
    LoginComponent,
    MainComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    MaterialModule,
    Auth0Module
  ]
})
export class AuthModule { }
