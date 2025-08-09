import { createReducer, on } from '@ngrx/store';
import * as Actions from './stats-page-state.actions';
import { StatsState } from './stats-page-state.state';
import { StatsTypeEnum } from 'src/app/enums/Stats/StatsTypeEnum';

var initialStateOfStatsPage: StatsState = {
  Stats: {
    labels: [],
    datasets: []
  },
  Filters: {
    StartDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    EndDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
    Date: new Date(),
    ChartType: 'bar',
    DataType: StatsTypeEnum.NumberOfRecruiterPublishedOfferts
  },
  ErrorMessage: ''
};

export const StatsReducer = createReducer<StatsState>(
  initialStateOfStatsPage,

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

  on(Actions.changeStartDateFilter, (state, { startDate }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      StartDate: startDate
    }
  })),

  on(Actions.changeEndDateFilter, (state, { endDate }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      EndDate: endDate
    }
  })),

  on(Actions.changeDataTypeFilter, (state, { dataType }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      DataType: dataType
    }
  })),

  on(Actions.changeCategoryFilter, (state, { category }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      Category: category
    }
  })),

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
      ChartType: 'bar',
      DataType: StatsTypeEnum.NumberOfRecruiterPublishedOfferts
    },
    ErrorMessage: ''
  }))
);
