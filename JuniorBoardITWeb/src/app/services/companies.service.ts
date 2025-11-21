import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { GetToken } from '../helpers/request.service';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  public apiUrl = environment.apiUrl;

  private http = inject(HttpClient);
  private cookiesService = inject(CookieService);

  GetCompany(CGID: any): Observable<any> {
    const params = new HttpParams().set('cgid', CGID);

    return this.http.get<any>(this.apiUrl + 'api/Companies/GetCompany', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  GetCompanies(Skip: number, Take: number, Name: string): Observable<any> {
    const params = new HttpParams().set('skip', Skip).set('take', Take).set('name', Name);

    return this.http.get<any>(this.apiUrl + 'api/Companies/GetCompanies', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  GetCompaniesForUser(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/Companies/GetCompaniesForUser', {
      headers: GetToken(this.cookiesService)
    });
  }

  AddCompany(model: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/Companies/AddCompany', model, {
      headers: GetToken(this.cookiesService)
    });
  }

  UpdateCompany(model: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + 'api/Companies/UpdateCompany', model, {
      headers: GetToken(this.cookiesService)
    });
  }

  DeleteCompany(CGID: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}api/Companies/DeleteCompany/${CGID}`, {
      headers: GetToken(this.cookiesService)
    });
  }
}
