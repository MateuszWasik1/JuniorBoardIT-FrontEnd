import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { AppState } from 'src/app/app.state';
import { APIErrorHandler } from 'src/app/error-handlers/api-error-handler';
import { ReportsService } from 'src/app/services/reports.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

import * as ReportsActions from './reports-page-state.actions';
import { selectFilters } from './reports-page-state.selectors';

@Injectable()
export class ReportsEffects {
  public store = inject(Store<AppState>);
  private actions = inject(Actions);
  private reportsService = inject(ReportsService);
  private errorHandler = inject(APIErrorHandler);
  private snackbarService = inject(SnackBarService);

  loadReport = createEffect(() => {
    return this.actions.pipe(
      ofType(ReportsActions.loadReport),
      switchMap((params) => {
        return this.reportsService.GetReport(params.RGID).pipe(
          map((result) =>
            ReportsActions.loadReportSuccess({
              ReportModel: result.ReportModel,
              JobOfferModel: result.JobOfferModel,
              CompanyModel: result.CompanyModel
            })
          ),
          catchError((error) => of(ReportsActions.loadReportError({ error: this.errorHandler.handleAPIError(error) })))
        );
      })
    );
  });

  loadReports = createEffect(() => {
    return this.actions.pipe(
      ofType(ReportsActions.loadReports),
      withLatestFrom(this.store.select(selectFilters)),
      switchMap((params) => {
        return this.reportsService
          .GetReports(params[1].Skip, params[1].Take, params[1].ReportType, params[1].Message)
          .pipe(
            map((result) => ReportsActions.loadReportsSuccess({ Reports: result })),
            catchError((error) =>
              of(ReportsActions.loadReportsError({ error: this.errorHandler.handleAPIError(error) }))
            )
          );
      })
    );
  });

  saveReport = createEffect(() => {
    return this.actions.pipe(
      ofType(ReportsActions.saveReport),
      switchMap((params) => {
        return this.reportsService.SaveReport(params.Report).pipe(
          map(() => {
            this.snackbarService.success('Sukces', 'Raport został pomyślnie zapisany!');
            return ReportsActions.saveReportSuccess();
          }),
          catchError((error) => {
            this.snackbarService.error('Błąd', 'Raport nie został zapisany!');
            return of(ReportsActions.saveReportError({ error: this.errorHandler.handleAPIError(error) }));
          })
        );
      })
    );
  });

  updateReport = createEffect(() => {
    return this.actions.pipe(
      ofType(ReportsActions.changeReportStatus),
      switchMap((params) => {
        const model = {
          RGID: params.RGID,
          Status: params.RStatus
        };
        return this.reportsService.ChangeReportStatus(model).pipe(
          map(() => {
            this.snackbarService.success('Sukces', 'Raport został pomyślnie nadpisany!');
            return ReportsActions.changeReportStatusSuccess({ RStatus: params.RStatus });
          }),
          catchError((error) => {
            this.snackbarService.error('Błąd', 'Raport nie został nadpisany!');
            return of(ReportsActions.changeReportStatusError({ error: this.errorHandler.handleAPIError(error) }));
          })
        );
      })
    );
  });
}
