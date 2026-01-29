import { CompanyEmpNoEnum } from 'src/app/enums/Companies/CompanyEmpNoEnum';
import { IndustryEnum } from 'src/app/enums/Companies/IndustryEnum';

export interface CompaniesModel {
  List: CompanyModel[];
  Count: number;
}

export interface CompanyModel {
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
  CCreatedAt: Date | null;
  CUpdatedAt: Date | null;
}

export interface Filters {
  Skip: number;
  Take: number;
  Name: string;
}

export enum CompanyTranslations {
  'CName' = 'Companies_Company_Name',
  'CIndustry' = 'Companies_Company_Industry',
  'CDescription' = 'Companies_Company_Description',
  'CEmail' = 'Companies_Company_Email',
  'CAddress' = 'Companies_Company_Address',
  'CCity' = 'Companies_Company_City',
  'CCountry' = 'Companies_Company_Country',
  'CPostalCode' = 'Companies_Company_PostalCode',
  'CPhoneNumber' = 'Companies_Company_PhoneNumber',
  'CNIP' = 'Companies_Company_NIP',
  'CRegon' = 'Companies_Company_Regon',
  'CKRS' = 'Companies_Company_KRS',
  'CLI' = 'Companies_Company_LinkedIn',
  'CFoundedYear' = 'Companies_Company_FoundedYear',
  'CEmployeesNo' = 'Companies_Company_EmployeesNo'
}
