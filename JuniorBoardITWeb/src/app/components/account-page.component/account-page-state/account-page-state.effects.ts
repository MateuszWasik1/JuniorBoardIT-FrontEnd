import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { APIErrorHandler } from 'src/app/error-handlers/api-error-handler';
import { AccountsService } from 'src/app/services/accounts.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

import * as AccountActions from './account-page-state.actions';

@Injectable()
export class AccountEffects {
  private actions = inject(Actions);
  private accountService = inject(AccountsService);
  private cookieService = inject(CookieService);
  private router = inject(Router);
  private errorHandler = inject(APIErrorHandler);
  private snackbarService = inject(SnackBarService);

  RegisterUser = createEffect(() => {
    return this.actions.pipe(
      ofType(AccountActions.RegisterUser),
      switchMap((params) => {
        return this.accountService.Register(params.user).pipe(
          map(() => {
            this.snackbarService.success('Sukces', 'Rejestracja przebiegła pomyślnie!');
            return AccountActions.RegisterUserSuccess();
          }),
          tap(() => this.router.navigate(['/login'])),
          catchError((error) => {
            this.snackbarService.error('Błąd', 'Podczas rejestracji wystąpił błąd!');
            return of(AccountActions.RegisterUserError({ error: this.errorHandler.handleAPIError(error) }));
          })
        );
      })
    );
  });

  Login = createEffect(() => {
    return this.actions.pipe(
      ofType(AccountActions.Login),
      switchMap((params) => {
        return this.accountService.Login(params.user).pipe(
          map((result) => AccountActions.LoginSuccess({ token: result.toString() })),
          tap((result) => this.cookieService.set('token', result.token)),
          tap(() => this.router.navigate(['/job-offers'])),
          tap(() => setTimeout(() => window.location.reload(), 500)),
          catchError((error) => of(AccountActions.LoginError({ error: this.errorHandler.handleAPIError(error) })))
        );
      })
    );
  });
}
