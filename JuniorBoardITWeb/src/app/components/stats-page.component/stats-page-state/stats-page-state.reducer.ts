import { createReducer, on } from '@ngrx/store';
import * as Actions from './stats-page-state.actions';
import { StatsState } from './stats-page-state.state';
import { StatsTypeEnum } from 'src/app/enums/Stats/StatsTypeEnum';
import { StatsChartTypeEnum } from 'src/app/enums/Stats/StatsChartTypeEnum';

var initialStateOfStatsPage: StatsState = {
  Stats: {
    labels: [],
    datasets: []
  },
  Filters: {
    StartDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    EndDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
    Date: new Date(),
    ChartType: StatsChartTypeEnum.Bar,
    DataType: StatsTypeEnum.NumberOfRecruiterPublishedOfferts,
    CGID: ''
  },
  Companies: [],
  ErrorMessage: ''
};

export const StatsReducer = createReducer<StatsState>(
  initialStateOfStatsPage,

  //Load Stats
  on(Actions.loadStatsSuccess, (state, { Result }) => {
    const datasets = {
      data: Result.Datasets.Data,
      label: Result.Datasets.Label
    };

    return {
      ...state,
      Stats: {
        labels: Result.Labels,
        datasets: [datasets]
      }
    };
  }),

  on(Actions.loadStatsError, (state, { error }) => ({
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

  on(Actions.changeDateFilter, (state, { Date }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      Date: Date
    }
  })),

  on(Actions.changeDataTypeFilter, (state, { DataType }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      DataType: DataType
    }
  })),

  on(Actions.changeChartTypeFilter, (state, { ChartType }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      ChartType: ChartType
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
    Stats: {
      labels: [],
      datasets: []
    },
    Filters: {
      StartDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      EndDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
      Date: new Date(),
      ChartType: StatsChartTypeEnum.Bar,
      DataType: StatsTypeEnum.NumberOfRecruiterPublishedOfferts,
      CGID: ''
    },
    Companies: [],
    ErrorMessage: ''
  }))
);
