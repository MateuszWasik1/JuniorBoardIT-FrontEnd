import { createReducer, on } from '@ngrx/store';
import * as Actions from './job-offers-page-state.actions';
import { LocationEnum } from 'src/app/enums/JobOffers/LocationEnum';
import { EmploymentTypeEnum } from 'src/app/enums/JobOffers/EmploymentTypeEnum';
import { ExpirenceEnum } from 'src/app/enums/JobOffers/ExpirenceEnum';
import { CategoryEnum } from 'src/app/enums/JobOffers/CategoryEnum';
import { SalaryEnum } from 'src/app/enums/JobOffers/SalaryEnum';
import { StatusEnum } from 'src/app/enums/JobOffers/StatusEnum';
import { JobOffersState } from './job-offers-page-state.state';
import { CurrencyEnum } from 'src/app/enums/JobOffers/CurrencyEnum';
import { EducationEnum } from 'src/app/enums/JobOffers/EducationEnum';

var initialStateOfJobOfferPage: JobOffersState = {
  JobOffers: [],
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
    JOEducation: EducationEnum.All,
    JOCreatedAt: new Date(),
    JOPostedAt: new Date(),
    JOExpiresAt: new Date(),
    JOStatus: StatusEnum.Draft
  },
  Filters: {
    Skip: 0,
    Take: 10,
    Education: EducationEnum.All
  },
  JobOffersCount: 0,
  ErrorMessage: ''
};

export const JobOfferReducer = createReducer<JobOffersState>(
  initialStateOfJobOfferPage,

  //Load JobOffer
  on(Actions.loadJobOfferSuccess, (state, { JobOffer }) => ({
    ...state,
    JobOffer: JobOffer
  })),

  on(Actions.loadJobOfferError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  //Load JobOffers
  on(Actions.loadJobOffersSuccess, (state, { JobOffers }) => ({
    ...state,
    JobOffers: JobOffers.List,
    JobOffersCount: JobOffers.Count
  })),

  on(Actions.loadJobOffersError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  //Save JobOffer
  on(Actions.addJobOfferSuccess, (state) => ({
    ...state
  })),

  on(Actions.addJobOfferError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  //Update JobOffer
  on(Actions.updateJobOfferSuccess, (state) => ({
    ...state
  })),

  on(Actions.updateJobOfferError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  //Delete Task
  on(Actions.deleteJobOfferSuccess, (state, { JOGID }) => {
    let newJobOffers = [...state.JobOffers];

    let jobOffersWithoutDeletedTask = newJobOffers.filter((x) => x.JOGID != JOGID);

    return { ...state, JobOffers: jobOffersWithoutDeletedTask };
  }),

  on(Actions.deleteJobOfferError, (state, { error }) => ({
    ...state,
    ErrorMessage: error
  })),

  //Filters
  on(Actions.ChangeEducationFilterValue, (state, { value }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      Education: parseInt(value)
    }
  })),

  on(Actions.updatePaginationDataJobOffers, (state, { PaginationData }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      Skip: PaginationData.Skip,
      Take: PaginationData.Take
    }
  })),

  on(Actions.cleanState, (state) => ({
    ...state,
    JobOffers: [],
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
      JOEducation: EducationEnum.All,
      JOCreatedAt: new Date(),
      JOPostedAt: new Date(),
      JOExpiresAt: new Date(),
      JOStatus: StatusEnum.Draft
    },
    Filters: {
      Skip: 0,
      Take: 10,
      Education: EducationEnum.All
    },
    JobOffersCount: 0,
    ErrorMessage: ''
  }))
);
