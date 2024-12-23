import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Customer, CustomerResponse, CustomersResponse } from '../interfaces/interface';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl: string = environment.baseURL;
  private _customer !: Customer;

  constructor(private http: HttpClient) { }


  get customer() {
    return this._customer;
  }

  createCustomer(name: string, surname: string, phoneNumber: number, adress: string): Observable<CustomerResponse> {
    const url = `${this.baseUrl}/cliente/new`;
    const idRole = 2;
    const searchObj = { idRole, name, surname }
    const body = { searchObj, name, surname, phoneNumber, adress, idRole };
    return this.http.post<CustomerResponse>(url, body).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }

  updateCustomer(name: string, surname: string, phoneNumber: number, adress: string, id: string):Observable<CustomerResponse> {
    const idEncontrado = Number.parseInt(id);
    const url = `${this.baseUrl}/cliente/edit/${idEncontrado}`;
    const idRole = 2;
    const body = { name, surname, phoneNumber, adress, idRole };
    return this.http.put<CustomerResponse>(url, body).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );;
  }

  findCustomer(id: string): Observable<CustomerResponse> {
    const idEncontrado = Number.parseInt(id);
    const url = `${this.baseUrl}/cliente/view/${idEncontrado}`;
    return this.http.get<CustomerResponse>(url).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }

  findCustomers(wordSearch: string): Observable<CustomersResponse> {
    const url = `${this.baseUrl}/cliente/customers`;
    const body = { findQuery: { idRole: 2 }, name: wordSearch }
    return this.http.post<CustomersResponse>(url, body).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }

  deleteCustomer(id: string): Observable<CustomerResponse> {
    const idEncontrado = Number.parseInt(id);
    const url = `${this.baseUrl}/cliente/${idEncontrado}`;
    return this.http.delete<CustomerResponse>(url).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }
}
