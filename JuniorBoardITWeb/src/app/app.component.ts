import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

import { RolesService } from './services/roles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public translate = inject(TranslateService);
  public cookieService = inject(CookieService);
  public rolesService = inject(RolesService);
  public router = inject(Router);
  public route = inject(ActivatedRoute);

  public language = 'pl';
  public stopNavigate = false;
  public hideMenu = false;
  public mainClass = 'container';
  public IsAdmin = false;
  public IsSupport = false;
  public IsRecruiter = false;
  public IsUser = false;
  public IsMobileMenuActive = false;

  public subscriptions: Subscription[];

  constructor() {
    this.subscriptions = [];

    //routing - find if in component login or register
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.hideMenu = e.url.includes('register') || e.url.includes('login');
        this.stopNavigate = e.url.includes('register');
        this.mainClass = e.url.includes('register') || e.url.includes('login') ? 'account-container' : 'container';
      }
    });

    //Token
    if (this.cookieService.get('token') == '' && !this.stopNavigate) {
      this.router.navigate(['/job-offers']);
    }

    //Language
    this.translate.addLangs(['pl', 'en']);

    if (this.cookieService.get('lang') == '') {
      this.cookieService.set('lang', 'pl');
    }

    this.translate.setDefaultLang(this.cookieService.get('lang'));
    this.language = this.cookieService.get('lang');

    //GetUserRoles
    if (!this.hideMenu) {
      this.subscriptions.push(
        this.rolesService.GetUserRoles().subscribe((roles) => {
          this.IsAdmin = roles.IsAdmin;
          this.IsSupport = roles.IsSupport;
          this.IsRecruiter = roles.IsRecruiter;
          this.IsUser = roles.IsUser;
        })
      );
    }
  }

  public ToggleMobileMenu = () => (this.IsMobileMenuActive = !this.IsMobileMenuActive);

  public GoToUser = () => {
    if (this.cookieService.get('token') == '') {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/user']);
    }
  };

  public ChangeLanguage = (language: string) => {
    this.language = language;
    this.translate.setDefaultLang(this.language);
    this.cookieService.set('lang', language);
  };

  public LogOut = () => {
    this.cookieService.set('token', '');
    window.location.reload();
    this.router.navigate(['job-offers']);
  };
}
