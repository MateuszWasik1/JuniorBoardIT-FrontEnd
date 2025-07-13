import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as JobOffersActions from './job-offers-page-state.actions';
import { JobOffersService } from 'src/app/services/job-offers.service';
import { selectFilters } from './job-offers-page-state.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { APIErrorHandler } from 'src/app/error-handlers/api-error-handler';
import { Router } from '@angular/router';

@Injectable()
export class JobOffersEffects {
  constructor(
    private actions: Actions,
    private router: Router,
    private jobOffersService: JobOffersService,
    public store: Store<AppState>,
    private errorHandler: APIErrorHandler
  ) {}

  loadJobOffer = createEffect(() => {
    return this.actions.pipe(
      ofType(JobOffersActions.loadJobOffer),
      switchMap((params) => {
        return this.jobOffersService.GetJobOffer(params.JOGID).pipe(
          map((result) => JobOffersActions.loadJobOfferSuccess({ JobOffer: result })),
          catchError((error) =>
            of(JobOffersActions.loadJobOfferError({ error: this.errorHandler.handleAPIError(error) }))
          )
        );
      })
    );
  });

  loadJobOffers = createEffect(() => {
    return this.actions.pipe(
      ofType(JobOffersActions.loadJobOffers),
      withLatestFrom(this.store.select(selectFilters)),
      switchMap((params) => {
        return this.jobOffersService.GetAllJobOffers(params[1].Skip, params[1].Take).pipe(
          map((result) => JobOffersActions.loadJobOffersSuccess({ JobOffers: result })),
          catchError((error) =>
            of(JobOffersActions.loadJobOffersError({ error: this.errorHandler.handleAPIError(error) }))
          )
        );
      })
    );
  });

  addJobOffer = createEffect(() => {
    return this.actions.pipe(
      ofType(JobOffersActions.addJobOffer),
      switchMap((params) => {
        return this.jobOffersService.AddJobOffer(params.JobOffer).pipe(
          map(() => JobOffersActions.addJobOfferSuccess()),
          tap(() => this.router.navigate(['/job-offers'])),
          catchError((error) =>
            of(JobOffersActions.addJobOfferError({ error: this.errorHandler.handleAPIError(error) }))
          )
        );
      })
    );
  });

  updateJobOffer = createEffect(() => {
    return this.actions.pipe(
      ofType(JobOffersActions.updateJobOffer),
      switchMap((params) => {
        return this.jobOffersService.UpdateJobOffer(params.JobOffer).pipe(
          map(() => JobOffersActions.updateJobOfferSuccess()),
          tap(() => this.router.navigate(['/job-offers'])),
          catchError((error) =>
            of(JobOffersActions.updateJobOfferError({ error: this.errorHandler.handleAPIError(error) }))
          )
        );
      })
    );
  });

  deleteJobOffer = createEffect(() => {
    return this.actions.pipe(
      ofType(JobOffersActions.deleteJobOffer),
      switchMap((params) => {
        return this.jobOffersService.DeleteJobOffer(params.JOGID).pipe(
          map(() => JobOffersActions.deleteJobOfferSuccess({ JOGID: params.JOGID })),
          catchError((error) =>
            of(JobOffersActions.deleteJobOfferError({ error: this.errorHandler.handleAPIError(error) }))
          )
        );
      })
    );
  });
}
