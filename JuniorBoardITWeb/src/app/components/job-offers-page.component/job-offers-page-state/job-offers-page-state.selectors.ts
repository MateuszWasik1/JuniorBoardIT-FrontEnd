import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JobOffersState, featureKeyJobOffersState } from './job-offers-page-state.state';

const selectJobOffersState = createFeatureSelector<JobOffersState>(featureKeyJobOffersState);

export const selectJobOffer = createSelector(selectJobOffersState, (state: JobOffersState) => state.JobOffer);

export const selectJobOffers = createSelector(selectJobOffersState, (state: JobOffersState) => state.JobOffers);

export const selectUserData = createSelector(selectJobOffersState, (state: JobOffersState) => state.User);

export const selectCompany = createSelector(selectJobOffersState, (state: JobOffersState) => state.Company);

export const selectRoles = createSelector(selectJobOffersState, (state: JobOffersState) => state.Roles);

export const selectFilters = createSelector(selectJobOffersState, (state: JobOffersState) => state.Filters);

export const selectCount = createSelector(selectJobOffersState, (state: JobOffersState) => state.JobOffersCount);

export const selectErrorMessage = createSelector(selectJobOffersState, (state: JobOffersState) => state.ErrorMessage);
