import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import {
  AddReportModel,
  ChangeReportStatusModel,
  LoadReportType,
  ReportsListModel
} from '../components/reports-page.component/reports-page.models';
import { ReportsTypeEnum } from '../enums/Reports/ReportsTypeEnum';
import { GetToken } from '../helpers/request.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  public apiUrl = environment.apiUrl;

  private http = inject(HttpClient);
  private cookiesService = inject(CookieService);

  public GetReport(RGID: string): Observable<LoadReportType> {
    const params = new HttpParams().set('rgid', RGID);

    return this.http.get<LoadReportType>(this.apiUrl + 'api/Reports/GetReport', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  public GetReports(
    Skip: number,
    Take: number,
    ReportType: ReportsTypeEnum,
    Message: string
  ): Observable<ReportsListModel> {
    const params = new HttpParams()
      .set('skip', Skip)
      .set('take', Take)
      .set('reportType', ReportType)
      .set('message', Message);

    return this.http.get<ReportsListModel>(this.apiUrl + 'api/Reports/GetReports', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  public SaveReport(model: AddReportModel): Observable<void> {
    const modelToSend = {
      ...model,
      RReasons: model.RReasons.join(',')
    };

    return this.http.post<void>(this.apiUrl + 'api/Reports/SaveReport', modelToSend, {
      headers: GetToken(this.cookiesService)
    });
  }

  public ChangeReportStatus(model: ChangeReportStatusModel): Observable<void> {
    return this.http.put<void>(this.apiUrl + 'api/Reports/ChangeReportStatus', model, {
      headers: GetToken(this.cookiesService)
    });
  }
}
