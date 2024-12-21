import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children:[
      {
        path: 'inicio',
        component: HomeComponent
      },{
        path:'productos',
        component:ProductsComponent
      },
      {
        path:'producto/:name',
        component:ProductComponent
      },
      {
        path: '**',
        redirectTo:'inicio'

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
