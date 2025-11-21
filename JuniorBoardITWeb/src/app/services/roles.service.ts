import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { GetToken } from '../helpers/request.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  public apiUrl = environment.apiUrl;

  private http = inject(HttpClient);
  private cookiesService = inject(CookieService);

  GetUserRoles(): Observable<any> {
    const params = new HttpParams();

    return this.http.get<any>(this.apiUrl + 'api/Roles/GetUserRoles', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  GetIsUserAdmin(): Observable<any> {
    const params = new HttpParams();

    return this.http.get<any>(this.apiUrl + 'api/Roles/GetIsUserAdmin', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  GetIsUserSupport(): Observable<any> {
    const params = new HttpParams();

    return this.http.get<any>(this.apiUrl + 'api/Roles/GetIsUserSupport', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }
}
