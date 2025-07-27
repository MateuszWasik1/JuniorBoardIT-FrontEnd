import { createAction, props } from '@ngrx/store';

export const loadCompany = createAction('[Companies Page] Load Company', props<{ CGID: any }>());
export const loadCompanySuccess = createAction('[Companies Page] Load Company Success', props<{ Company: any }>());
export const loadCompanyError = createAction('[Companies Page] Load Company Error', props<{ error: any }>());

export const loadCompanies = createAction('[Companies Page] Load Companies');
export const loadCompaniesSuccess = createAction(
  '[Companies Page] Load Companies Success',
  props<{ Companies: any }>()
);
export const loadCompaniesError = createAction('[Companies Page] Load Companies Error', props<{ error: any }>());

export const addCompany = createAction('[Companies Page] Add Company', props<{ Company: any }>());
export const addCompanySuccess = createAction('Companies Page] Add Company Success');
export const addCompanyError = createAction('[Companies Page] Add Company Error', props<{ error: any }>());

export const updateCompany = createAction('[Companies Page] Update Company', props<{ Company: any }>());
export const updateCompanySuccess = createAction('Companies Page] Update Company Success');
export const updateCompanyError = createAction('[Companies Page] Update Company Error', props<{ error: any }>());

export const deleteCompany = createAction('[Companies Page] Delete Company', props<{ CGID: any }>());
export const deleteCompanySuccess = createAction('Companies Page] Delete Company Success', props<{ CGID: any }>());
export const deleteCompanyError = createAction('[Companies Page] Delete Company Error', props<{ error: any }>());

export const updatePaginationData = createAction(
  '[Companies Page] Update Pagination Data',
  props<{ PaginationData: any }>()
);

export const cleanState = createAction('[Companies Page] Clean State');
