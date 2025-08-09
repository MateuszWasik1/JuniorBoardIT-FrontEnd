import { createAction, props } from '@ngrx/store';

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

export const loadStatsSuccess = createAction('[Stats Page] Load Stats Success', props<{ Result: any }>());
export const loadStatsError = createAction('[Stats Page] Load Stats Error', props<{ error: any }>());

export const changeStartDateFilter = createAction('[Stats Page] Change Start Date Filter', props<{ startDate: any }>());
export const changeEndDateFilter = createAction('[Stats Page] Change End Date Filter', props<{ endDate: any }>());
export const changeDataTypeFilter = createAction('[Stats Page] Change Data Type Filter', props<{ dataType: any }>());
export const changeCategoryFilter = createAction('[Stats Page] Change Category Filter', props<{ category: any }>());

export const cleanState = createAction('[Stats Page] Clean State');
