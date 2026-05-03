import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { GetToken } from '../helpers/request.service';

@Injectable({
  providedIn: 'root'
})
export class FileGeneratorService {
  public apiUrl = environment.fileGeneratorApiUrl;

  private http = inject(HttpClient);
  private cookiesService = inject(CookieService);

  DownloadApplicationsFile(startDate: Date, endDate: Date): Observable<any> {
    const params = new HttpParams()
      .set('startDate', this.DateToString(new Date(startDate)))
      .set('endDate', this.DateToString(new Date(endDate)));

    return this.http.get<any>(this.apiUrl + 'api/Applications/DownloadApplicationsFile', {
      headers: GetToken(this.cookiesService)
    });
  }

  public DateToString = (date: Date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
