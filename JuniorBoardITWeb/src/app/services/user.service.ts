import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { GetToken } from '../helpers/request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public apiUrl = environment.apiUrl;

  private http = inject(HttpClient);
  private cookiesService = inject(CookieService);

  GetAllUsers(Skip: number, Take: number, Name: string, HasCompany: boolean, Role: number): Observable<any> {
    const params = new HttpParams()
      .set('skip', Skip)
      .set('take', Take)
      .set('name', Name)
      .set('hasCompany', HasCompany)
      .set('role', Role);

    return this.http.get<any>(this.apiUrl + 'api/User/GetAllUsers', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  GetUserByAdmin(ugid: any): Observable<any> {
    const params = new HttpParams();

    return this.http.get<any>(this.apiUrl + 'api/User/GetUserByAdmin/' + ugid, {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  GetUser(): Observable<any> {
    const params = new HttpParams();

    return this.http.get<any>(this.apiUrl + 'api/User/GetUser', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  SaveUser(model: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/User/SaveUser', model, { headers: GetToken(this.cookiesService) });
  }

  SaveUserByAdmin(model: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/User/SaveUserByAdmin', model, {
      headers: GetToken(this.cookiesService)
    });
  }

  DeleteUser(ugid: any): Observable<any> {
    return this.http.delete<any>(this.apiUrl + 'api/User/DeleteUser/' + ugid, {
      headers: GetToken(this.cookiesService)
    });
  }
}
