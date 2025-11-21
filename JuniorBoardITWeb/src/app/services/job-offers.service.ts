import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { CategoryEnum } from '../enums/JobOffers/CategoryEnum';
import { EducationEnum } from '../enums/JobOffers/EducationEnum';
import { EmploymentTypeEnum } from '../enums/JobOffers/EmploymentTypeEnum';
import { ExpirenceEnum } from '../enums/JobOffers/ExpirenceEnum';
import { LocationEnum } from '../enums/JobOffers/LocationEnum';
import { SalaryEnum } from '../enums/JobOffers/SalaryEnum';
import { GetToken } from '../helpers/request.service';

@Injectable({
  providedIn: 'root'
})
export class JobOffersService {
  public apiUrl = environment.apiUrl;

  private http = inject(HttpClient);
  private cookiesService = inject(CookieService);

  public GetJobOffer(JOGID: any): Observable<any> {
    const params = new HttpParams().set('jogid', JOGID);

    return this.http.get<any>(this.apiUrl + 'api/JobOffers/GetJobOffer', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  public GetAllJobOffers(
    Skip: number,
    Take: number,
    Expirence: ExpirenceEnum,
    Category: CategoryEnum,
    Location: LocationEnum,
    Education: EducationEnum,
    EmploymentType: EmploymentTypeEnum,
    Salary: SalaryEnum,
    Favorite: boolean
  ): Observable<any> {
    const params = new HttpParams()
      .set('skip', Skip)
      .set('take', Take)
      .set('expirence', Expirence)
      .set('category', Category)
      .set('location', Location)
      .set('education', Education)
      .set('employmentType', EmploymentType)
      .set('salary', Salary)
      .set('favorites', Favorite);

    return this.http.get<any>(this.apiUrl + 'api/JobOffers/GetAllJobOffers', {
      params: params,
      headers: GetToken(this.cookiesService)
    });
  }

  public AddJobOffer(model: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/JobOffers/AddJobOffer', model, {
      headers: GetToken(this.cookiesService)
    });
  }

  public UpdateJobOffer(model: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + 'api/JobOffers/UpdateJobOffer', model, {
      headers: GetToken(this.cookiesService)
    });
  }

  public DeleteJobOffer(JOGID: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}api/JobOffers/Delete/${JOGID}`, {
      headers: GetToken(this.cookiesService)
    });
  }
}
