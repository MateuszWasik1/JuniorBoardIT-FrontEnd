import { createAction, props } from '@ngrx/store';

export const loadUsers = createAction('[Users Page] Load Users');
export const loadUsersSuccess = createAction('[Users Page] Load Users Success', props<{ Users: any }>());
export const loadUsersError = createAction('[Users Page] Load Users Error', props<{ error: string }>());

export const deleteUser = createAction('[Users Page] Delete User', props<{ ugid: string }>());
export const deleteUserSuccess = createAction('[Users Page] Delete User Success', props<{ ugid: string }>());
export const deleteUserError = createAction('[Users Page] Delete User Error', props<{ error: string }>());

export const changeUserRoleFilterValue = createAction(
  '[Users Page] Change User Filter Value',
  props<{ userRole: number }>()
);

export const changeHasCompanyFilterValue = createAction(
  '[Users Page] Change Has Company Filter Value',
  props<{ hasCompany: boolean }>()
);

export const changeNameFilterValue = createAction('[Users Page] Change Name Filter Value', props<{ name: string }>());

export const updatePaginationData = createAction(
  '[Users Page] Update Pagination Data',
  props<{ PaginationData: any }>()
);

export const cleanState = createAction('[Users Page] Clean State');
