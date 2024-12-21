import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { EmployeeResponse, EmployeesResponse } from '../interfaces/interface';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private _baseUrl = `${environment.baseURL}/empleado`;
  constructor(private http: HttpClient) { }


  createEmployee(formData:FormData): Observable<EmployeeResponse> {
    const url = `${this._baseUrl}/new`;
    return this.http.post<EmployeeResponse>(url, formData).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }

  updateEmployee(id: string, formData:FormData): Observable<EmployeeResponse> {

    const url = `${this._baseUrl}/edit/${id}`;
    return this.http.put<EmployeeResponse>(url, formData).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }

  findEmployee(id: string): Observable<EmployeeResponse> {
    const url = `${this._baseUrl}/${id}`;
    return this.http.get<EmployeeResponse>(url).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }

  findEmployees(wordSearch: string): Observable<EmployeesResponse> {
    const url = `${this._baseUrl}/empleados`;
    const body = { findQuery: { idRole: 3 }, name: wordSearch }
    return this.http.post<EmployeesResponse>(url, body).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }

  deleteEmployee(id: string): Observable<EmployeeResponse> {
    const url = `${this._baseUrl}/${id}`;
    return this.http.delete<EmployeeResponse>(url).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }

}
