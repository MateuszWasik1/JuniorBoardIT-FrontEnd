import { CompanyEmpNoEnum } from 'src/app/enums/Companies/CompanyEmpNoEnum';
import { IndustryEnum } from 'src/app/enums/Companies/IndustryEnum';

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
  CCreatedAt: Date;
  CUpdatedAt: Date;
}

export interface Filters {
  Skip: number;
  Take: number;
}
