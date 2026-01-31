import { createAction, props } from '@ngrx/store';

import { CompaniesModel, UserModel } from '../user-page.models';

export const loadUser = createAction('[User Page] Load User');
export const loadUserSuccess = createAction('[User Page] Load User Success', props<{ User: UserModel }>());
export const loadUserError = createAction('[User Page] Load User Error', props<{ Error: string }>());

export const saveUser = createAction('[User Page] Save User', props<{ User: UserModel }>());
export const saveUserSuccess = createAction('[User Page] Save User Success');
export const saveUserError = createAction('[User Page] Save User Error', props<{ Error: string }>());

export const loadUserByAdmin = createAction('[User Page] Load User By Admin', props<{ UGID: string }>());
export const loadUserByAdminSuccess = createAction(
  '[User Page] Load User ByA dmin  Success',
  props<{ User: UserModel }>()
);
export const loadUserByAdminError = createAction('[User Page] Load User By Admin  Error', props<{ Error: string }>());

export const saveUserByAdmin = createAction('[User Page] Save User By Admin', props<{ User: UserModel }>());
export const saveUserByAdminSuccess = createAction('[User Page] Save User By Admin Success');
export const saveUserByAdminError = createAction('[User Page] Save User By Admin Error', props<{ Error: string }>());

export const loadCompanies = createAction('[User Page] Load Companies');
export const loadCompaniesSuccess = createAction(
  '[User Page] Load Companies Success',
  props<{ Companies: CompaniesModel }>()
);
export const loadCompaniesError = createAction('[User Page] Load Companies Error', props<{ Error: string }>());

export const cleanState = createAction('[User Page] Clean State');
