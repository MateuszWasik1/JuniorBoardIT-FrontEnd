import { createReducer, on } from '@ngrx/store';

import { CompanyEmpNoEnum } from 'src/app/enums/Companies/CompanyEmpNoEnum';
import { IndustryEnum } from 'src/app/enums/Companies/IndustryEnum';

import * as Actions from './companies-page-state.actions';
import { CompaniesState } from './companies-page-state.state';

const initialStateOfCompaniesPage: CompaniesState = {
  Companies: [],
  Company: {
    CGID: '',
    CName: '',
    CIndustry: IndustryEnum.Industry,
    CDescription: '',
    CEmail: '',
    CAddress: '',
    CCity: '',
    CCountry: '',
    CPostalCode: '',
    CPhoneNumber: '',
    CNIP: '',
    CRegon: '',
    CKRS: '',
    CLI: '',
    CFoundedYear: 0,
    CEmployeesNo: CompanyEmpNoEnum.Microenterprise,
    CCreatedAt: null,
    CUpdatedAt: null
  },
  Filters: {
    Skip: 0,
    Take: 10,
    Name: ''
  },
  CompaniesCount: 0,
  ErrorMessage: ''
};

export const CompaniesReducer = createReducer<CompaniesState>(
  initialStateOfCompaniesPage,

  on(Actions.loadCompanySuccess, (state, { Company }) => ({
    ...state,
    Company: Company
  })),

  on(Actions.loadCompanyError, (state, { Error }) => ({
    ...state,
    ErrorMessage: Error
  })),

  on(Actions.loadCompaniesSuccess, (state, { Companies }) => ({
    ...state,
    Companies: Companies.List,
    CompaniesCount: Companies.Count
  })),

  on(Actions.loadCompaniesError, (state, { Error }) => ({
    ...state,
    ErrorMessage: Error
  })),

  on(Actions.addCompanyError, (state, { Error }) => ({
    ...state,
    ErrorMessage: Error
  })),

  on(Actions.updateCompanyError, (state, { Error }) => ({
    ...state,
    ErrorMessage: Error
  })),

  on(Actions.deleteCompanySuccess, (state, { CGID }) => {
    const newCompanies = [...state.Companies];

    const companiesWithoutDeletedCompany = newCompanies.filter((x) => x.CGID != CGID);

    return { ...state, Companies: companiesWithoutDeletedCompany };
  }),

  on(Actions.deleteCompanyError, (state, { Error }) => ({
    ...state,
    ErrorMessage: Error
  })),

  //Filters
  on(Actions.changeNameFilterValue, (state, { Name }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      Name: Name
    }
  })),

  on(Actions.updatePaginationData, (state, { PaginationData }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      Skip: PaginationData.Skip,
      Take: PaginationData.Take
    }
  })),

  //Others
  on(Actions.cleanState, (state) => ({
    ...state,
    Companies: [],
    Company: {
      CGID: '',
      CName: '',
      CIndustry: IndustryEnum.Industry,
      CDescription: '',
      CEmail: '',
      CAddress: '',
      CCity: '',
      CCountry: '',
      CPostalCode: '',
      CPhoneNumber: '',
      CNIP: '',
      CRegon: '',
      CKRS: '',
      CLI: '',
      CFoundedYear: 0,
      CEmployeesNo: CompanyEmpNoEnum.Microenterprise,
      CCreatedAt: null,
      CUpdatedAt: null
    },
    Filters: {
      Skip: 0,
      Take: 10,
      Name: ''
    },
    CompaniesCount: 0,
    ErrorMessage: ''
  }))
);
