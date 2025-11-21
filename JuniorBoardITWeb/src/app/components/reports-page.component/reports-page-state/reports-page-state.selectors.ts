import { createFeatureSelector, createSelector } from '@ngrx/store';

import { featureKeyReportsState, ReportsState } from './reports-page-state.state';

const selectReportsState = createFeatureSelector<ReportsState>(featureKeyReportsState);

export const selectReport = createSelector(selectReportsState, (state: ReportsState) => state.Report);

export const selectReports = createSelector(selectReportsState, (state: ReportsState) => state.Reports);

export const selectJobOffer = createSelector(selectReportsState, (state: ReportsState) => state.JobOffer);

export const selectCompany = createSelector(selectReportsState, (state: ReportsState) => state.Company);

export const selectFilters = createSelector(selectReportsState, (state: ReportsState) => state.Filters);

export const selectCount = createSelector(selectReportsState, (state: ReportsState) => state.ReportsCount);

export const selectErrorMessage = createSelector(selectReportsState, (state: ReportsState) => state.ErrorMessage);
