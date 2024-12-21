import {Component, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from "chart.js";
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { MainClass } from '../../../../../../classes/mainClass';
import Swal from 'sweetalert2';
import { StatiscticService } from '../../services/statisctic.service';
import { BaseChartDirective } from 'ng2-charts';
import { Location } from '@angular/common';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';

const moment = _rollupMoment || _moment;


export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls:['../../../css/style.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class BarChartComponent {

  showCanvas:boolean=true;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  labels:string[]=[];
  dataArrayLost:number[]=[];
  dataArrayProffit:number[]=[]
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },

    }
  };

  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];


  public barChartData: ChartData<'bar'> = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { backgroundColor: '#4DB6AC', data: this.dataArrayProffit, label: 'Ganancias' },
      { backgroundColor: '#E57373',data: this.dataArrayLost, label: 'Perdidas' },

    ]

  };


  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {

  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {

  }

  public randomize(): void {

    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40 ];

    this.chart?.update();
  }

  main:MainClass= new MainClass();
  minDate = new FormControl(moment());
  maxDate = new FormControl(moment());
  constructor(private service: StatiscticService, private location: Location){

  }


  search(){
    const dateNow = new Date(Date.now());
    this.showCanvas= false;
    this.dataArrayLost = [];
    this.dataArrayProffit=[];
    this.labels=[];
    if(this.minDate.value?.get('year') === dateNow.getFullYear() && this.maxDate.value?.get('year')===dateNow.getFullYear()){
      if(this.minDate.value?.get('month') <= this.maxDate.value?.get('month')){
        const yearMin=this.minDate.value?.get('year');
        const monthMin = this.minDate.value?.get('month');
        const yearMax=this.maxDate.value?.get('year');
        const monthMax = this.maxDate.value?.get('month');
        
          this.service.getTotalProffitsAndLossForMonths(yearMin,monthMin,yearMax,monthMax).subscribe(
            (resp)=>{
              if(resp.ok===true){
                resp.list!.forEach(
                  (element)=>{
                    this.dataArrayLost.push(element.loss!);
                    this.dataArrayProffit.push(element.proffits!)
                    this.labels.push(element.month!);
                  }
                )
                this.barChartData.labels =this.labels;
                this.barChartData.datasets = [
                  {
                    data: this.dataArrayProffit,
                    backgroundColor: '#4DB6AC',
                    label: 'Ganancias'
                  },
                  {
                    data: this.dataArrayLost,
                    backgroundColor:'#E57373',
                    label: 'Perdidas'
                  }
                ]
                this.showCanvas=true;
              }
            }
          )    
      }else{
        Swal.fire('Error','El mes de la fecha inicial debe ser menor o igual a la fecha final.','error');
      }
    }else{
      Swal.fire('Error','El año de las fechas debe ser igual al año actual.','error');
    } 
  }
}
