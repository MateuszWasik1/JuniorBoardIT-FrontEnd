import { createAction, props } from '@ngrx/store';

export const loadUser = createAction('[User Page] Load User');
export const loadUserSuccess = createAction('[User Page] Load User Success', props<{ User: any }>());
export const loadUserError = createAction('[User Page] Load User Error', props<{ error: string }>());

export const saveUser = createAction('[User Page] Save User', props<{ User: any }>());
export const saveUserSuccess = createAction('[User Page] Save User Success');
export const saveUserError = createAction('[User Page] Save User Error', props<{ error: string }>());

export const loadUserByAdmin = createAction('[User Page] Load User By Admin', props<{ ugid: any }>());
export const loadUserByAdminSuccess = createAction('[User Page] Load User ByA dmin  Success', props<{ User: any }>());
export const loadUserByAdminError = createAction('[User Page] Load User By Admin  Error', props<{ error: string }>());

export const saveUserByAdmin = createAction('[User Page] Save User By Admin', props<{ User: any }>());
export const saveUserByAdminSuccess = createAction('[User Page] Save User By Admin Success');
export const saveUserByAdminError = createAction('[User Page] Save User By Admin Error', props<{ error: string }>());

export const loadCompanies = createAction('[User Page] Load Companies');
export const loadCompaniesSuccess = createAction('[User Page] Load Companies Success', props<{ Companies: any }>());
export const loadCompaniesError = createAction('[User Page] Load Companies Error', props<{ error: string }>());

export const cleanState = createAction('[User Page] Clean State');
