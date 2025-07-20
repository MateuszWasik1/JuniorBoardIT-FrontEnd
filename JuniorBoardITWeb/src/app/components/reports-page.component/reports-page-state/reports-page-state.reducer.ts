import { createReducer, on } from '@ngrx/store';
import * as Actions from './reports-page-state.actions';
import { LocationEnum } from 'src/app/enums/JobOffers/LocationEnum';
import { EmploymentTypeEnum } from 'src/app/enums/JobOffers/EmploymentTypeEnum';
import { ExpirenceEnum } from 'src/app/enums/JobOffers/ExpirenceEnum';
import { CategoryEnum } from 'src/app/enums/JobOffers/CategoryEnum';
import { SalaryEnum } from 'src/app/enums/JobOffers/SalaryEnum';
import { StatusEnum } from 'src/app/enums/JobOffers/StatusEnum';
import { CurrencyEnum } from 'src/app/enums/JobOffers/CurrencyEnum';
import { ReportsStatusEnum } from 'src/app/enums/Reports/ReportsStatusEnum';
import { ReportsState } from './reports-page-state.state';

var initialStateOfReportPage: ReportsState = {
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
    JOCreatedAt: new Date(),
    JOPostedAt: new Date(),
    JOExpiresAt: new Date(),
    JOStatus: StatusEnum.Draft
  },
  Filters: {
    Skip: 0,
    Take: 10
  },
  ReportsCount: 0,
  ErrorMessage: ''
};

export const ReportReducer = createReducer<ReportsState>(
  initialStateOfReportPage,

  //Load Report
  on(Actions.loadReportSuccess, (state, { Report }) => ({
    ...state,
    Report: Report
  })),

  on(Actions.loadReportError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  //Load Reports
  on(Actions.loadReportsSuccess, (state, { Reports }) => ({
    ...state,
    Reports: Reports.list,
    ReportsCount: Reports.count
  })),

  on(Actions.loadReportsError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  //Save Report
  on(Actions.addReportSuccess, (state) => ({
    ...state
  })),

  on(Actions.addReportError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  //Update Report
  on(Actions.updateReportSuccess, (state) => ({
    ...state
  })),

  on(Actions.updateReportError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  //Delete Task
  on(Actions.deleteReportSuccess, (state, { RGID }) => {
    let newReports = [...state.Reports];

    let reportsWithoutDeletedTask = newReports.filter((x) => x.rgid != RGID);

    return { ...state, Reports: reportsWithoutDeletedTask };
  }),

  on(Actions.deleteReportError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  //Filters
  //   on(Actions.ChangeCategoryFilterValue, (state, { value }) => ({
  //     ...state,
  //     Filters: {
  //       ...state.Filters,
  //       Category: value
  //     }
  //   })),

  //   on(Actions.ChangeStatusFilterValue, (state, { value }) => ({
  //     ...state,
  //     Filters: {
  //       ...state.Filters,
  //       Status: parseInt(value)
  //     }
  //   })),

  on(Actions.updatePaginationDataReports, (state, { PaginationData }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      Skip: PaginationData.Skip,
      Take: PaginationData.Take
    }
  })),

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
      JOCreatedAt: new Date(),
      JOPostedAt: new Date(),
      JOExpiresAt: new Date(),
      JOStatus: StatusEnum.Draft
    },
    Filters: {
      Skip: 0,
      Take: 10
    },
    ReportsCount: 0,
    ErrorMessage: ''
  }))
);
