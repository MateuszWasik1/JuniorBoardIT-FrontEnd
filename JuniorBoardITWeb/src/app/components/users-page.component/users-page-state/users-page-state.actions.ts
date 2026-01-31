import { createAction, props } from '@ngrx/store';

import { PaginationDataModel } from 'src/app/models/general-models';

import { UsersModel } from '../users-page.models';

export const loadUsers = createAction('[Users Page] Load Users');
export const loadUsersSuccess = createAction('[Users Page] Load Users Success', props<{ Users: UsersModel }>());
export const loadUsersError = createAction('[Users Page] Load Users Error', props<{ Error: string }>());

export const deleteUser = createAction('[Users Page] Delete User', props<{ UGID: string }>());
export const deleteUserSuccess = createAction('[Users Page] Delete User Success', props<{ UGID: string }>());
export const deleteUserError = createAction('[Users Page] Delete User Error', props<{ Error: string }>());

export const changeUserRoleFilterValue = createAction(
  '[Users Page] Change User Filter Value',
  props<{ UserRole: number }>()
);

export const changeHasCompanyFilterValue = createAction(
  '[Users Page] Change Has Company Filter Value',
  props<{ HasCompany: boolean }>()
);

export const changeNameFilterValue = createAction('[Users Page] Change Name Filter Value', props<{ Name: string }>());

export const updatePaginationData = createAction(
  '[Users Page] Update Pagination Data',
  props<{ PaginationData: PaginationDataModel }>()
);

export const cleanState = createAction('[Users Page] Clean State');
