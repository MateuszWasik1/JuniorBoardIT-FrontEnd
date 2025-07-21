import { CategoryEnum } from 'src/app/enums/JobOffers/CategoryEnum';
import { CurrencyEnum } from 'src/app/enums/JobOffers/CurrencyEnum';
import { EmploymentTypeEnum } from 'src/app/enums/JobOffers/EmploymentTypeEnum';
import { ExpirenceEnum } from 'src/app/enums/JobOffers/ExpirenceEnum';
import { LocationEnum } from 'src/app/enums/JobOffers/LocationEnum';
import { SalaryEnum } from 'src/app/enums/JobOffers/SalaryEnum';
import { StatusEnum } from 'src/app/enums/JobOffers/StatusEnum';
import { ReportsStatusEnum } from 'src/app/enums/Reports/ReportsStatusEnum';

export const featureKeyReportsState = 'reports-page-state';

export interface ReportsState {
  Reports: any[];
  Report: {
    RID: number;
    RGID: string;
    RJOGID: string;
    RReporterGID: string;
    RSupportGID: string;
    RDate: Date;
    RReasons: string;
    RText: string;
    RStatus: ReportsStatusEnum;
  };
  JobOffer: {
    JOTitle: string;
    JOCompanyName: string;
    JOLocationType: LocationEnum;
    JOOfficeLocation: string;
    JOEmploymentType: EmploymentTypeEnum;
    JOExpirenceLevel: ExpirenceEnum;
    JOExpirenceYears: number;
    JOCategory: CategoryEnum;
    JOSalaryMin: number;
    JOSalaryMax: number;
    JOCurrency: CurrencyEnum;
    JOSalaryType: SalaryEnum;
    JODescription: string;
    JORequirements: string;
    JOBenefits: string;
    JOCreatedAt: Date;
    JOPostedAt: Date;
    JOExpiresAt: Date;
    JOStatus: StatusEnum;
  };
  Filters: {
    Skip: number;
    Take: number;
  };
  ReportsCount: number;
  ErrorMessage: string;
}
