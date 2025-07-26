import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as CompaniesActions from './companies-page-state.actions';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { APIErrorHandler } from 'src/app/error-handlers/api-error-handler';
import { CompaniesService } from 'src/app/services/companies.service';
import { selectFilters } from './companies-page-state.selectors';

@Injectable()
export class CompaniesEffects {
  constructor(
    private actions: Actions,
    private router: Router,
    private store: Store<AppState>,
    private companiesService: CompaniesService,
    private errorHandler: APIErrorHandler
  ) {}

  loadCompanies = createEffect(() => {
    return this.actions.pipe(
      ofType(CompaniesActions.loadCompanies),
      withLatestFrom(this.store.select(selectFilters)),
      switchMap((params) => {
        return this.companiesService.GetCompanies(params[1].Skip, params[1].Take).pipe(
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
          map(() => CompaniesActions.addCompanySuccess()),
          tap(() => this.router.navigate(['/companies'])),
          catchError((error) =>
            of(CompaniesActions.addCompanyError({ error: this.errorHandler.handleAPIError(error) }))
          )
        );
      })
    );
  });

  updateCompany = createEffect(() => {
    return this.actions.pipe(
      ofType(CompaniesActions.updateCompany),
      switchMap((params) => {
        return this.companiesService.UpdateCompany(params.Company).pipe(
          map(() => CompaniesActions.updateCompanySuccess()),
          tap(() => this.router.navigate(['/companies'])),
          catchError((error) =>
            of(CompaniesActions.updateCompanyError({ error: this.errorHandler.handleAPIError(error) }))
          )
        );
      })
    );
  });

  deleteCompany = createEffect(() => {
    return this.actions.pipe(
      ofType(CompaniesActions.deleteCompany),
      switchMap((params) => {
        return this.companiesService.DeleteCompany(params.CGID).pipe(
          map(() => CompaniesActions.deleteCompanySuccess({ CGID: params.CGID })),
          catchError((error) =>
            of(CompaniesActions.deleteCompanyError({ error: this.errorHandler.handleAPIError(error) }))
          )
        );
      })
    );
  });
}
