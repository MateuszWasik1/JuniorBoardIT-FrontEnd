import { createAction, props } from '@ngrx/store';

import { PaginationDataModel } from 'src/app/models/general-models';

import { CompaniesModel, CompanyModel } from '../companies-page.models';

export const loadCompany = createAction('[Companies Page] Load Company', props<{ CGID: string }>());
export const loadCompanySuccess = createAction(
  '[Companies Page] Load Company Success',
  props<{ Company: CompanyModel }>()
);
export const loadCompanyError = createAction('[Companies Page] Load Company Error', props<{ Error: string }>());

export const loadCompanies = createAction('[Companies Page] Load Companies');
export const loadCompaniesSuccess = createAction(
  '[Companies Page] Load Companies Success',
  props<{ Companies: CompaniesModel }>()
);
export const loadCompaniesError = createAction('[Companies Page] Load Companies Error', props<{ Error: string }>());

export const addCompany = createAction('[Companies Page] Add Company', props<{ Company: CompanyModel }>());
export const addCompanySuccess = createAction('Companies Page] Add Company Success');
export const addCompanyError = createAction('[Companies Page] Add Company Error', props<{ Error: string }>());

export const updateCompany = createAction('[Companies Page] Update Company', props<{ Company: CompanyModel }>());
export const updateCompanySuccess = createAction('Companies Page] Update Company Success');
export const updateCompanyError = createAction('[Companies Page] Update Company Error', props<{ Error: string }>());

export const deleteCompany = createAction('[Companies Page] Delete Company', props<{ CGID: string }>());
export const deleteCompanySuccess = createAction('Companies Page] Delete Company Success', props<{ CGID: string }>());
export const deleteCompanyError = createAction('[Companies Page] Delete Company Error', props<{ Error: string }>());

export const changeNameFilterValue = createAction(
  '[Companies Page] Change Name Filter Value',
  props<{ Name: string }>()
);

export const updatePaginationData = createAction(
  '[Companies Page] Update Pagination Data',
  props<{ PaginationData: PaginationDataModel }>()
);

export const cleanState = createAction('[Companies Page] Clean State');
