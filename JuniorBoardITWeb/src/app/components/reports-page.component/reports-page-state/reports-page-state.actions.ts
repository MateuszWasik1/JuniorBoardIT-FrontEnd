import { createAction, props } from '@ngrx/store';

import { ReportsStatusEnum } from 'src/app/enums/Reports/ReportsStatusEnum';
import { ReportsTypeEnum } from 'src/app/enums/Reports/ReportsTypeEnum';
import { PaginationDataModel } from 'src/app/models/general-models';

import { CompanyModel, JobOfferModel } from '../../job-offers-page.component/job-offers-page.models';
import { AddReportModel, ReportModel, ReportsListModel } from '../reports-page.models';

export const loadReport = createAction('[Reports Page] Load Report', props<{ RGID: string }>());
export const loadReportSuccess = createAction(
  '[Reports Page] Load Report Success',
  props<{ ReportModel: ReportModel; JobOfferModel: JobOfferModel; CompanyModel: CompanyModel }>()
);
export const loadReportError = createAction('[Reports Page] Load Report Error', props<{ Error: string }>());

export const loadReports = createAction('[Reports Page] Load Reports');
export const loadReportsSuccess = createAction(
  '[Reports Page] Load Reports Success',
  props<{ Reports: ReportsListModel }>()
);
export const loadReportsError = createAction('[Reports Page] Load Reports Error', props<{ Error: string }>());

export const saveReport = createAction('[Reports Page] Save Report', props<{ Report: AddReportModel }>());
export const saveReportSuccess = createAction('Reports Page] Save Report Success');
export const saveReportError = createAction('[Reports Page] Save Report Error', props<{ Error: string }>());

export const changeReportStatus = createAction(
  '[Reports Page] Change Report Status',
  props<{ RGID: string; RStatus: ReportsStatusEnum }>()
);
export const changeReportStatusSuccess = createAction(
  '[Reports Page] Change Report Status Success',
  props<{ RStatus: ReportsStatusEnum }>()
);
export const changeReportStatusError = createAction(
  '[Reports Page] Change Report Status Error',
  props<{ Error: string }>()
);

export const ChangeReportTypeFilterValue = createAction(
  '[Reports Page] Change Report Type Filter Value',
  props<{ ReportType: ReportsTypeEnum }>()
);

export const changeMessageFilterValue = createAction(
  '[Reports Page] Change Message Filter Value',
  props<{ Message: string }>()
);

export const updatePaginationDataReports = createAction(
  '[Reports Page] Update Pagination Data Reports',
  props<{ PaginationData: PaginationDataModel }>()
);

export const cleanState = createAction('[Reports Page] Clean State');
