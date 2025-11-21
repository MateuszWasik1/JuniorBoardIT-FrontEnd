import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  public apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  public Register(model: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/Accounts/Register', model);
  }

  public Login(model: any): Observable<any> {
    const params = new HttpParams().set('username', model.UUserName).set('password', model.UPassword);

    return this.http.get<any>(this.apiUrl + 'api/Accounts/Login', { params: params });
  }
}
