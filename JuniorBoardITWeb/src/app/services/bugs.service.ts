import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Bug, BugNote, BugNotesModel, BugsModel, BugStatus } from '../components/bugs-page.component/bugs-page.models';
import { BugTypeEnum } from '../enums/Bugs/BugTypeEnum';
import { GetToken } from '../helpers/request.service';

@Injectable({
  providedIn: 'root'
})
export class BugsService {
  public apiUrl = environment.apiUrl;

  private http = inject(HttpClient);
  private cookiesService = inject(CookieService);

  public GetBugs(BugType: BugTypeEnum, Skip: number, Take: number, Message: string): Observable<BugsModel> {
    const params = new HttpParams().set('bugType', BugType).set('skip', Skip).set('take', Take).set('message', Message);

    return this.http.get<BugsModel>(this.apiUrl + 'api/Bugs/GetBugs', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  public GetBug(BGID: string): Observable<Bug> {
    const params = new HttpParams().set('bgid', BGID);

    return this.http.get<Bug>(this.apiUrl + 'api/Bugs/GetBug', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  public GetBugNotes(BGID: string, Skip: number, Take: number): Observable<BugNotesModel> {
    const params = new HttpParams().set('bgid', BGID).set('skip', Skip).set('take', Take);

    return this.http.get<BugNotesModel>(this.apiUrl + 'api/BugsNotes/GetBugNotes', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  public SaveBug(model: Bug): Observable<void> {
    return this.http.post<void>(this.apiUrl + 'api/Bugs/SaveBug', model, { headers: GetToken(this.cookiesService) });
  }

  public SaveBugNote(model: BugNote): Observable<void> {
    return this.http.post<void>(this.apiUrl + 'api/BugsNotes/SaveBugNote', model, {
      headers: GetToken(this.cookiesService)
    });
  }

  public ChangeBugStatus(model: BugStatus): Observable<void> {
    return this.http.post<void>(this.apiUrl + 'api/Bugs/ChangeBugStatus', model, {
      headers: GetToken(this.cookiesService)
    });
  }
}
