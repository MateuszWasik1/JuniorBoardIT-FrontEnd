import { createAction, props } from '@ngrx/store';
import { ReportsStatusEnum } from 'src/app/enums/Reports/ReportsStatusEnum';
import { ReportsTypeEnum } from 'src/app/enums/Reports/ReportsTypeEnum';

export const loadReport = createAction('[Reports Page] Load Report', props<{ RGID: any }>());
export const loadReportSuccess = createAction(
  '[Reports Page] Load Report Success',
  props<{ ReportModel: any; JobOfferModel: any }>()
);
export const loadReportError = createAction('[Reports Page] Load Report Error', props<{ error: any }>());

export const loadReports = createAction('[Reports Page] Load Reports');
export const loadReportsSuccess = createAction('[Reports Page] Load Reports Success', props<{ Reports: any }>());
export const loadReportsError = createAction('[Reports Page] Load Reports Error', props<{ error: any }>());

export const saveReport = createAction('[Reports Page] Save Report', props<{ Report: any }>());
export const saveReportSuccess = createAction('Reports Page] Save Report Success');
export const saveReportError = createAction('[Reports Page] Save Report Error', props<{ error: any }>());

export const changeReportStatus = createAction(
  '[Reports Page] Change Report Status',
  props<{ RGID: string; RStatus: ReportsStatusEnum }>()
);
export const changeReportStatusSuccess = createAction('Reports Page] Change Report Status Success');
export const changeReportStatusError = createAction(
  '[Reports Page] Change Report Status Error',
  props<{ error: any }>()
);

export const ChangeReportTypeFilterValue = createAction(
  '[JobOffers Page] Change Report Type Filter Value',
  props<{ ReportType: ReportsTypeEnum }>()
);

export const updatePaginationDataReports = createAction(
  '[Reports Page] Update Pagination Data Reports',
  props<{ PaginationData: any }>()
);

export const cleanState = createAction('[Reports Page] Clean State');
