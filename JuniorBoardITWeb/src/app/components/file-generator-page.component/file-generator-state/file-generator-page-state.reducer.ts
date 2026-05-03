import { createReducer, on } from '@ngrx/store';

import * as Actions from './file-generator-page-state.actions';
import { FileGeneratorState } from './file-generator-page-state.state';
import { FileTypeEnum } from 'src/app/enums/FileGenerator/FileTypeEnum';

const initialStateOfFileGeneratorPage: FileGeneratorState = {
  Filters: {
    StartDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    EndDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    DataType: FileTypeEnum.Applications,
    CGID: ''
  },
  Companies: [],
  ErrorMessage: ''
};

export const FileGeneratorReducer = createReducer<FileGeneratorState>(
  initialStateOfFileGeneratorPage,

  //Load Companies
  on(Actions.loadCompaniesSuccess, (state, { Companies }) => ({
    ...state,
    Companies: Companies.List
  })),

  on(Actions.loadCompaniesError, (state, { Error }) => ({
    ...state,
    ErrorMessage: Error
  })),

  //Change filters
  on(Actions.changeStartDateFilter, (state, { StartDate }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      StartDate: StartDate
    }
  })),

  on(Actions.changeEndDateFilter, (state, { EndDate }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      EndDate: EndDate
    }
  })),

  on(Actions.changeCGIDFilter, (state, { CGID }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      CGID: CGID
    }
  })),

  //clean
  on(Actions.cleanState, (state) => ({
    ...state,
    Filters: {
      StartDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      EndDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
      DataType: FileTypeEnum.Applications,
      CGID: ''
    },
    Companies: [],
    ErrorMessage: ''
  }))
);
