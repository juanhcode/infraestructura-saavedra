import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ManufactureResponse, ManufacturesResponse, ProductsExpenseAvalaibleResponse, Detail_Manufacture } from '../interface/interface';
import { Observable } from 'rxjs';
import { ExpensesResponse } from '../../admin/expense/interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class ManufactureService {
  private _baseUrl = `${environment.baseURL}/manufactura`;
  constructor(private http:HttpClient) { }

  findExpenses(): Observable<ExpensesResponse> {
    const url = `${this._baseUrl}/expenses/avalaibles`;
    return this.http.get<ExpensesResponse>(url);
  }

  findManufactures(wordSearch:any):Observable<ManufacturesResponse>{
    const url = `${this._baseUrl}/manufactures`
     const body = { createdAt: wordSearch };
    return this.http.post<ManufacturesResponse>(url,body);
  }

  findProductsExpenseAvalaible(id: string): Observable<ProductsExpenseAvalaibleResponse> {
    const url = `${this._baseUrl}/details/expense/${id}`;
    return this.http.get<ProductsExpenseAvalaibleResponse>(url);
  }

  findManufacture(id:string):Observable<ManufactureResponse>{
    const url = `${this._baseUrl}/${id}`;
    return this.http.get<ManufactureResponse>(url);
  }
  createManufacture(details:Detail_Manufacture[],idEmployee:number):Observable<ManufactureResponse>{
    const url = `${this._baseUrl}/new`
    const body = {name:`manufacture-${Date.now()}`,details: JSON.stringify(details),idEmployee}
    return this.http.post<ManufactureResponse>(url,body);
  }

  updateManufacture(id:string,details:Detail_Manufacture[],idEmployee:number):Observable<ManufactureResponse>{
  const url = `${this._baseUrl}/edit/${id}`
  const body = {details:JSON.stringify(details),idEmployee};
  return this.http.put<ManufactureResponse>(url,body);
  }

  deleteManufacture(id: string): Observable<ManufactureResponse> {
    const url = `${this._baseUrl}/${id}`;
    return this.http.delete<ManufactureResponse>(url).pipe();
  }
}
