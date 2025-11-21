import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { AppState } from 'src/app/app.state';
import { APIErrorHandler } from 'src/app/error-handlers/api-error-handler';
import { CompaniesService } from 'src/app/services/companies.service';
import { StatsService } from 'src/app/services/stats.service';

import * as StatsActions from './stats-page-state.actions';
import { selectFilters } from './stats-page-state.selectors';

@Injectable()
export class StatsEffects {
  private actions = inject(Actions);
  private store = inject(Store<AppState>);
  private statsService = inject(StatsService);
  private errorHandler = inject(APIErrorHandler);
  private companiesService = inject(CompaniesService);

  loadNumberOfRecruiterPublishedOfferts = createEffect(() => {
    return this.actions.pipe(
      ofType(StatsActions.loadNumberOfRecruiterPublishedOfferts),
      withLatestFrom(this.store.select(selectFilters)),
      switchMap((params) => {
        return this.statsService.GetNumberOfRecruiterPublishedOfferts(params[1].StartDate, params[1].EndDate).pipe(
          map((result) => StatsActions.loadStatsSuccess({ Result: result })),
          catchError((error) => of(StatsActions.loadStatsError({ error: this.errorHandler.handleAPIError(error) })))
        );
      })
    );
  });

  loadNumberOfCompanyPublishedOfferts = createEffect(() => {
    return this.actions.pipe(
      ofType(StatsActions.loadNumberOfCompanyPublishedOfferts),
      withLatestFrom(this.store.select(selectFilters)),
      switchMap((params) => {
        return this.statsService
          .GetNumberOfCompanyPublishedOfferts(params[1].StartDate, params[1].EndDate, params[1].CGID)
          .pipe(
            map((result) => StatsActions.loadStatsSuccess({ Result: result })),
            catchError((error) => of(StatsActions.loadStatsError({ error: this.errorHandler.handleAPIError(error) })))
          );
      })
    );
  });

  loadNumberOfCompaniesPublishedOfferts = createEffect(() => {
    return this.actions.pipe(
      ofType(StatsActions.loadNumberOfCompaniesPublishedOfferts),
      withLatestFrom(this.store.select(selectFilters)),
      switchMap((params) => {
        return this.statsService.GetNumberOfCompaniesPublishedOfferts(params[1].StartDate, params[1].EndDate).pipe(
          map((result) => StatsActions.loadStatsSuccess({ Result: result })),
          catchError((error) => of(StatsActions.loadStatsError({ error: this.errorHandler.handleAPIError(error) })))
        );
      })
    );
  });

  loadNumberOfActiveCompaniesOfferts = createEffect(() => {
    return this.actions.pipe(
      ofType(StatsActions.loadNumberOfActiveCompaniesOfferts),
      withLatestFrom(this.store.select(selectFilters)),
      switchMap((params) => {
        return this.statsService.GetNumberOfActiveCompaniesOfferts(params[1].Date, params[1].CGID).pipe(
          map((result) => StatsActions.loadStatsSuccess({ Result: result })),
          catchError((error) => of(StatsActions.loadStatsError({ error: this.errorHandler.handleAPIError(error) })))
        );
      })
    );
  });

  loadNumberOfCompanyRecruiters = createEffect(() => {
    return this.actions.pipe(
      ofType(StatsActions.loadNumberOfCompanyRecruiters),
      withLatestFrom(this.store.select(selectFilters)),
      switchMap((params) => {
        return this.statsService.GetNumberOfCompanyRecruiters(params[1].CGID).pipe(
          map((result) => StatsActions.loadStatsSuccess({ Result: result })),
          catchError((error) => of(StatsActions.loadStatsError({ error: this.errorHandler.handleAPIError(error) })))
        );
      })
    );
  });

  loadComapnies = createEffect(() => {
    return this.actions.pipe(
      ofType(StatsActions.loadCompanies),
      switchMap(() => {
        return this.companiesService.GetCompaniesForUser().pipe(
          map((result) => StatsActions.loadCompaniesSuccess({ Companies: result })),
          catchError((error) => of(StatsActions.loadCompaniesError({ error: this.errorHandler.handleAPIError(error) })))
        );
      })
    );
  });
}
