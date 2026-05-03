import { createFeatureSelector, createSelector } from '@ngrx/store';

import { FileGeneratorState, featureKeyFileGeneratorState } from './file-generator-page-state.state';

const selectFileGeneratorState = createFeatureSelector<FileGeneratorState>(featureKeyFileGeneratorState);

export const selectFilters = createSelector(selectFileGeneratorState, (state: FileGeneratorState) => state.Filters);

export const selectCompanies = createSelector(selectFileGeneratorState, (state: FileGeneratorState) => state.Companies);

export const selectErrorMessage = createSelector(
  selectFileGeneratorState,
  (state: FileGeneratorState) => state.ErrorMessage
);
