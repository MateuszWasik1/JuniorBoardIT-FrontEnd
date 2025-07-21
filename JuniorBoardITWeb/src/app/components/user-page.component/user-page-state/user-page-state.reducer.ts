import { createReducer, on } from '@ngrx/store';
import * as Actions from './user-page-state.actions';
import { UserState } from './user-page-state.state';

var initialStateOfUserPage: UserState = {
  User: {
    UID: 0,
    UGID: '',
    URID: 1,
    UFirstName: '',
    ULastName: '',
    UUserName: '',
    UEmail: '',
    UPhone: ''
  },
  ErrorMessage: ''
};

export const UserReducer = createReducer<UserState>(
  initialStateOfUserPage,

  on(Actions.loadUserSuccess, (state, { User }) => ({
    ...state,
    User: {
      UID: 0,
      UGID: '',
      URID: 1,
      UFirstName: User.uFirstName,
      ULastName: User.uLastName,
      UUserName: User.uUserName,
      UEmail: User.uEmail,
      UPhone: User.uPhone
    }
  })),

  on(Actions.loadUserError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  on(Actions.loadUserByAdminSuccess, (state, { User }) => ({
    ...state,
    User: User
  })),

  on(Actions.loadUserByAdminError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  on(Actions.saveUserError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  on(Actions.saveUserByAdminError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  on(Actions.cleanState, (state) => ({
    ...state,
    User: {
      UID: 0,
      UGID: '',
      URID: 1,
      UFirstName: '',
      ULastName: '',
      UUserName: '',
      UEmail: '',
      UPhone: ''
    },
    ErrorMessage: ''
  }))
);
