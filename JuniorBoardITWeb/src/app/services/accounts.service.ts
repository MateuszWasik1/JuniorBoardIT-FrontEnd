import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { LoginUserModel, RegisterUserModel } from '../components/account-page.component/account-page.models';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  public apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  public Register(model: RegisterUserModel): Observable<void> {
    return this.http.post<void>(this.apiUrl + 'api/Accounts/Register', model);
  }

  public Login(model: LoginUserModel): Observable<string> {
    const params = new HttpParams().set('username', model.UUserName).set('password', model.UPassword);

    return this.http.get<string>(this.apiUrl + 'api/Accounts/Login', { params: params });
  }
}
