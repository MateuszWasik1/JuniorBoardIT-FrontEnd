import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { AppState } from 'src/app/app.state';
import { APIErrorHandler } from 'src/app/error-handlers/api-error-handler';
import { CompaniesService } from 'src/app/services/companies.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

import * as CompaniesActions from './companies-page-state.actions';
import { selectFilters } from './companies-page-state.selectors';

@Injectable()
export class CompaniesEffects {
  private actions = inject(Actions);
  private router = inject(Router);
  private store = inject(Store<AppState>);
  private companiesService = inject(CompaniesService);
  private errorHandler = inject(APIErrorHandler);
  private snackbarService = inject(SnackBarService);

  loadCompanies = createEffect(() => {
    return this.actions.pipe(
      ofType(CompaniesActions.loadCompanies),
      withLatestFrom(this.store.select(selectFilters)),
      switchMap((params) => {
        return this.companiesService.GetCompanies(params[1].Skip, params[1].Take, params[1].Name).pipe(
          map((result) => CompaniesActions.loadCompaniesSuccess({ Companies: result })),
          catchError((error) =>
            of(CompaniesActions.loadCompaniesError({ error: this.errorHandler.handleAPIError(error) }))
          )
        );
      })
    );
  });

  loadCompany = createEffect(() => {
    return this.actions.pipe(
      ofType(CompaniesActions.loadCompany),
      switchMap((params) => {
        return this.companiesService.GetCompany(params.CGID).pipe(
          map((result) => CompaniesActions.loadCompanySuccess({ Company: result })),
          catchError((error) =>
            of(CompaniesActions.loadCompanyError({ error: this.errorHandler.handleAPIError(error) }))
          )
        );
      })
    );
  });

  addCompany = createEffect(() => {
    return this.actions.pipe(
      ofType(CompaniesActions.addCompany),
      switchMap((params) => {
        return this.companiesService.AddCompany(params.Company).pipe(
          map(() => {
            this.snackbarService.success('Sukces', 'Firma została pomyślnie dodana!');
            return CompaniesActions.addCompanySuccess();
          }),
          tap(() => this.router.navigate(['/companies'])),
          catchError((error) => {
            this.snackbarService.error('Błąd', 'Firma nie została dodana!');
            return of(CompaniesActions.addCompanyError({ error: this.errorHandler.handleAPIError(error) }));
          })
        );
      })
    );
  });

  updateCompany = createEffect(() => {
    return this.actions.pipe(
      ofType(CompaniesActions.updateCompany),
      switchMap((params) => {
        return this.companiesService.UpdateCompany(params.Company).pipe(
          map(() => {
            this.snackbarService.success('Sukces', 'Firma została pomyślnie nadpisana!');
            return CompaniesActions.updateCompanySuccess();
          }),
          tap(() => this.router.navigate(['/companies'])),
          catchError((error) => {
            this.snackbarService.error('Błąd', 'Firma nie została nadpisana!');
            return of(CompaniesActions.updateCompanyError({ error: this.errorHandler.handleAPIError(error) }));
          })
        );
      })
    );
  });

  deleteCompany = createEffect(() => {
    return this.actions.pipe(
      ofType(CompaniesActions.deleteCompany),
      switchMap((params) => {
        return this.companiesService.DeleteCompany(params.CGID).pipe(
          map(() => {
            this.snackbarService.success('Sukces', 'Firma została pomyślnie usunięta!');
            return CompaniesActions.deleteCompanySuccess({ CGID: params.CGID });
          }),
          catchError((error) => {
            this.snackbarService.error('Błąd', 'Firma nie została usunięta!');
            return of(CompaniesActions.deleteCompanyError({ error: this.errorHandler.handleAPIError(error) }));
          })
        );
      })
    );
  });
}
