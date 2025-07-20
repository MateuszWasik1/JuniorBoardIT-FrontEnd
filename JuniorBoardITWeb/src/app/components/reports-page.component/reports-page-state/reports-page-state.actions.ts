import { createAction, props } from '@ngrx/store';

export const loadReport = createAction('[Reports Page] Load Report', props<{ RGID: any }>());
export const loadReportSuccess = createAction('[Reports Page] Load Report Success', props<{ Report: any }>());
export const loadReportError = createAction('[Reports Page] Load Report Error', props<{ error: any }>());

export const loadReports = createAction('[Reports Page] Load Reports');
export const loadReportsSuccess = createAction('[Reports Page] Load Reports Success', props<{ Reports: any }>());
export const loadReportsError = createAction('[Reports Page] Load Reports Error', props<{ error: any }>());

export const addReport = createAction('[Reports Page] Add Report', props<{ Report: any }>());
export const addReportSuccess = createAction('Reports Page] Add Report Success');
export const addReportError = createAction('[Reports Page] Add Report Error', props<{ error: any }>());

export const updateReport = createAction('[Reports Page] Update Report', props<{ Report: any }>());
export const updateReportSuccess = createAction('Reports Page] Update Report Success');
export const updateReportError = createAction('[Reports Page] Update Report Error', props<{ error: any }>());

export const deleteReport = createAction('[Reports Page] Delete Report', props<{ RGID: any }>());
export const deleteReportSuccess = createAction('Reports Page] Delete Report Success', props<{ RGID: any }>());
export const deleteReportError = createAction('[Reports Page] Delete Report Error', props<{ error: any }>());

export const updatePaginationDataReports = createAction(
  '[Reports Page] Update Pagination Data Reports',
  props<{ PaginationData: any }>()
);

export const cleanState = createAction('[Reports Page] Clean State');
