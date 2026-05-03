import { CompaniesModel, FiltersModel } from '../file-generator-page.model';

export const featureKeyFileGeneratorState = 'file-generator-page-state';

export interface FileGeneratorState {
  Filters: FiltersModel;
  Companies: CompaniesModel[];
  ErrorMessage: string;
}
