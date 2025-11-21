import { createReducer, on } from '@ngrx/store';

import * as Actions from './users-page-state.actions';
import { UsersState } from './users-page-state.state';

const initialStateOfUsersPage: UsersState = {
  Users: [],
  Filters: {
    Skip: 0,
    Take: 10,
    Name: '',
    HasCompany: false,
    Role: 0
  },
  UsersCount: 0,
  ErrorMessage: ''
};

export const UsersReducer = createReducer<UsersState>(
  initialStateOfUsersPage,

  on(Actions.loadUsersSuccess, (state, { Users }) => ({
    ...state,
    Users: Users.List,
    UsersCount: Users.Count
  })),

  on(Actions.loadUsersError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  on(Actions.deleteUserSuccess, (state, { ugid }) => {
    const users = [...state.Users];

    const deletedUserIndex = users.findIndex((x) => x.UGID == ugid);

    users.splice(deletedUserIndex, 1);

    return { ...state, Users: users };
  }),

  on(Actions.deleteUserError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  //Filters
  on(Actions.changeUserRoleFilterValue, (state, { userRole }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      Role: userRole
    }
  })),

  on(Actions.changeHasCompanyFilterValue, (state, { hasCompany }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      HasCompany: hasCompany
    }
  })),

  on(Actions.changeNameFilterValue, (state, { name }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      Name: name
    }
  })),

  on(Actions.updatePaginationData, (state, { PaginationData }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      Skip: PaginationData.Skip,
      Take: PaginationData.Take
    }
  })),

  //Others
  on(Actions.cleanState, (state) => ({
    ...state,
    Users: [],
    Filters: {
      Skip: 0,
      Take: 10,
      Name: '',
      HasCompany: false,
      Role: 0
    },
    UsersCount: 0,
    ErrorMessage: ''
  }))
);
