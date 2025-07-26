export const featureKeyCompaniesState = 'companies-page-state';

export interface CompaniesState {
  Companies: any[];
  Company: {
    // BGID: string;
    // BTitle: string;
    // BText: string;
    // BStatus: BugStatusEnum;
  };
  Filters: {
    Skip: number;
    Take: number;
  };
  CompaniesCount: number;
  ErrorMessage: string;
}
