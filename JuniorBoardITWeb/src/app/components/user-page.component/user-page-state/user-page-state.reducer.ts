import { createReducer, on } from '@ngrx/store';

import * as Actions from './user-page-state.actions';
import { UserState } from './user-page-state.state';

const initialStateOfUserPage: UserState = {
  User: {
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

  on(Actions.loadUserError, (state, { Error }) => ({
    ...state,
    ErrorMessage: Error
  })),

  on(Actions.loadUserByAdminSuccess, (state, { User }) => ({
    ...state,
    User: User
  })),

  on(Actions.loadUserByAdminError, (state, { Error }) => ({
    ...state,
    ErrorMessage: Error
  })),

  //Load Companies
  on(Actions.loadCompaniesSuccess, (state, { Companies }) => ({
    ...state,
    Companies: Companies.List
  })),

  on(Actions.loadCompaniesError, (state, { Error }) => ({
    ...state,
    ErrorMessage: Error
  })),

  //Save User
  on(Actions.saveUserError, (state, { Error }) => ({
    ...state,
    ErrorMessage: Error
  })),

  on(Actions.saveUserByAdminError, (state, { Error }) => ({
    ...state,
    ErrorMessage: Error
  })),

  //Others
  on(Actions.cleanState, (state) => ({
    ...state,
    User: {
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
