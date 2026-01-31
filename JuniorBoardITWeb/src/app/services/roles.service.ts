import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { GetToken } from '../helpers/request.service';
import { UserRolesModel } from '../models/general-models';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  public apiUrl = environment.apiUrl;

  private http = inject(HttpClient);
  private cookiesService = inject(CookieService);

  GetUserRoles(): Observable<UserRolesModel> {
    const params = new HttpParams();

    return this.http.get<UserRolesModel>(this.apiUrl + 'api/Roles/GetUserRoles', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  GetIsUserAdmin(): Observable<boolean> {
    const params = new HttpParams();

    return this.http.get<boolean>(this.apiUrl + 'api/Roles/GetIsUserAdmin', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  GetIsUserSupport(): Observable<boolean> {
    const params = new HttpParams();

    return this.http.get<boolean>(this.apiUrl + 'api/Roles/GetIsUserSupport', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }
}
