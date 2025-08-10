import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as UserActions from './user-page-state.actions';
import { UserService } from 'src/app/services/user.service';
import { APIErrorHandler } from 'src/app/error-handlers/api-error-handler';
import { CompaniesService } from 'src/app/services/companies.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private userService: UserService,
    private errorHandler: APIErrorHandler,
    private companiesService: CompaniesService,
    private snackbarService: SnackBarService
  ) {}

  loadUser = createEffect(() => {
    return this.actions.pipe(
      ofType(UserActions.loadUser),
      switchMap(() => {
        return this.userService.GetUser().pipe(
          map((result) => UserActions.loadUserSuccess({ User: result })),
          catchError((error) => of(UserActions.loadUserError({ error: this.errorHandler.handleAPIError(error) })))
        );
      })
    );
  });

  loadUserByAdmin = createEffect(() => {
    return this.actions.pipe(
      ofType(UserActions.loadUserByAdmin),
      switchMap((params) => {
        return this.userService.GetUserByAdmin(params.ugid).pipe(
          map((result) => UserActions.loadUserByAdminSuccess({ User: result })),
          catchError((error) =>
            of(UserActions.loadUserByAdminError({ error: this.errorHandler.handleAPIError(error) }))
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
          catchError((error) => of(UserActions.loadCompaniesError({ error: this.errorHandler.handleAPIError(error) })))
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
            this.snackbarService.success('Błąd', 'Użytkownik nie został zapisany!');
            return of(UserActions.saveUserError({ error: this.errorHandler.handleAPIError(error) }));
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
            this.snackbarService.success('Błąd', 'Użytkownik nie został zapisany!');
            return of(UserActions.saveUserByAdminError({ error: this.errorHandler.handleAPIError(error) }));
          })
        );
      })
    );
  });
}
