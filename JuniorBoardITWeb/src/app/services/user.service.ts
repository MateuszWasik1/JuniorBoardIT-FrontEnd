import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { UserModel as JobOfferUserModel } from '../components/job-offers-page.component/job-offers-page.models';
import { UserModel } from '../components/user-page.component/user-page.models';
import { UsersModel } from '../components/users-page.component/users-page.models';
import { GetToken } from '../helpers/request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public apiUrl = environment.apiUrl;

  private http = inject(HttpClient);
  private cookiesService = inject(CookieService);

  public GetAllUsers(
    Skip: number,
    Take: number,
    Name: string,
    HasCompany: boolean,
    Role: number
  ): Observable<UsersModel> {
    const params = new HttpParams()
      .set('skip', Skip)
      .set('take', Take)
      .set('name', Name)
      .set('hasCompany', HasCompany)
      .set('role', Role);

    return this.http.get<UsersModel>(this.apiUrl + 'api/User/GetAllUsers', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  public GetUserByAdmin(ugid: string): Observable<UserModel> {
    const params = new HttpParams();

    return this.http.get<UserModel>(this.apiUrl + 'api/User/GetUserByAdmin/' + ugid, {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  public GetUser(): Observable<UserModel | JobOfferUserModel> {
    const params = new HttpParams();

    return this.http.get<UserModel | JobOfferUserModel>(this.apiUrl + 'api/User/GetUser', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  public SaveUser(model: UserModel): Observable<void> {
    return this.http.post<void>(this.apiUrl + 'api/User/SaveUser', model, { headers: GetToken(this.cookiesService) });
  }

  public SaveUserByAdmin(model: UserModel): Observable<void> {
    return this.http.post<void>(this.apiUrl + 'api/User/SaveUserByAdmin', model, {
      headers: GetToken(this.cookiesService)
    });
  }

  public DeleteUser(ugid: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + 'api/User/DeleteUser/' + ugid, {
      headers: GetToken(this.cookiesService)
    });
  }
}
