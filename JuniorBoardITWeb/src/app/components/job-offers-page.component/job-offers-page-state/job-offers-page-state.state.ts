import { Filters, JobOffer } from '../job-offers-page.models';

export const featureKeyJobOffersState = 'job-offers-page-state';

export interface JobOffersState {
  JobOffers: JobOffer[];
  JobOffer: JobOffer;
  Filters: Filters;
  JobOffersCount: number;
  ErrorMessage: string;
}
