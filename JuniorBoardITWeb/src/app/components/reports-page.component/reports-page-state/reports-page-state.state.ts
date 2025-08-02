import { JobOffer } from '../../job-offers-page.component/job-offers-page.models';
import { Filters, Report, Reports } from '../reports-page.models';

export const featureKeyReportsState = 'reports-page-state';

export interface ReportsState {
  Reports: Reports[];
  Report: Report;
  JobOffer: JobOffer;
  Filters: Filters;
  ReportsCount: number;
  ErrorMessage: string;
}
