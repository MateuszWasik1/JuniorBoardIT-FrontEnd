import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { GetToken } from '../helpers/request.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteJobOffersService {
  public apiUrl = environment.apiUrl;

  private http = inject(HttpClient);
  private cookiesService = inject(CookieService);

  public AddFavoriteJobOffer(jogid: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'api/FavoriteJobOffers/AddFavoriteJobOffer',
      { jogid: jogid },
      {
        headers: GetToken(this.cookiesService)
      }
    );
  }

  public DeleteFavoriteJobOffer(FJOGID: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}api/FavoriteJobOffers/DeleteFavoriteJobOffer/${FJOGID}`, {
      headers: GetToken(this.cookiesService)
    });
  }
}
