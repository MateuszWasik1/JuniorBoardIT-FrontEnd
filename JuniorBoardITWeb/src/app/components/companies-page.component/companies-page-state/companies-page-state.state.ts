import { Company, Filters } from '../companies-page.models';

export const featureKeyCompaniesState = 'companies-page-state';

export interface CompaniesState {
  Companies: Company[];
  Company: Company;
  Filters: Filters;
  CompaniesCount: number;
  ErrorMessage: string;
}
