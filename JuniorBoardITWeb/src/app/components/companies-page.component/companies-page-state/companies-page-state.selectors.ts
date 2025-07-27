import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CompaniesState, featureKeyCompaniesState } from './companies-page-state.state';

const selectCompaniesState = createFeatureSelector<CompaniesState>(featureKeyCompaniesState);

export const selectCompany = createSelector(selectCompaniesState, (state: CompaniesState) => state.Company);

export const selectCompenies = createSelector(selectCompaniesState, (state: CompaniesState) => state.Companies);

export const selectFilters = createSelector(selectCompaniesState, (state: CompaniesState) => state.Filters);

export const selectCompaniesCount = createSelector(
  selectCompaniesState,
  (state: CompaniesState) => state.CompaniesCount
);

export const selectErrorMessage = createSelector(selectCompaniesState, (state: CompaniesState) => state.ErrorMessage);
