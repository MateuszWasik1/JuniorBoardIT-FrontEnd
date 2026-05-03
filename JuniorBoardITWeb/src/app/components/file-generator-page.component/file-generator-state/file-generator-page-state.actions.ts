import { createAction, props } from '@ngrx/store';

import { CompaniesModel as UserCompaniesModel } from '../../user-page.component/user-page.models';

// export const loadNumberOfRecruiterPublishedOfferts = createAction(
//   '[Stats Page] Load Number Of Recruiter Published Offerts'
// );
//ToDo change to actual action

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

export const changeCGIDFilter = createAction('[Stats Page] Change CGID Filter', props<{ CGID: string }>());

export const cleanState = createAction('[Stats Page] Clean State');
