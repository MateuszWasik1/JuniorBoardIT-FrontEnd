import { Company, Filters, JobOffer, Roles, User } from '../job-offers-page.models';

export const featureKeyJobOffersState = 'job-offers-page-state';

export interface JobOffersState {
  JobOffers: JobOffer[];
  JobOffer: JobOffer;
  User: User;
  Filters: Filters;
  JobOffersCount: number;
  Company: Company;
  Roles: Roles;
  ErrorMessage: string;
}
