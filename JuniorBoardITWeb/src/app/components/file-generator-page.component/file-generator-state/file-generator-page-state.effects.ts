import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { AppState } from 'src/app/app.state';
import { APIErrorHandler } from 'src/app/error-handlers/api-error-handler';
import { CompaniesService } from 'src/app/services/companies.service';
import * as FileGeneratorActions from './file-generator-page-state.actions';
import { selectFilters } from './file-generator-page-state.selectors';
import { FileGeneratorService } from 'src/app/services/file-generator.service';

@Injectable()
export class FileGeneratorEffects {
  private actions = inject(Actions);
  private store = inject(Store<AppState>);
  private errorHandler = inject(APIErrorHandler);
  private fileGeneratorService = inject(FileGeneratorService);
  private companiesService = inject(CompaniesService);

  downloadApplicationsFile = createEffect(() => {
    return this.actions.pipe(
      ofType(FileGeneratorActions.downloadApplicationsFile),
      withLatestFrom(this.store.select(selectFilters)),
      switchMap((params) => {
        return this.fileGeneratorService.DownloadApplicationsFile(params[1].StartDate, params[1].EndDate).pipe(
          map(() => FileGeneratorActions.loadFileSuccess()),
          catchError((error) =>
            of(FileGeneratorActions.loadFileError({ Error: this.errorHandler.handleAPIError(error) }))
          )
        );
      })
    );
  });

  loadComapnies = createEffect(() => {
    return this.actions.pipe(
      ofType(FileGeneratorActions.loadCompanies),
      switchMap(() => {
        return this.companiesService.GetCompaniesForUser().pipe(
          map((result) => FileGeneratorActions.loadCompaniesSuccess({ Companies: result })),
          catchError((error) =>
            of(FileGeneratorActions.loadCompaniesError({ Error: this.errorHandler.handleAPIError(error) }))
          )
        );
      })
    );
  });
}
