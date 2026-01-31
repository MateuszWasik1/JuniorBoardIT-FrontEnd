import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { CompaniesModel, CompanyModel } from '../components/companies-page.component/companies-page.models';
import { CompaniesModel as UserCompaniesModel } from '../components/user-page.component/user-page.models';
import { GetToken } from '../helpers/request.service';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  public apiUrl = environment.apiUrl;

  private http = inject(HttpClient);
  private cookiesService = inject(CookieService);

  GetCompany(CGID: string): Observable<CompanyModel> {
    const params = new HttpParams().set('cgid', CGID);

    return this.http.get<CompanyModel>(this.apiUrl + 'api/Companies/GetCompany', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  GetCompanies(Skip: number, Take: number, Name: string): Observable<CompaniesModel> {
    const params = new HttpParams().set('skip', Skip).set('take', Take).set('name', Name);

    return this.http.get<CompaniesModel>(this.apiUrl + 'api/Companies/GetCompanies', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  GetCompaniesForUser(): Observable<UserCompaniesModel> {
    return this.http.get<UserCompaniesModel>(this.apiUrl + 'api/Companies/GetCompaniesForUser', {
      headers: GetToken(this.cookiesService)
    });
  }

  AddCompany(model: CompanyModel): Observable<void> {
    return this.http.post<void>(this.apiUrl + 'api/Companies/AddCompany', model, {
      headers: GetToken(this.cookiesService)
    });
  }

  UpdateCompany(model: CompanyModel): Observable<void> {
    return this.http.put<void>(this.apiUrl + 'api/Companies/UpdateCompany', model, {
      headers: GetToken(this.cookiesService)
    });
  }

  DeleteCompany(CGID: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}api/Companies/DeleteCompany/${CGID}`, {
      headers: GetToken(this.cookiesService)
    });
  }
}
