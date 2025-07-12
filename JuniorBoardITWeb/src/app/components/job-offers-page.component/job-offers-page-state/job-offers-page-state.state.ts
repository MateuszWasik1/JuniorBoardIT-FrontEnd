import { CategoryEnum } from 'src/app/enums/JobOffers/CategoryEnum';
import { CurrencyEnum } from 'src/app/enums/JobOffers/CurrencyEnum';
import { EmploymentTypeEnum } from 'src/app/enums/JobOffers/EmploymentTypeEnum';
import { ExpirenceEnum } from 'src/app/enums/JobOffers/ExpirenceEnum';
import { LocationEnum } from 'src/app/enums/JobOffers/LocationEnum';
import { SalaryEnum } from 'src/app/enums/JobOffers/SalaryEnum';
import { StatusEnum } from 'src/app/enums/JobOffers/StatusEnum';

export const featureKeyJobOffersState = 'job-offers-page-state';

export interface JobOffersState {
  JobOffers: any[];
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
  JobOffersCount: number;
  ErrorMessage: string;
}
