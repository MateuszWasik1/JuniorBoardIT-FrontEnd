import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as ReportsActions from './reports-page-state.actions';
import { ReportsService } from 'src/app/services/reports.service';
import { selectFilters } from './reports-page-state.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { APIErrorHandler } from 'src/app/error-handlers/api-error-handler';

@Injectable()
export class ReportsEffects {
  constructor(
    public store: Store<AppState>,
    private actions: Actions,
    private reportsService: ReportsService,
    private errorHandler: APIErrorHandler
  ) {}

  loadReport = createEffect(() => {
    return this.actions.pipe(
      ofType(ReportsActions.loadReport),
      switchMap((params) => {
        return this.reportsService.GetReport(params.RGID).pipe(
          map((result) =>
            ReportsActions.loadReportSuccess({ ReportModel: result.ReportModel, JobOfferModel: result.JobOfferModel })
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
        return this.reportsService.GetReports(params[1].Skip, params[1].Take).pipe(
          map((result) => ReportsActions.loadReportsSuccess({ Reports: result })),
          catchError((error) => of(ReportsActions.loadReportsError({ error: this.errorHandler.handleAPIError(error) })))
        );
      })
    );
  });

  saveReport = createEffect(() => {
    return this.actions.pipe(
      ofType(ReportsActions.saveReport),
      switchMap((params) => {
        return this.reportsService.SaveReport(params.Report).pipe(
          map(() => ReportsActions.saveReportSuccess()),
          catchError((error) => of(ReportsActions.saveReportError({ error: this.errorHandler.handleAPIError(error) })))
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
          map(() => ReportsActions.changeReportStatusSuccess()),
          catchError((error) =>
            of(ReportsActions.changeReportStatusError({ error: this.errorHandler.handleAPIError(error) }))
          )
        );
      })
    );
  });
}
