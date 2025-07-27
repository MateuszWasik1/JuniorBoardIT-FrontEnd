import { CompanyEmpNoEnum } from 'src/app/enums/Companies/CompanyEmpNoEnum';
import { IndustryEnum } from 'src/app/enums/Companies/IndustryEnum';

export const featureKeyCompaniesState = 'companies-page-state';

export interface CompaniesState {
  Companies: any[];
  Company: {
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
    CCreatedAt: Date;
    CUpdatedAt: Date;
  };
  Filters: {
    Skip: number;
    Take: number;
  };
  CompaniesCount: number;
  ErrorMessage: string;
}
