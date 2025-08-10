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
import { SnackBarService } from 'src/app/services/snackbar.service';

@Injectable()
export class JobOffersEffects {
  constructor(
    public store: Store<AppState>,
    private actions: Actions,
    private router: Router,
    private jobOffersService: JobOffersService,
    private errorHandler: APIErrorHandler,
    private snackbarService: SnackBarService
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
        return this.jobOffersService
          .GetAllJobOffers(params[1].Skip, params[1].Take, params[1].Education, params[1].Favorite)
          .pipe(
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
          map(() => {
            this.snackbarService.success('Sukces', 'Oferta pracy została pomyślnie dodana!');
            return JobOffersActions.addJobOfferSuccess();
          }),
          tap(() => this.router.navigate(['/job-offers'])),
          catchError((error) => {
            this.snackbarService.success('Błąd', 'Oferta pracy nie została dodana!');
            return of(JobOffersActions.addJobOfferError({ error: this.errorHandler.handleAPIError(error) }));
          })
        );
      })
    );
  });

  updateJobOffer = createEffect(() => {
    return this.actions.pipe(
      ofType(JobOffersActions.updateJobOffer),
      switchMap((params) => {
        return this.jobOffersService.UpdateJobOffer(params.JobOffer).pipe(
          map(() => {
            this.snackbarService.success('Sukces', 'Oferta pracy została pomyślnie nadpisana!');
            return JobOffersActions.updateJobOfferSuccess();
          }),
          tap(() => this.router.navigate(['/job-offers'])),
          catchError((error) => {
            this.snackbarService.success('Błąd', 'Oferta pracy nie została nadpisana!');
            return of(JobOffersActions.updateJobOfferError({ error: this.errorHandler.handleAPIError(error) }));
          })
        );
      })
    );
  });

  deleteJobOffer = createEffect(() => {
    return this.actions.pipe(
      ofType(JobOffersActions.deleteJobOffer),
      switchMap((params) => {
        return this.jobOffersService.DeleteJobOffer(params.JOGID).pipe(
          map(() => {
            this.snackbarService.success('Sukces', 'Oferta pracy została pomyślnie usunięta!');
            return JobOffersActions.deleteJobOfferSuccess({ JOGID: params.JOGID });
          }),
          catchError((error) => {
            this.snackbarService.success('Błąd', 'Oferta pracy nie została usunięta!');
            return of(JobOffersActions.deleteJobOfferError({ error: this.errorHandler.handleAPIError(error) }));
          })
        );
      })
    );
  });
}
