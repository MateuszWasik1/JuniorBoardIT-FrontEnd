import { createAction, props } from '@ngrx/store';

import { LoginUserModel, RegisterUserModel } from '../account-page.models';

export const RegisterUser = createAction('[Account Page] Register User', props<{ User: RegisterUserModel }>());
export const RegisterUserSuccess = createAction('[Account Page] Register User Success');
export const RegisterUserError = createAction('[Account Page] Register User Error', props<{ Error: string }>());

export const Login = createAction('[Account Page] Login', props<{ User: LoginUserModel }>());
export const LoginSuccess = createAction('[Account Page] Login Success', props<{ Token: string }>());
export const LoginError = createAction('[Account Page] Login Error', props<{ Error: string }>());
