import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { TotalProffistAndLossResponse, TotalSalesForMonthsResponse, TotalProductResponse  } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatiscticService {

  private _baseUrl = `${environment.baseURL}/estadistica`;
  constructor(private http:HttpClient) { }

  getTotalSalesForMonths(minYear:number,minMonth:number,maxYear:number,maxMonth:number):Observable<TotalSalesForMonthsResponse>{
    const url = `${this._baseUrl}/sales`;
    const body= {minDate:`${minMonth + 1}/01/${minYear}`,maxDate:`${maxMonth + 1}/31/${maxYear}`};
    return this.http.post<TotalSalesForMonthsResponse>(url,body);

  }
  getTotalProffitsAndLossForMonths(minYear:number,minMonth:number,maxYear:number,maxMonth:number):Observable<TotalProffistAndLossResponse>{
    const url = `${this._baseUrl}/proffitsLoss`;
    const body= {minDate:`${minMonth + 1}/01/${minYear}`,maxDate:`${maxMonth + 1}/31/${maxYear}`};
    return this.http.post<TotalProffistAndLossResponse>(url,body);

  }
  getTotalProducts(minYear:number,minMonth:number,maxYear:number,maxMonth:number):Observable<any>{
    const url = `${this._baseUrl}/salesPerProduct`;
    const body= {minDate:`${minMonth + 1}/01/${minYear}`,maxDate:`${maxMonth + 1}/31/${maxYear}`};
    return this.http.post<any>(url,body);

  }

}
