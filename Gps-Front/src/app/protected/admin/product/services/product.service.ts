import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.prod';
import { ProductResponse, ProductsResponse } from '../interfaces/intergace';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _baseUrl = `${environment.baseURL}/producto`;
  constructor(private http:HttpClient) { }

  createProduct(formData:FormData): Observable<ProductResponse> {
    const url = `${this._baseUrl}/new`;
    return this.http.post<ProductResponse>(url,formData).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }

  updateProduct(formData:FormData,id:string):Observable<ProductResponse> {
    const idEncontrado = Number.parseInt(id);
    const url = `${this._baseUrl}/edit/${idEncontrado}`;
    return this.http.put<ProductResponse>(url, formData).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }

  findProduct(sortOfAttribute: string,searchById:boolean): Observable<ProductResponse> {
    let url;
    if(searchById===true){
     url  = `${this._baseUrl}/${sortOfAttribute}`;
    }else{
      url  = `${this._baseUrl}/name/${sortOfAttribute}`;

    }
    return this.http.get<ProductResponse>(url!).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }



  findProducts( wordSearch: string): Observable<ProductsResponse> {
    const url = `${this._baseUrl}/products`;
    const body = { findQuery: { idCategory: 2}, name:wordSearch }
    return this.http.post<ProductsResponse>(url, body).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }

  findProductsWithoutSupplier( wordSearch: string): Observable<ProductsResponse> {
    const url = `${this._baseUrl}/products`;
    const body = { findQuery: { idCategory: 1, idSupplier:null}, name:wordSearch }
    return this.http.post<ProductsResponse>(url, body).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }

  deleteProduct(id: string):Observable<ProductResponse> {
    const idEncontrado = Number.parseInt(id);
    const url = `${this._baseUrl}/${idEncontrado}`;
    return this.http.delete<ProductResponse>(url).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }

}
