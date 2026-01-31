import { CompanyModel, Filters } from '../companies-page.models';

export const featureKeyCompaniesState = 'companies-page-state';

export interface CompaniesState {
  Companies: CompanyModel[];
  Company: CompanyModel;
  Filters: Filters;
  CompaniesCount: number;
  ErrorMessage: string;
}
