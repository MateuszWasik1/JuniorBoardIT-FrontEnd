import { CompanyModel, JobOfferModel } from '../../job-offers-page.component/job-offers-page.models';
import { FiltersModel, ReportModel, ReportsModel } from '../reports-page.models';

export const featureKeyReportsState = 'reports-page-state';

export interface ReportsState {
  Reports: ReportsModel[];
  Report: ReportModel;
  JobOffer: JobOfferModel;
  Company: CompanyModel;
  Filters: FiltersModel;
  ReportsCount: number;
  ErrorMessage: string;
}
