import { CookieService } from 'ngx-cookie-service';

export function GetToken(cookieService: CookieService) {
  const token = cookieService.get('token');

  return { Authorization: `Bearer ${token}` };
}
