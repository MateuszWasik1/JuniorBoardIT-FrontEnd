import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { GetToken } from '../helpers/request.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplyService {
  public apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private cookiesService: CookieService
  ) {}

  GetApplications(Skip: number, Take: number, UGID: string): Observable<any> {
    let params = new HttpParams().set('skip', Skip).set('take', Take).set('ugid', UGID);

    return this.http.get<any>(this.apiUrl + 'api/Applications/GetApplications', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  AddApplication(AJOGID: string): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'api/Applications/AddApplication',
      { AJOGID: AJOGID },
      {
        headers: GetToken(this.cookiesService)
      }
    );
  }

  DeleteApplication(agid: any): Observable<any> {
    return this.http.delete<any>(this.apiUrl + 'api/Applications/DeleteApplication/' + agid, {
      headers: GetToken(this.cookiesService)
    });
  }
}
