import { createReducer, on } from '@ngrx/store';

import * as Actions from './user-page-state.actions';
import { UserState } from './user-page-state.state';

const initialStateOfUserPage: UserState = {
  User: {
    UID: 0,
    UGID: '',
    URID: 1,
    UFirstName: '',
    ULastName: '',
    UUserName: '',
    UEmail: '',
    UPhone: '',
    UCompany: '',
    UCompanyGID: ''
  },
  Companies: [],
  ErrorMessage: ''
};

export const UserReducer = createReducer<UserState>(
  initialStateOfUserPage,

  //Load User
  on(Actions.loadUserSuccess, (state, { User }) => ({
    ...state,
    User: {
      UID: 0,
      UGID: '',
      URID: 1,
      UFirstName: User.UFirstName,
      ULastName: User.ULastName,
      UUserName: User.UUserName,
      UEmail: User.UEmail,
      UPhone: User.UPhone,
      UCompany: User.UCompany ?? '',
      UCompanyGID: User.UCompanyGID ?? ''
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

  //Load Companies
  on(Actions.loadCompaniesSuccess, (state, { Companies }) => ({
    ...state,
    Companies: Companies.List
  })),

  on(Actions.loadCompaniesError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  //Save User
  on(Actions.saveUserError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  on(Actions.saveUserByAdminError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  //Others
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
      UPhone: '',
      UCompany: '',
      UCompanyGID: ''
    },
    Companies: [],
    ErrorMessage: ''
  }))
);
