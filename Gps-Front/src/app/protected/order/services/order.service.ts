import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { DetailsOrdersCountResponse, Order, OrdersCountResponse, OrdersResponse, OrderResponse } from '../interfaces/interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { io } from 'socket.io-client';
import { Detail_Order } from 'src/app/protected/order/interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _baseUrl = `${environment.baseURL}/pedido`;
  private _countOrders: number = 0;
  private _order: Order | undefined = undefined;
  _socket: any;
  constructor(private http: HttpClient) { }

  get socket() {
    return this._socket;
  }
  setupSocketConnection() {
    this._socket = io(environment.SOCKET_ENDPOINT);
  }

  get order() {
    return this._order;
  }

  get countOrders() {
    return this._countOrders;
  }

  createOrder(total_price: number, details: Detail_Order[], idCustomer: number): Observable<OrderResponse> {
    const url = `${this._baseUrl}/new`;
    const body = { name: `pedido-${Date.now()}`, state: 'pendiente', total_price, details: JSON.stringify(details), idCustomer }
    return this.http.post<OrderResponse>(url, body).pipe(
      tap(resp => {
        if (resp.ok) {
          this._order = resp.obj;
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    )
  }

  getcountOrders(): Observable<OrdersCountResponse> {
    const url = `${this._baseUrl}/orders/amount`
    return this.http.get<OrdersCountResponse>(url).pipe(
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  }

  getcountdetailOrder(idCustomer: string): Observable<DetailsOrdersCountResponse> {
    const url = `${this._baseUrl}/details/amount/${idCustomer}`
    return this.http.get<DetailsOrdersCountResponse>(url).pipe(
      tap(resp => {
        if (resp.ok === true) {
          if (resp.count! > 0) {
            this._order = resp.rows![0].Order
          }
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  }

  findOrder(id:string):Observable<OrderResponse>{
    const url = `${this._baseUrl}/${id}`;
    return this.http.get<OrderResponse>(url);
  }

  findOrders(wordSearch: any, stateOrder: string[],idCustomer:number | undefined): Observable<OrdersResponse> {
    const url = `${this._baseUrl}/orders`;
    const body = { createdAt: wordSearch, stateOrder,idCustomer }
    return this.http.post<OrdersResponse>(url, body).pipe(
      map(response => response),
      catchError(err => of(err.error.msg))
    );;
  }

  updateOrder(state:string): Observable<OrderResponse> {
    const url = `${this._baseUrl}/edit/${this.order?.id}`;
    const body = { state }
    return this.http.put<OrderResponse>(url, body).pipe(
      tap(resp => {
        if (resp.ok) {
          this._order = undefined;
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    )
  }

  updateDetailsOrder(details: Detail_Order[]): Observable<OrderResponse> {
    const url = `${this._baseUrl}/detail/edit/${this.order?.id}`;
    const body = { details: JSON.stringify(details) }
    return this.http.put<OrderResponse>(url, body).pipe(
      tap(resp => {
        if (resp.ok) {
          this._order = resp.obj;
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    )
  }

  deleteDetailOrder(id:string):Observable<OrderResponse>{
    const url = `${this._baseUrl}/detail/${id}`;
    return this.http.delete<OrderResponse>(url);
  }

  deleteOrder(id:string):Observable<OrderResponse>{
    const url = `${this._baseUrl}/${id}`;
    return this.http.delete<OrderResponse>(url);
  }
}
