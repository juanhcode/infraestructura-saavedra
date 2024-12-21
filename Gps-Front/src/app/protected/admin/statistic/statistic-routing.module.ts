import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { BarChartComponent } from './pages/bar-chart/bar-chart.component';
import { LineChartComponent } from './pages/line-chart/line-chart.component';

const routes: Routes = [
  {
    path: '',
    component:StatisticsComponent,
    data: { titulo:null , showCard:false,icon:null},
  },
  {
    path: 'ganancias-perdidas',
    component:BarChartComponent,
    data:{titulo:'Grafica de barras de ganancias y perdidas',icon:'equalizer'}
  },
  {
    path:'total-ventas',
    component:LineChartComponent,
    data:{titulo:'Graficos de lineas de total de ventas',icon:'timeline'}
  },
  {
    path: 'productos-vendidos',
    component:LineChartComponent,
    data:{titulo:'Grafica de lineas de productos más vendidos',icon:'timeline'}
  },
  {
    path:'**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticRoutingModule { }
