import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { APIErrorHandler } from 'src/app/error-handlers/api-error-handler';
import { CompaniesService } from 'src/app/services/companies.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

import * as UserActions from './user-page-state.actions';

@Injectable()
export class UserEffects {
  private actions = inject(Actions);
  private userService = inject(UserService);
  private errorHandler = inject(APIErrorHandler);
  private companiesService = inject(CompaniesService);
  private snackbarService = inject(SnackBarService);

  loadUser = createEffect(() => {
    return this.actions.pipe(
      ofType(UserActions.loadUser),
      switchMap(() => {
        return this.userService.GetUser().pipe(
          map((result) => UserActions.loadUserSuccess({ User: result })),
          catchError((error) => of(UserActions.loadUserError({ Error: this.errorHandler.handleAPIError(error) })))
        );
      })
    );
  });

  loadUserByAdmin = createEffect(() => {
    return this.actions.pipe(
      ofType(UserActions.loadUserByAdmin),
      switchMap((params) => {
        return this.userService.GetUserByAdmin(params.UGID).pipe(
          map((result) => UserActions.loadUserByAdminSuccess({ User: result })),
          catchError((error) =>
            of(UserActions.loadUserByAdminError({ Error: this.errorHandler.handleAPIError(error) }))
          )
        );
      })
    );
  });

  loadComapnies = createEffect(() => {
    return this.actions.pipe(
      ofType(UserActions.loadCompanies),
      switchMap(() => {
        return this.companiesService.GetCompaniesForUser().pipe(
          map((result) => UserActions.loadCompaniesSuccess({ Companies: result })),
          catchError((error) => of(UserActions.loadCompaniesError({ Error: this.errorHandler.handleAPIError(error) })))
        );
      })
    );
  });

  saveUser = createEffect(() => {
    return this.actions.pipe(
      ofType(UserActions.saveUser),
      switchMap((params) => {
        return this.userService.SaveUser(params.User).pipe(
          map(() => {
            this.snackbarService.success('Sukces', 'Użytkownik został pomyślnie zapisany!');
            return UserActions.saveUserSuccess();
          }),
          catchError((error) => {
            this.snackbarService.error('Błąd', 'Użytkownik nie został zapisany!');
            return of(UserActions.saveUserError({ Error: this.errorHandler.handleAPIError(error) }));
          })
        );
      })
    );
  });

  saveUserByAdmin = createEffect(() => {
    return this.actions.pipe(
      ofType(UserActions.saveUserByAdmin),
      switchMap((params) => {
        return this.userService.SaveUserByAdmin(params.User).pipe(
          map(() => {
            this.snackbarService.success('Sukces', 'Użytkownik został pomyślnie zapisany!');
            return UserActions.saveUserByAdminSuccess();
          }),
          catchError((error) => {
            this.snackbarService.error('Błąd', 'Użytkownik nie został zapisany!');
            return of(UserActions.saveUserByAdminError({ Error: this.errorHandler.handleAPIError(error) }));
          })
        );
      })
    );
  });
}
