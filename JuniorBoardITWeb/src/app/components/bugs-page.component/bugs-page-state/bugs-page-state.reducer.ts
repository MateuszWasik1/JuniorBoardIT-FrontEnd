import { createReducer, on } from '@ngrx/store';
import { Guid } from 'guid-typescript';

import { BugStatusEnum } from 'src/app/enums/Bugs/BugStatusEnum';
import { BugTypeEnum } from 'src/app/enums/Bugs/BugTypeEnum';

import * as Actions from './bugs-page-state.actions';
import { BugsState } from './bugs-page-state.state';

const initialStateOfBugsPage: BugsState = {
  Bugs: [],
  Bug: {
    BGID: Guid.create().toString(),
    BTitle: '',
    BText: '',
    BStatus: BugStatusEnum.New
  },
  BugNotes: [],
  Filters: {
    BugType: BugTypeEnum.New,
    Skip: 0,
    Take: 10,
    Message: ''
  },
  FiltersBugNotes: {
    Skip: 0,
    Take: 10
  },
  BugsCount: 0,
  BugsNotesCount: 0,
  UserRoles: {
    IsSupport: false,
    IsAdmin: false
  },
  ErrorMessage: ''
};

export const BugsReducer = createReducer<BugsState>(
  initialStateOfBugsPage,

  on(Actions.loadBugsSuccess, (state, { Bugs }) => ({
    ...state,
    Bugs: Bugs.List,
    BugsCount: Bugs.Count
  })),

  on(Actions.loadBugsError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  on(Actions.loadBugSuccess, (state, { Bug }) => ({
    ...state,
    Bug: Bug
  })),

  on(Actions.loadBugError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  on(Actions.loadBugNotesSuccess, (state, { BugNotes }) => ({
    ...state,
    BugNotes: BugNotes.List,
    BugsNotesCount: BugNotes.Count
  })),

  on(Actions.loadBugNotesError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  on(Actions.loadUserRolesSuccess, (state, { UserRoles }) => ({
    ...state,
    UserRoles: {
      IsSupport: UserRoles.IsSupport,
      IsAdmin: UserRoles.IsAdmin
    }
  })),

  on(Actions.loadUserRolesError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  on(Actions.saveBugError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  on(Actions.saveBugNoteSuccess, (state, { BugNote }) => {
    const newBugNotes = [...state.BugNotes];

    const newModel = {
      BNGID: '',
      BNDate: new Date(),
      BNText: BugNote.BNText,
      BNIsNewVerifier: false,
      BNIsStatusChange: false,
      BNChangedStatus: 0
    };

    newBugNotes.push(newModel);

    return { ...state, BugNotes: newBugNotes };
  }),

  on(Actions.saveBugNoteError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  on(Actions.changeBugStatusSuccess, (state, { status }) => {
    const newBugNotes = [...state.BugNotes];

    const newModel = {
      BNGID: '',
      BNDate: new Date(),
      BNText: 'Status został zmieniony',
      BNIsNewVerifier: false,
      BNIsStatusChange: true,
      BNChangedStatus: +status
    };

    newBugNotes.push(newModel);

    return {
      ...state,
      Bug: {
        ...state.Bug,
        BStatus: status
      },
      BugNotes: newBugNotes
    };
  }),

  on(Actions.changeBugStatusError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  on(Actions.changeBugsType, (state, { BugType }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      BugType: BugType
    }
  })),

  //Filters
  on(Actions.changeMessageFilterValue, (state, { Message }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      Message: Message
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

  on(Actions.updateBugNotesPaginationData, (state, { PaginationData }) => ({
    ...state,
    FiltersBugNotes: {
      ...state.Filters,
      Skip: PaginationData.Skip,
      Take: PaginationData.Take
    }
  })),

  on(Actions.cleanState, (state) => ({
    ...state,
    Bugs: [],
    Bug: {
      BGID: Guid.create().toString(),
      BTitle: '',
      BText: '',
      BStatus: BugStatusEnum.New
    },
    BugNotes: [],
    Filters: {
      BugType: BugTypeEnum.New,
      Skip: 0,
      Take: 10,
      Message: ''
    },
    FiltersBugNotes: {
      Skip: 0,
      Take: 10
    },
    BugsCount: 0,
    BugsNotesCount: 0,
    UserRoles: {
      IsSupport: false,
      IsAdmin: false
    },
    ErrorMessage: ''
  }))
);
