import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { GetToken } from '../helpers/request.service';

@Injectable({
  providedIn: 'root'
})
export class ApplyService {
  public apiUrl = environment.apiUrl;

  private http = inject(HttpClient);
  private cookiesService = inject(CookieService);

  // public GetApplications(Skip: number, Take: number, UGID: string): Observable<any> {
  //   const params = new HttpParams().set('skip', Skip).set('take', Take).set('ugid', UGID);

  //   return this.http.get<any>(this.apiUrl + 'api/Applications/GetApplications', {
  //     params: params,
  //     headers: GetToken(this.cookiesService)
  //   });
  // }

  public AddApplication(AJOGID: string): Observable<void> {
    return this.http.post<void>(
      this.apiUrl + 'api/Applications/AddApplication',
      { AJOGID: AJOGID },
      {
        headers: GetToken(this.cookiesService)
      }
    );
  }

  public DeleteApplication(AGID: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + 'api/Applications/DeleteApplication/' + AGID, {
      headers: GetToken(this.cookiesService)
    });
  }
}
