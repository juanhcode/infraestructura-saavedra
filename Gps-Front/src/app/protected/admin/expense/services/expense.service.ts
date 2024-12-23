import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { ExpensesResponse, Detail_Expense, ExpenseResponse } from '../interfaces/interface';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private _baseUrl = `${environment.baseURL}/gasto`
  constructor(private http:HttpClient) { }

  createExpense(details:Detail_Expense[], total_price: number): Observable<ExpenseResponse> {
    const url = `${this._baseUrl}/new`;
    const name = `gasto_${Date.now()}`;
    const searchObj = {name};
    const body = { name:name, details: JSON.stringify(details), total_price,searchObj};
    return this.http.post<ExpenseResponse>(url, body).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }

  findExpense(id: string): Observable<ExpenseResponse> {
    const url = `${this._baseUrl}/${id}`;
    return this.http.get<ExpenseResponse>(url).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }

  updateExpense(id:string,details:Detail_Expense[],total_price: number,date:Date): Observable<ExpenseResponse> {
    const createdAt= date;
    const url = `${this._baseUrl}/edit/${id}`;
    const body = { total_price, details:JSON.stringify(details), createdAt};
    return this.http.put<ExpenseResponse>(url, body).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }

  findExpenses(wordSearch: any): Observable<ExpensesResponse> {
    const url = `${this._baseUrl}/expenses`;
    const body = { createdAt: wordSearch }
    return this.http.post<ExpensesResponse>(url, body);
  }

  deleteExpense(id: string): Observable<ExpenseResponse> {
    const url = `${this._baseUrl}/${id}`;
    return this.http.delete<ExpenseResponse>(url).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }
}
