import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { AppState } from 'src/app/app.state';
import { APIErrorHandler } from 'src/app/error-handlers/api-error-handler';
import { BugsService } from 'src/app/services/bugs.service';
import { RolesService } from 'src/app/services/roles.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

import * as BugsActions from './bugs-page-state.actions';
import { selectFilters, selectFiltersBugNotes } from './bugs-page-state.selectors';

@Injectable()
export class BugsEffects {
  private actions = inject(Actions);
  private router = inject(Router);
  private store = inject(Store<AppState>);
  private bugsService = inject(BugsService);
  private rolesService = inject(RolesService);
  private errorHandler = inject(APIErrorHandler);
  private snackbarService = inject(SnackBarService);

  loadBugs = createEffect(() => {
    return this.actions.pipe(
      ofType(BugsActions.loadBugs),
      withLatestFrom(this.store.select(selectFilters)),
      switchMap((params) => {
        return this.bugsService.GetBugs(params[1].BugType, params[1].Skip, params[1].Take, params[1].Message).pipe(
          map((result) => BugsActions.loadBugsSuccess({ Bugs: result })),
          catchError((error) => of(BugsActions.loadBugsError({ error: this.errorHandler.handleAPIError(error) })))
        );
      })
    );
  });

  loadBug = createEffect(() => {
    return this.actions.pipe(
      ofType(BugsActions.loadBug),
      switchMap((params) => {
        return this.bugsService.GetBug(params.bgid).pipe(
          map((result) => BugsActions.loadBugSuccess({ Bug: result })),
          catchError((error) => of(BugsActions.loadBugError({ error: this.errorHandler.handleAPIError(error) })))
        );
      })
    );
  });

  loadBugNotes = createEffect(() => {
    return this.actions.pipe(
      ofType(BugsActions.loadBugNotes),
      withLatestFrom(this.store.select(selectFiltersBugNotes)),
      switchMap((params) => {
        return this.bugsService.GetBugNotes(params[0].bgid, params[1].Skip, params[1].Take).pipe(
          map((result) => BugsActions.loadBugNotesSuccess({ BugNotes: result })),
          catchError((error) => of(BugsActions.loadBugNotesError({ error: this.errorHandler.handleAPIError(error) })))
        );
      })
    );
  });

  loadUserRoles = createEffect(() => {
    return this.actions.pipe(
      ofType(BugsActions.loadUserRoles),
      switchMap(() => {
        return this.rolesService.GetUserRoles().pipe(
          map((result) => BugsActions.loadUserRolesSuccess({ UserRoles: result })),
          catchError((error) => of(BugsActions.loadUserRolesError({ error: this.errorHandler.handleAPIError(error) })))
        );
      })
    );
  });

  saveBug = createEffect(() => {
    return this.actions.pipe(
      ofType(BugsActions.saveBug),
      switchMap((params) => {
        return this.bugsService.SaveBug(params.bug).pipe(
          map(() => {
            this.snackbarService.success('Sukces', 'Błąd został pomyślnie dodany!');
            return BugsActions.saveBugSuccess({ bug: params.bug });
          }),
          tap(() => this.router.navigate(['bugs'])),
          catchError((error) => {
            this.snackbarService.error('Błąd', 'Błąd nie został dodany!');
            return of(BugsActions.saveBugError({ error: this.errorHandler.handleAPIError(error) }));
          })
        );
      })
    );
  });

  saveBugNote = createEffect(() => {
    return this.actions.pipe(
      ofType(BugsActions.saveBugNote),
      switchMap((params) => {
        return this.bugsService.SaveBugNote(params.BugNote).pipe(
          map(() => {
            this.snackbarService.success('Sukces', 'Notatka do błędu została pomyślnie dodana!');
            return BugsActions.saveBugNoteSuccess({ BugNote: params.BugNote });
          }),
          catchError((error) => {
            this.snackbarService.error('Błąd', 'Notatka do błędu nie została dodana!');
            return of(BugsActions.saveBugNoteError({ error: this.errorHandler.handleAPIError(error) }));
          })
        );
      })
    );
  });

  changeBugStatus = createEffect(() => {
    return this.actions.pipe(
      ofType(BugsActions.changeBugStatus),
      switchMap((params) => {
        return this.bugsService.ChangeBugStatus(params.model).pipe(
          map(() => {
            this.snackbarService.success('Sukces', 'Status błędu został pomyślnie zmieniony!');
            return BugsActions.changeBugStatusSuccess({ status: params.model.Status });
          }),
          catchError((error) => {
            this.snackbarService.error('Błąd', 'Status błędu nie został zmieniony!');
            return of(BugsActions.changeBugStatusError({ error: this.errorHandler.handleAPIError(error) }));
          })
        );
      })
    );
  });
}
