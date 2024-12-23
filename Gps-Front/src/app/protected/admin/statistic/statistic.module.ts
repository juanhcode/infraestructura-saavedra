import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticRoutingModule } from './statistic-routing.module';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { ComponentsModule } from '../../../Components/components.module';
import { MaterialModule } from 'src/app/material/material.module';
import { NgChartsModule } from 'ng2-charts';
import { LineChartComponent } from './pages/line-chart/line-chart.component';
import { BarChartComponent } from './pages/bar-chart/bar-chart.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StatisticsComponent,
    LineChartComponent,
    BarChartComponent
  ],
  imports: [
    CommonModule,
    StatisticRoutingModule,
    ComponentsModule,
    MaterialModule,
    NgChartsModule,
    ReactiveFormsModule,
  ]
})
export class StatisticModule { }
