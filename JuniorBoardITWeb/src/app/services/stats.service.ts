import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { GetToken } from '../helpers/request.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  public apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private cookiesService: CookieService
  ) {}

  GetNumberOfRecruiterPublishedOfferts(startDate: Date, endDate: Date): Observable<any> {
    let params = new HttpParams()
      .set('startDate', this.DateToString(new Date(startDate)))
      .set('endDate', this.DateToString(new Date(endDate)));

    return this.http.get<any>(this.apiUrl + 'api/Stats/GetNumberOfRecruiterPublishedOfferts', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  GetNumberOfCompanyPublishedOfferts(startDate: Date, endDate: Date): Observable<any> {
    let params = new HttpParams()
      .set('startDate', this.DateToString(new Date(startDate)))
      .set('endDate', this.DateToString(new Date(endDate)));

    return this.http.get<any>(this.apiUrl + 'api/Stats/GetNumberOfCompanyPublishedOfferts', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  GetNumberOfCompaniesPublishedOfferts(startDate: Date, endDate: Date): Observable<any> {
    let params = new HttpParams()
      .set('startDate', this.DateToString(new Date(startDate)))
      .set('endDate', this.DateToString(new Date(endDate)));

    return this.http.get<any>(this.apiUrl + 'api/Stats/GetNumberOfCompaniesPublishedOfferts', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  GetNumberOfActiveCompaniesOfferts(date: Date): Observable<any> {
    let params = new HttpParams().set('date', this.DateToString(new Date(date)));

    return this.http.get<any>(this.apiUrl + 'api/Stats/GetNumberOfActiveCompaniesOfferts', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  GetNumberOfCompanyRecruiters(date: Date): Observable<any> {
    let params = new HttpParams().set('date', this.DateToString(new Date(date)));

    return this.http.get<any>(this.apiUrl + 'api/Stats/GetNumberOfCompanyRecruiters', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  public DateToString = (date: Date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
