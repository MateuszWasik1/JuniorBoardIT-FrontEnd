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

  on(Actions.loadCompanyError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  on(Actions.loadCompaniesSuccess, (state, { Companies }) => ({
    ...state,
    Companies: Companies.List,
    CompaniesCount: Companies.Count
  })),

  on(Actions.loadCompaniesError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  on(Actions.addCompanyError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  on(Actions.updateCompanyError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  on(Actions.deleteCompanySuccess, (state, { CGID }) => {
    const newCompanies = [...state.Companies];

    const companiesWithoutDeletedCompany = newCompanies.filter((x) => x.CGID != CGID);

    return { ...state, Companies: companiesWithoutDeletedCompany };
  }),

  on(Actions.deleteCompanyError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  //Filters
  on(Actions.changeNameFilterValue, (state, { name }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      Name: name
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
