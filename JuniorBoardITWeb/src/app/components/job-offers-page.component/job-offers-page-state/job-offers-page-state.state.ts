import { CompanyModel, FiltersModel, JobOfferModel, RolesModel, UserModel } from '../job-offers-page.models';

export const featureKeyJobOffersState = 'job-offers-page-state';

export interface JobOffersState {
  JobOffers: JobOfferModel[];
  JobOffer: JobOfferModel;
  User: UserModel;
  Filters: FiltersModel;
  JobOffersCount: number;
  Company: CompanyModel;
  Roles: RolesModel;
  ErrorMessage: string;
}
