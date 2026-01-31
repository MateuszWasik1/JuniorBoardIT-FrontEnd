import { createReducer, on } from '@ngrx/store';

import * as Actions from './account-page-state.actions';
import { AccountState } from './account-page-state.state';

const initialStateOfAccountPage: AccountState = {
  ErrorMessage: ''
};

export const AccountReducer = createReducer<AccountState>(
  initialStateOfAccountPage,

  on(Actions.LoginSuccess, (state) => {
    return { ...state };
  }),
  on(Actions.LoginError, (state, { Error }) => ({
    ...state,
    ErrorMessage: Error
  })),
  on(Actions.RegisterUserError, (state, { Error }) => ({
    ...state,
    ErrorMessage: Error
  }))
);
