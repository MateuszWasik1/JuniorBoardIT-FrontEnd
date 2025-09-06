import { CompanyEmpNoEnum } from 'src/app/enums/Companies/CompanyEmpNoEnum';
import { IndustryEnum } from 'src/app/enums/Companies/IndustryEnum';
import { CategoryEnum } from 'src/app/enums/JobOffers/CategoryEnum';
import { CurrencyEnum } from 'src/app/enums/JobOffers/CurrencyEnum';
import { EducationEnum } from 'src/app/enums/JobOffers/EducationEnum';
import { EmploymentTypeEnum } from 'src/app/enums/JobOffers/EmploymentTypeEnum';
import { ExpirenceEnum } from 'src/app/enums/JobOffers/ExpirenceEnum';
import { LocationEnum } from 'src/app/enums/JobOffers/LocationEnum';
import { SalaryEnum } from 'src/app/enums/JobOffers/SalaryEnum';
import { StatusEnum } from 'src/app/enums/JobOffers/StatusEnum';

export interface JobOffer {
  JOGID: string;
  JOCGID: string;
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
  JOEducation: EducationEnum;
  JOCreatedAt: Date;
  JOPostedAt: Date;
  JOExpiresAt: Date;
  JOStatus: StatusEnum;
  JOFavorite?: string;
}

export interface Filters {
  Skip: number;
  Take: number;
  Expirence: ExpirenceEnum;
  Category: CategoryEnum;
  Location: LocationEnum;
  Education: EducationEnum;
  EmploymentType: EmploymentTypeEnum;
  Salary: SalaryEnum;
  Favorite: boolean;
}

export interface User {
  UFirstName: string;
  ULastName: string;
  UEmail: string;
  UPhone: string;
  UCompanyGID: string;
}

export interface Company {
  CGID: string;
  CName: string;
  CIndustry: IndustryEnum;
  CDescription: string;
  CEmail: string;
  CAddress: string;
  CCity: string;
  CCountry: string;
  CPostalCode: string;
  CPhoneNumber: string;
  CNIP: string;
  CRegon: string;
  CKRS: string;
  CLI: string;
  CFoundedYear: number;
  CEmployeesNo: CompanyEmpNoEnum;
}

export interface Roles {
  IsAdmin: boolean;
  IsPremium: boolean;
  IsRecruiter: boolean;
  IsSupport: boolean;
  IsUser: boolean;
}

export enum JobOfferTranslations {
  'JOTitle' = 'JobOffers_JobOffer_Title',
  'JOCompanyName' = 'JobOffers_JobOffer_CompanyName',
  'JOLocationType' = 'JobOffers_JobOffer_LocationType',
  'JOOfficeLocation' = 'JobOffers_JobOffer_OfficeLocation',
  'JOEmploymentType' = 'JobOffers_JobOffer_EmploymentType',
  'JOExpirenceLevel' = 'JobOffers_JobOffer_ExpirenceLevel',
  'JOExpirenceYears' = 'JobOffers_JobOffer_ExpirenceYears',
  'JOCategory' = 'JobOffers_JobOffer_Category',
  'JOSalaryMin' = 'JobOffers_JobOffer_SalaryMin',
  'JOSalaryMax' = 'JobOffers_JobOffer_SalaryMax',
  'JOCurrency' = 'JobOffers_JobOffer_Currency',
  'JOSalaryType' = 'JobOffers_JobOffer_SalaryType',
  'JODescription' = 'JobOffers_JobOffer_Description',
  'JORequirements' = 'JobOffers_JobOffer_Requirements',
  'JOBenefits' = 'JobOffers_JobOffer_Benefits',
  'JOEducation' = 'JobOffers_JobOffer_Education',
  'JOPostedAt' = 'JobOffers_JobOffer_PostedAt',
  'JOExpiresAt' = 'JobOffers_JobOffer_ExpiresAt'
}
