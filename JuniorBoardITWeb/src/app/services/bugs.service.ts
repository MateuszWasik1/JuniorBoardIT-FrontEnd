import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { BugTypeEnum } from '../enums/Bugs/BugTypeEnum';
import { GetToken } from '../helpers/request.service';

@Injectable({
  providedIn: 'root'
})
export class BugsService {
  public apiUrl = environment.apiUrl;

  private http = inject(HttpClient);
  private cookiesService = inject(CookieService);

  public GetBugs(BugType: BugTypeEnum, Skip: number, Take: number, Message: string): Observable<any> {
    const params = new HttpParams().set('bugType', BugType).set('skip', Skip).set('take', Take).set('message', Message);

    return this.http.get<any>(this.apiUrl + 'api/Bugs/GetBugs', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  public GetBug(bgid: any): Observable<any> {
    const params = new HttpParams().set('bgid', bgid);

    return this.http.get<any>(this.apiUrl + 'api/Bugs/GetBug', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  public GetBugNotes(bgid: any, Skip: number, Take: number): Observable<any> {
    const params = new HttpParams().set('bgid', bgid).set('skip', Skip).set('take', Take);

    return this.http.get<any>(this.apiUrl + 'api/BugsNotes/GetBugNotes', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  public SaveBug(model: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/Bugs/SaveBug', model, { headers: GetToken(this.cookiesService) });
  }

  public SaveBugNote(model: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/BugsNotes/SaveBugNote', model, {
      headers: GetToken(this.cookiesService)
    });
  }

  public ChangeBugStatus(model: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/Bugs/ChangeBugStatus', model, {
      headers: GetToken(this.cookiesService)
    });
  }
}
