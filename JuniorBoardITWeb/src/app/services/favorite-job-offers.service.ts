import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { GetToken } from '../helpers/request.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoriteJobOffersService {
  public apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private cookiesService: CookieService
  ) {}
  AddFavoriteJobOffer(jogid: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'api/FavoriteJobOffers/AddFavoriteJobOffer',
      { jogid: jogid },
      {
        headers: GetToken(this.cookiesService)
      }
    );
  }

  DeleteFavoriteJobOffer(FJOGID: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}api/FavoriteJobOffers/DeleteFavoriteJobOffer/${FJOGID}`, {
      headers: GetToken(this.cookiesService)
    });
  }
}
