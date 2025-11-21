import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { GetToken } from '../helpers/request.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  public apiUrl = environment.apiUrl;

  private http = inject(HttpClient);
  private cookiesService = inject(CookieService);

  GetNumberOfRecruiterPublishedOfferts(startDate: Date, endDate: Date): Observable<any> {
    const params = new HttpParams()
      .set('startDate', this.DateToString(new Date(startDate)))
      .set('endDate', this.DateToString(new Date(endDate)));

    return this.http.get<any>(this.apiUrl + 'api/Stats/GetNumberOfRecruiterPublishedOfferts', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  GetNumberOfCompanyPublishedOfferts(startDate: Date, endDate: Date, cgid: string): Observable<any> {
    const params = new HttpParams()
      .set('startDate', this.DateToString(new Date(startDate)))
      .set('endDate', this.DateToString(new Date(endDate)))
      .set('cgid', cgid);

    return this.http.get<any>(this.apiUrl + 'api/Stats/GetNumberOfCompanyPublishedOfferts', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  GetNumberOfCompaniesPublishedOfferts(startDate: Date, endDate: Date): Observable<any> {
    const params = new HttpParams()
      .set('startDate', this.DateToString(new Date(startDate)))
      .set('endDate', this.DateToString(new Date(endDate)));

    return this.http.get<any>(this.apiUrl + 'api/Stats/GetNumberOfCompaniesPublishedOfferts', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  GetNumberOfActiveCompaniesOfferts(date: Date, cgid: string): Observable<any> {
    const params = new HttpParams().set('date', this.DateToString(new Date(date))).set('cgid', cgid);

    return this.http.get<any>(this.apiUrl + 'api/Stats/GetNumberOfActiveCompaniesOfferts', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  GetNumberOfCompanyRecruiters(cgid: string): Observable<any> {
    const params = new HttpParams().set('cgid', cgid);

    return this.http.get<any>(this.apiUrl + 'api/Stats/GetNumberOfCompanyRecruiters', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  public DateToString = (date: Date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
