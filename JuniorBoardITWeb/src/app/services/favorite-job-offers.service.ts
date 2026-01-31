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

  public AddFavoriteJobOffer(JOGID: string): Observable<void> {
    return this.http.post<void>(
      this.apiUrl + 'api/FavoriteJobOffers/AddFavoriteJobOffer',
      { jogid: JOGID },
      {
        headers: GetToken(this.cookiesService)
      }
    );
  }

  public DeleteFavoriteJobOffer(FJOGID: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}api/FavoriteJobOffers/DeleteFavoriteJobOffer/${FJOGID}`, {
      headers: GetToken(this.cookiesService)
    });
  }
}
