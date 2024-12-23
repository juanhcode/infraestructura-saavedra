import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AuthResponse, User } from '../interfaces/interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl: string = environment.baseURL;
  private _user ?: User;

  get user() {
    return { ...this._user };
  }

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  registro(name: string, surname: string, email: string, password: string, phoneNumber: number, adress: string):Observable<AuthResponse> {
    const url = `${this.baseUrl}/auth/new`;
    const idRole = 2;
    const searchObj = {idRole,email}
    const body = { searchObj, name, surname, email, password, phoneNumber, adress, idRole, image:null };
    return this.http.post<AuthResponse>(url, body).pipe(
      tap(({ ok, token }) => {
        if (ok===true) {
          this.cookieService.set('token', token!);
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.mgs))
    )
  }

  setCookie(cookieValue:string){
    const cookieOptions = {
      expires: 30,
      path: '/'
    };
    this.cookieService.set('token', cookieValue, cookieOptions);
  }

  deleteCookie() {
    this.cookieService.delete('token', '/');
  }

  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth`
    const body = { email, password };
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    return this.http.post<AuthResponse>(url, body, { headers }).pipe(
      tap(({ ok, token }) => {
        if (ok===true) {
          this.setCookie(token!);
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    )
  }



  validarToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('token', this.cookieService.get('token') || '');
    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map(resp => {
          if (!this.cookieService.get("token")) {
            this.setCookie(resp.token!);
          }
          this._user = {
            name: resp.name!,
            uid: resp.uid!,
            surname:resp.surname!,
            image:resp.image!,
            phoneNumber:resp.phoneNumber!,
            adress:resp.adress!,
            email: resp.email!,
            rol:resp.rol!
          }
          return resp.ok;
        }),
        catchError(err => of(false))
      );
  }

  logout() {
    this._user = {}
    this.deleteCookie();
  }
}
