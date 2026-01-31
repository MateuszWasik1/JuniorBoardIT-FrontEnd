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

  on(Actions.loadUsersError, (state, { Error }) => ({
    ...state,
    ErrorMessage: Error
  })),

  on(Actions.deleteUserSuccess, (state, { UGID }) => {
    const users = [...state.Users];

    const deletedUserIndex = users.findIndex((x) => x.UGID == UGID);

    users.splice(deletedUserIndex, 1);

    return { ...state, Users: users };
  }),

  on(Actions.deleteUserError, (state, { Error }) => ({
    ...state,
    ErrorMessage: Error
  })),

  //Filters
  on(Actions.changeUserRoleFilterValue, (state, { UserRole }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      Role: UserRole
    }
  })),

  on(Actions.changeHasCompanyFilterValue, (state, { HasCompany }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      HasCompany: HasCompany
    }
  })),

  on(Actions.changeNameFilterValue, (state, { Name }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      Name: Name
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
