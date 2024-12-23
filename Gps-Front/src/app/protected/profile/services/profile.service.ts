import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { UserResponse } from '../interfaces/interface';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private _baseUrl = `${environment.baseURL}/auth`;
  constructor(private http: HttpClient) { }

  updateUser(id: string, formData:FormData): Observable<UserResponse> {
    const url = `${this._baseUrl}/edit/${id}`;
    return this.http.put<UserResponse>(url, formData).pipe(
      map(response=>response),
      catchError(err => of(err.error.msg))
    );
  }
}
