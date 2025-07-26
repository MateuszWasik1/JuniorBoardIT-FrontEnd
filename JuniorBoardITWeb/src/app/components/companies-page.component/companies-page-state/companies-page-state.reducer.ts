import { createReducer, on } from '@ngrx/store';
import * as Actions from './companies-page-state.actions';
import { CompaniesState } from './companies-page-state.state';
import { IndustryEnum } from 'src/app/enums/Companies/IndustryEnum';
import { CompanyEmpNoEnum } from 'src/app/enums/Companies/CompanyEmpNoEnum';

var initialStateOfCompaniesPage: CompaniesState = {
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
    CLI: '',
    CFoundedYear: 0,
    CEmployeesNo: CompanyEmpNoEnum.Microenterprise,
    CCreatedAt: new Date(),
    CUpdatedAt: new Date()
  },
  Filters: {
    Skip: 0,
    Take: 10
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

  on(Actions.deleteCompanyError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  on(Actions.updatePaginationData, (state, { PaginationData }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      Skip: PaginationData.Skip,
      Take: PaginationData.Take
    }
  })),

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
      CLI: '',
      CFoundedYear: 0,
      CEmployeesNo: CompanyEmpNoEnum.Microenterprise,
      CCreatedAt: new Date(),
      CUpdatedAt: new Date()
    },
    Filters: {
      Skip: 0,
      Take: 10
    },
    CompaniesCount: 0,
    ErrorMessage: ''
  }))
);
