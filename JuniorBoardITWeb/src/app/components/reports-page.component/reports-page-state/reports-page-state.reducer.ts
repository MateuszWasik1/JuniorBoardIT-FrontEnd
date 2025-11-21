import { createReducer, on } from '@ngrx/store';
import { Guid } from 'guid-typescript';

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
import { ReportsStatusEnum } from 'src/app/enums/Reports/ReportsStatusEnum';
import { ReportsTypeEnum } from 'src/app/enums/Reports/ReportsTypeEnum';

import * as Actions from './reports-page-state.actions';
import { ReportsState } from './reports-page-state.state';

const initialStateOfReportPage: ReportsState = {
  Reports: [],
  Report: {
    RID: 0,
    RGID: '',
    RJOGID: '',
    RReporterGID: '',
    RSupportGID: '',
    RDate: new Date(),
    RReasons: '',
    RText: '',
    RStatus: ReportsStatusEnum.New
  },
  JobOffer: {
    JOGID: '',
    JOCGID: '',
    JOTitle: '',
    JOCompanyName: '',
    JOLocationType: LocationEnum.Stationary,
    JOOfficeLocation: '',
    JOEmploymentType: EmploymentTypeEnum.UoP,
    JOExpirenceLevel: ExpirenceEnum.Junior,
    JOExpirenceYears: 0,
    JOCategory: CategoryEnum.FrontEnd,
    JOSalaryMin: 0,
    JOSalaryMax: 0,
    JOCurrency: CurrencyEnum.PLN,
    JOSalaryType: SalaryEnum.Monthly,
    JODescription: '',
    JORequirements: '',
    JOBenefits: '',
    JOEducation: EducationEnum.All,
    JOCreatedAt: new Date(),
    JOPostedAt: new Date(),
    JOExpiresAt: new Date(),
    JOStatus: StatusEnum.Draft
  },
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
    CEmployeesNo: CompanyEmpNoEnum.Microenterprise
  },
  Filters: {
    Skip: 0,
    Take: 10,
    ReportType: ReportsTypeEnum.New,
    Message: ''
  },
  ReportsCount: 0,
  ErrorMessage: ''
};

export const ReportsReducer = createReducer<ReportsState>(
  initialStateOfReportPage,

  //Load Report
  on(Actions.loadReportSuccess, (state, { ReportModel, JobOfferModel, CompanyModel }) => ({
    ...state,
    Report: ReportModel,
    JobOffer: JobOfferModel,
    Company: CompanyModel
  })),

  on(Actions.loadReportError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  //Load Reports
  on(Actions.loadReportsSuccess, (state, { Reports }) => ({
    ...state,
    Reports: Reports.List,
    ReportsCount: Reports.Count
  })),

  on(Actions.loadReportsError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  //Save Report
  on(Actions.saveReportSuccess, (state) => ({
    ...state
  })),

  on(Actions.saveReportError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  //Change Report Status
  on(Actions.changeReportStatusSuccess, (state, { RStatus }) => ({
    ...state,
    Report: {
      ...state.Report,
      RStatus: RStatus,
      RSupportGID: Guid.create().toString()
    }
  })),

  on(Actions.changeReportStatusError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  //Filters
  on(Actions.ChangeReportTypeFilterValue, (state, { ReportType }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      ReportType: ReportType
    }
  })),

  on(Actions.changeMessageFilterValue, (state, { Message }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      Message: Message
    }
  })),

  on(Actions.updatePaginationDataReports, (state, { PaginationData }) => ({
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
    Reports: [],
    Report: {
      RID: 0,
      RGID: '',
      RJOGID: '',
      RReporterGID: '',
      RSupportGID: '',
      RDate: new Date(),
      RReasons: '',
      RText: '',
      RStatus: ReportsStatusEnum.New
    },
    JobOffer: {
      JOGID: '',
      JOCGID: '',
      JOTitle: '',
      JOCompanyName: '',
      JOLocationType: LocationEnum.Stationary,
      JOOfficeLocation: '',
      JOEmploymentType: EmploymentTypeEnum.UoP,
      JOExpirenceLevel: ExpirenceEnum.Junior,
      JOExpirenceYears: 0,
      JOCategory: CategoryEnum.FrontEnd,
      JOSalaryMin: 0,
      JOSalaryMax: 0,
      JOCurrency: CurrencyEnum.PLN,
      JOSalaryType: SalaryEnum.Monthly,
      JODescription: '',
      JORequirements: '',
      JOBenefits: '',
      JOEducation: EducationEnum.All,
      JOCreatedAt: new Date(),
      JOPostedAt: new Date(),
      JOExpiresAt: new Date(),
      JOStatus: StatusEnum.Draft
    },
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
      CEmployeesNo: CompanyEmpNoEnum.Microenterprise
    },
    Filters: {
      Skip: 0,
      Take: 10,
      ReportType: ReportsTypeEnum.New,
      Message: ''
    },
    ReportsCount: 0,
    ErrorMessage: ''
  }))
);
