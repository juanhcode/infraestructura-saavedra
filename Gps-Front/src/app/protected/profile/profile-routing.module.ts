import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileMainComponent } from './pages/profile-main/profile-main.component';

const routes: Routes = [
  {path: '',
    children:[
      {
        path: 'profile',
        component:ProfileMainComponent,
        data: { titulo:'perfil',icon:'account_circle' },

      },{
        path:'**',
        redirectTo:'profile'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
