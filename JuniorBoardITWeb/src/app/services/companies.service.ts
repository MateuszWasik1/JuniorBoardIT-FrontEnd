import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { GetToken } from '../helpers/request.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  public apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private cookiesService: CookieService
  ) {}

  GetCompany(CGID: any): Observable<any> {
    let params = new HttpParams().set('cgid', CGID);

    return this.http.get<any>(this.apiUrl + 'api/Companies/GetCompany', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  GetCompanies(Skip: number, Take: number): Observable<any> {
    let params = new HttpParams().set('skip', Skip).set('take', Take);

    return this.http.get<any>(this.apiUrl + 'api/Companies/GetCompanies', {
      params: params,
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
