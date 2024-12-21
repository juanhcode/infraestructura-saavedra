import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { SaleResponse, SalesResponse, Detail_Sale } from '../interfaces/interface';
import { Observable, catchError, map, of } from 'rxjs';
import { SearchObject } from '../../../../Components/crud/interface/interface';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private _baseUrl = `${environment.baseURL}/venta`;
  constructor(private http: HttpClient) { }

  createSale(idCustomer: number | null, details:Detail_Sale[], state: string, total_price: number,updateOrders:boolean): Observable<SaleResponse> {
    const url = `${this._baseUrl}/new`;
    const name = `venta_${Date.now()}`
    const searchObj = {name};
    const body = { name, idCustomer, state, details: JSON.stringify(details), total_price,searchObj,updateOrders};
    return this.http.post<SaleResponse>(url, body).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }

  updateSale(id:string, idCustomer: number | null, details:Detail_Sale[], state: string, total_price: number,date:Date): Observable<SaleResponse> {
    const createdAt= date;
    const url = `${this._baseUrl}/edit/${id}`;
    const body = { idCustomer, state, total_price, details:JSON.stringify(details), createdAt};
    return this.http.put<SaleResponse>(url, body).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }

  findSale(id: string): Observable<SaleResponse> {
    const url = `${this._baseUrl}/${id}`;
    return this.http.get<SaleResponse>(url).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }

  findSalesByCustomer(idCustomer:number): Observable<SalesResponse>{
    const url = `${this._baseUrl}/sales/${idCustomer}`;
    return this.http.get<SalesResponse>(url).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }

  findSales(searchSale: SearchObject, stateSale:string | null): Observable<SalesResponse> {
    const url = `${this._baseUrl}/sales`;
    let body = { name:searchSale.name, createdAt:searchSale.date ,stateSale}
    return this.http.post<SalesResponse>(url, body).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }

  deleteSale(id: string): Observable<SaleResponse> {
    const url = `${this._baseUrl}/${id}`;
    return this.http.delete<SaleResponse>(url).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }
}
