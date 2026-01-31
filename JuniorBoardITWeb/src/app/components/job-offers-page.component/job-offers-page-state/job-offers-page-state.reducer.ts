import { createReducer, on } from '@ngrx/store';

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

import * as Actions from './job-offers-page-state.actions';
import { JobOffersState } from './job-offers-page-state.state';

const initialStateOfJobOfferPage: JobOffersState = {
  JobOffers: [],
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
  User: {
    UFirstName: '',
    ULastName: '',
    UEmail: '',
    UPhone: '',
    UCompanyGID: ''
  },
  Filters: {
    Skip: 0,
    Take: 10,
    Expirence: ExpirenceEnum.All,
    Category: CategoryEnum.All,
    Location: LocationEnum.All,
    Education: EducationEnum.All,
    EmploymentType: EmploymentTypeEnum.All,
    Salary: SalaryEnum.All,
    Favorite: false
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
  Roles: {
    IsAdmin: false,
    IsPremium: false,
    IsRecruiter: false,
    IsSupport: false,
    IsUser: false
  },
  JobOffersCount: 0,
  ErrorMessage: ''
};

export const JobOfferReducer = createReducer<JobOffersState>(
  initialStateOfJobOfferPage,

  //Load JobOffer
  on(Actions.loadJobOfferSuccess, (state, { JobOffer }) => ({
    ...state,
    JobOffer: JobOffer.JobOffer,
    Company: JobOffer.Company
  })),

  on(Actions.loadJobOfferError, (state, { Error }) => ({
    ...state,
    ErrorMessage: Error
  })),

  //Load JobOffers
  on(Actions.loadJobOffersSuccess, (state, { JobOffers }) => ({
    ...state,
    JobOffers: JobOffers.List,
    JobOffersCount: JobOffers.Count
  })),

  on(Actions.loadJobOffersError, (state, { Error }) => ({
    ...state,
    ErrorMessage: Error
  })),

  //Load UserData
  on(Actions.loadUserDataSuccess, (state, { User }) => ({
    ...state,
    User: User
  })),

  on(Actions.loadUserDataError, (state, { Error }) => ({
    ...state,
    ErrorMessage: Error
  })),

  //Load Company
  on(Actions.loadCompanySuccess, (state, { Company }) => ({
    ...state,
    Company: Company
  })),

  on(Actions.loadCompanyError, (state, { Error }) => ({
    ...state,
    ErrorMessage: Error
  })),

  //Load Roles
  on(Actions.loadRolesSuccess, (state, { Roles }) => ({
    ...state,
    Roles: Roles
  })),

  on(Actions.loadRolesError, (state, { Error }) => ({
    ...state,
    ErrorMessage: Error
  })),

  //Save JobOffer
  on(Actions.addJobOfferSuccess, (state) => ({
    ...state
  })),

  on(Actions.addJobOfferError, (state, { Error }) => ({
    ...state,
    ErrorMessage: Error
  })),

  //Apply for JobOffer
  on(Actions.applyForJobOfferSuccess, (state) => ({
    ...state
  })),

  on(Actions.applyForJobOfferError, (state, { Error }) => ({
    ...state,
    ErrorMessage: Error
  })),

  //Add To favorite
  on(Actions.addToFavoriteSuccess, (state) => ({
    ...state
  })),

  on(Actions.addToFavoriteError, (state, { Error }) => ({
    ...state,
    ErrorMessage: Error
  })),

  //Update JobOffer
  on(Actions.updateJobOfferSuccess, (state) => ({
    ...state
  })),

  on(Actions.updateJobOfferError, (state, { Error }) => ({
    ...state,
    ErrorMessage: Error
  })),

  //Delete Task
  on(Actions.deleteJobOfferSuccess, (state, { JOGID }) => {
    const newJobOffers = [...state.JobOffers];

    const jobOffersWithoutDeletedTask = newJobOffers.filter((x) => x.JOGID != JOGID);

    return { ...state, JobOffers: jobOffersWithoutDeletedTask };
  }),

  on(Actions.deleteJobOfferError, (state, { Error }) => ({
    ...state,
    ErrorMessage: Error
  })),

  //Filters
  on(Actions.changeExpirenceFilterValue, (state, { Expirence }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      Expirence: Expirence
    }
  })),

  on(Actions.changeCategoryFilterValue, (state, { Category }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      Category: Category
    }
  })),

  on(Actions.changeLocationFilterValue, (state, { Location }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      Location: Location
    }
  })),

  on(Actions.changeEducationFilterValue, (state, { Education }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      Education: Education
    }
  })),

  on(Actions.changeEmploymentTypeFilterValue, (state, { EmploymentType }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      EmploymentType: EmploymentType
    }
  })),

  on(Actions.changeSalaryFilterValue, (state, { Salary }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      Salary: Salary
    }
  })),

  on(Actions.changeFavoriteFilterValue, (state, { checked }) => ({
    ...state,
    Filters: {
      ...state.Filters,
      Favorite: checked
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
    Filters: {
      Skip: 0,
      Take: 10,
      Expirence: ExpirenceEnum.All,
      Category: CategoryEnum.All,
      Location: LocationEnum.All,
      Education: EducationEnum.All,
      EmploymentType: EmploymentTypeEnum.All,
      Salary: SalaryEnum.All,
      Favorite: false
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
    Roles: {
      IsAdmin: false,
      IsPremium: false,
      IsRecruiter: false,
      IsSupport: false,
      IsUser: false
    },
    JobOffersCount: 0,
    ErrorMessage: ''
  }))
);
