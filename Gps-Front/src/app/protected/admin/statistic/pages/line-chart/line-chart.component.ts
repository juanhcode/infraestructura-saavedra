import {Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { ChartConfiguration, ChartOptions } from "chart.js";
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { MainClass } from '../../../../../../classes/mainClass';
import Swal from 'sweetalert2';
import { StatiscticService } from '../../services/statisctic.service';
import { Location } from '@angular/common';

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
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
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
export class LineChartComponent implements OnInit{

  showCanvas:boolean=true;
  Pageproducts:boolean=false;
  labels:string[]=[];
  data:number[]=[];
  title = 'ng2-charts-demo';

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.labels,
    datasets: [
      {
        data: this.data,
        label: 'Ventas',
        fill: true,
        tension: 0.0,
        borderColor: 'black',
        backgroundColor: '#3F51B5'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;
  main:MainClass= new MainClass();
  minDate = new FormControl(moment());
  maxDate = new FormControl(moment());

  constructor(private service: StatiscticService, private location: Location){

  }

  ngOnInit(): void {
    const currentUrl= this.location.path();
    this.Pageproducts= currentUrl.includes('productos-vendidos');
  }
  

  search(){
    const dateNow = new Date(Date.now());
    this.showCanvas= false;
    this.data = [];
    this.labels=[];
    if(this.minDate.value?.get('year') === dateNow.getFullYear() && this.maxDate.value?.get('year')===dateNow.getFullYear()){
      if(this.minDate.value?.get('month') <= this.maxDate.value?.get('month')){
        const yearMin=this.minDate.value?.get('year');
        const monthMin = this.minDate.value?.get('month');
        const yearMax=this.maxDate.value?.get('year');
        const monthMax = this.maxDate.value?.get('month');
        if(!this.Pageproducts){

          this.service.getTotalSalesForMonths(yearMin,monthMin,yearMax,monthMax).subscribe(
            (resp)=>{
              if(resp.ok===true){
                resp.list!.forEach(
                  (element)=>{
                    this.data.push(element.totalSales!);
                    this.labels.push(element.month!);
                  }
                )
                this.lineChartData.labels =this.labels;
                this.lineChartData.datasets = [
                  {
                    data: this.data,
                    label: 'Ventas',
                    fill: true,
                    tension: 0.0,
                    borderColor: 'black',
                    backgroundColor: '#3F51B5'
                  }
                ]
                this.showCanvas=true;
              }
            }
          )
        } else{
          this.service.getTotalProducts(yearMin,monthMin,yearMax,monthMax).subscribe(
            (data) =>{
              console.log(data);             
            })    
        }
      }else{
        Swal.fire('Error','El mes de la fecha inicial debe ser menor o igual a la fecha final.','error');
      }
    }else{
      Swal.fire('Error','El año de las fechas debe ser igual al año actual.','error');
    }
  }
}
