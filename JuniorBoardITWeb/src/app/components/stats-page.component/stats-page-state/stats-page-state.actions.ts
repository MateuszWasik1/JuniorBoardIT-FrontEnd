import { createAction, props } from '@ngrx/store';

import { StatsChartTypeEnum } from 'src/app/enums/Stats/StatsChartTypeEnum';
import { StatsTypeEnum } from 'src/app/enums/Stats/StatsTypeEnum';

import { CompaniesModel as UserCompaniesModel } from '../../user-page.component/user-page.models';

export const loadNumberOfRecruiterPublishedOfferts = createAction(
  '[Stats Page] Load Number Of Recruiter Published Offerts'
);
export const loadNumberOfCompanyPublishedOfferts = createAction(
  '[Stats Page] Load Number Of Company Published Offerts'
);
export const loadNumberOfCompaniesPublishedOfferts = createAction(
  '[Stats Page] Load Number Of Companies Published Offerts'
);
export const loadNumberOfActiveCompaniesOfferts = createAction('[Stats Page] Load Number Of Active Companies Offerts');
export const loadNumberOfCompanyRecruiters = createAction('[Stats Page] Load Number Of Company Recruiters');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadStatsSuccess = createAction('[Stats Page] Load Stats Success', props<{ Result: any }>());
export const loadStatsError = createAction('[Stats Page] Load Stats Error', props<{ Error: string }>());

export const loadCompanies = createAction('[Stats Page] Load Companies');
export const loadCompaniesSuccess = createAction(
  '[Stats Page] Load Companies Success',
  props<{ Companies: UserCompaniesModel }>()
);
export const loadCompaniesError = createAction('[Stats Page] Load Companies Error', props<{ Error: string }>());

export const changeStartDateFilter = createAction(
  '[Stats Page] Change Start Date Filter',
  props<{ StartDate: Date }>()
);
export const changeEndDateFilter = createAction('[Stats Page] Change End Date Filter', props<{ EndDate: Date }>());
export const changeDateFilter = createAction('[Stats Page] Change End Date Filter', props<{ Date: Date }>());
export const changeDataTypeFilter = createAction(
  '[Stats Page] Change Data Type Filter',
  props<{ DataType: StatsTypeEnum }>()
);
export const changeChartTypeFilter = createAction(
  '[Stats Page] Change Chart Type Filter',
  props<{ ChartType: StatsChartTypeEnum }>()
);
export const changeCGIDFilter = createAction('[Stats Page] Change CGID Filter', props<{ CGID: string }>());

export const cleanState = createAction('[Stats Page] Clean State');
