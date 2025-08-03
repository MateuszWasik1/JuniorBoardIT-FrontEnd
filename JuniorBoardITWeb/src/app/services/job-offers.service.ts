import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { GetToken } from '../helpers/request.service';
import { environment } from 'src/environments/environment';
import { EducationEnum } from '../enums/JobOffers/EducationEnum';

@Injectable({
  providedIn: 'root'
})
export class JobOffersService {
  public apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private cookiesService: CookieService
  ) {}

  GetJobOffer(JOGID: any): Observable<any> {
    let params = new HttpParams().set('jogid', JOGID);

    return this.http.get<any>(this.apiUrl + 'api/JobOffers/GetJobOffer', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  GetAllJobOffers(Skip: number, Take: number, Education: EducationEnum, Favorite: boolean): Observable<any> {
    let params = new HttpParams()
      .set('skip', Skip)
      .set('take', Take)
      .set('education', Education)
      .set('favorites', Favorite);

    return this.http.get<any>(this.apiUrl + 'api/JobOffers/GetAllJobOffers', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  AddJobOffer(model: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/JobOffers/AddJobOffer', model, {
      headers: GetToken(this.cookiesService)
    });
  }

  UpdateJobOffer(model: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + 'api/JobOffers/UpdateJobOffer', model, {
      headers: GetToken(this.cookiesService)
    });
  }

  DeleteJobOffer(JOGID: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}api/JobOffers/Delete/${JOGID}`, {
      headers: GetToken(this.cookiesService)
    });
  }
}
