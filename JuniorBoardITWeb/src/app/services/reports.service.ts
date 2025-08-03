import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { GetToken } from '../helpers/request.service';
import { environment } from 'src/environments/environment';
import { ReportsTypeEnum } from '../enums/Reports/ReportsTypeEnum';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  public apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private cookiesService: CookieService
  ) {}

  GetReport(RGID: any): Observable<any> {
    let params = new HttpParams().set('rgid', RGID);

    return this.http.get<any>(this.apiUrl + 'api/Reports/GetReport', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  GetReports(Skip: number, Take: number, ReportType: ReportsTypeEnum): Observable<any> {
    let params = new HttpParams().set('skip', Skip).set('take', Take).set('reportType', ReportType);

    return this.http.get<any>(this.apiUrl + 'api/Reports/GetReports', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  SaveReport(model: any): Observable<any> {
    let modelToSend = {
      ...model,
      RReasons: model.RReasons.join(',')
    };

    return this.http.post<any>(this.apiUrl + 'api/Reports/SaveReport', modelToSend, {
      headers: GetToken(this.cookiesService)
    });
  }

  ChangeReportStatus(model: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + 'api/Reports/ChangeReportStatus', model, {
      headers: GetToken(this.cookiesService)
    });
  }
}
