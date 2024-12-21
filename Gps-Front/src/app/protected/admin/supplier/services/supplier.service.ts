import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { SupplierResponse, SuppliersResponse } from '../interface/interface';
import { Observable, catchError, map, of } from 'rxjs';
import { Product } from '../../product/interfaces/intergace';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private _baseUrl = `${environment.baseURL}/proveedor`;
  constructor(private http: HttpClient) { }

  createSupplier(name: string, adress: string, phoneNumber: number, Supplierproducts: Product[]): Observable<SupplierResponse> {
    const url = `${this._baseUrl}/new`;
    const body = { name, adress, phoneNumber, products: JSON.stringify(Supplierproducts) };
    return this.http.post<SupplierResponse>(url, body).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }

  updateSupplier(name: string, adress: string, phoneNumber: number, Supplierproducts: Product[], id: string): Observable<SupplierResponse> {
    const url = `${this._baseUrl}/edit/${id}`;
    const body = {name,adress,phoneNumber,products: JSON.stringify(Supplierproducts)};
    return this.http.put<SupplierResponse>(url, body).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }

  findSupplier(id: string): Observable<SupplierResponse> {
    const url = `${this._baseUrl}/${id}`;
    return this.http.get<SupplierResponse>(url).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }

  findSuppliers(wordSearch: string): Observable<SuppliersResponse> {
    const url = `${this._baseUrl}/suppliers`;
    const body = { name: wordSearch }
    return this.http.post<any>(url, body).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }

  deleteSupplier(id: string): Observable<SupplierResponse> {
    const url = `${this._baseUrl}/${id}`;
    return this.http.delete<SupplierResponse>(url).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }
}
