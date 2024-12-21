import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../cart/pages/main/main.component';
import { ProfileMainComponent } from '../../profile/pages/profile-main/profile-main.component';

const routes: Routes = [
  {
    path: '',
    component:MainComponent,
    children:[
      { path: 'profile',
       component:ProfileMainComponent,
       data: { titulo:'perfil',icon:'account_circle' }}
    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
