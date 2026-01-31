import { createAction, props } from '@ngrx/store';

import { CategoryEnum } from 'src/app/enums/JobOffers/CategoryEnum';
import { EducationEnum } from 'src/app/enums/JobOffers/EducationEnum';
import { EmploymentTypeEnum } from 'src/app/enums/JobOffers/EmploymentTypeEnum';
import { ExpirenceEnum } from 'src/app/enums/JobOffers/ExpirenceEnum';
import { LocationEnum } from 'src/app/enums/JobOffers/LocationEnum';
import { SalaryEnum } from 'src/app/enums/JobOffers/SalaryEnum';
import { PaginationDataModel } from 'src/app/models/general-models';

import {
  ApplyForJobOfferModel,
  CompanyModel,
  JobOfferModel,
  JobOffersModel,
  LoadJobOffer,
  RolesModel,
  UserModel
} from '../job-offers-page.models';

export const loadJobOffer = createAction('[JobOffers Page] Load JobOffer', props<{ JOGID: string }>());
export const loadJobOfferSuccess = createAction(
  '[JobOffers Page] Load JobOffer Success',
  props<{ JobOffer: LoadJobOffer }>()
);
export const loadJobOfferError = createAction('[JobOffers Page] Load JobOffer Error', props<{ Error: string }>());

export const loadJobOffers = createAction('[JobOffers Page] Load JobOffers');
export const loadJobOffersSuccess = createAction(
  '[JobOffers Page] Load JobOffers Success',
  props<{ JobOffers: JobOffersModel }>()
);
export const loadJobOffersError = createAction('[JobOffers Page] Load JobOffers Error', props<{ Error: string }>());

export const loadUserData = createAction('[JobOffers Page] Load User Data');
export const loadUserDataSuccess = createAction(
  '[JobOffers Page] Load User Data Success',
  props<{ User: UserModel }>()
);
export const loadUserDataError = createAction('[JobOffers Page] Load User Data Error', props<{ Error: string }>());

export const loadCompany = createAction('[JobOffers Page] Load Company', props<{ CGID: string }>());
export const loadCompanySuccess = createAction(
  '[JobOffers Page] Load Company Success',
  props<{ Company: CompanyModel }>()
);
export const loadCompanyError = createAction('[JobOffers Page] Load Company Error', props<{ Error: string }>());

export const loadRoles = createAction('[JobOffers Page] Load Roles');
export const loadRolesSuccess = createAction('[JobOffers Page] Load Roles Success', props<{ Roles: RolesModel }>());
export const loadRolesError = createAction('[JobOffers Page] Load Roles Error', props<{ Error: string }>());

export const addJobOffer = createAction('[JobOffers Page] Add JobOffer', props<{ JobOffer: JobOfferModel }>());
export const addJobOfferSuccess = createAction('JobOffers Page] Add JobOffer Success');
export const addJobOfferError = createAction('[JobOffers Page] Add JobOffer Error', props<{ Error: string }>());

export const applyForJobOffer = createAction(
  '[JobOffers Page] Apply For Job Offer',
  props<{ ApplyData: ApplyForJobOfferModel }>()
);
export const applyForJobOfferSuccess = createAction('[JobOffers Page] Apply For Job Offer Success');
export const applyForJobOfferError = createAction(
  '[JobOffers Page] Apply For Job Offer Error',
  props<{ Error: string }>()
);

export const addToFavorite = createAction('[JobOffers Page] Add To Favorite', props<{ JOGID: string }>());
export const addToFavoriteSuccess = createAction('[JobOffers Page] Add To Favorite Success');
export const addToFavoriteError = createAction('[JobOffers Page] Add To Favorite Error', props<{ Error: string }>());

export const updateJobOffer = createAction('[JobOffers Page] Update JobOffer', props<{ JobOffer: JobOfferModel }>());
export const updateJobOfferSuccess = createAction('JobOffers Page] Update JobOffer Success');
export const updateJobOfferError = createAction('[JobOffers Page] Update JobOffer Error', props<{ Error: string }>());

export const deleteJobOffer = createAction('[JobOffers Page] Delete JobOffer', props<{ JOGID: string }>());
export const deleteJobOfferSuccess = createAction(
  'JobOffers Page] Delete JobOffer Success',
  props<{ JOGID: string }>()
);
export const deleteJobOfferError = createAction('[JobOffers Page] Delete JobOffer Error', props<{ Error: string }>());

export const changeExpirenceFilterValue = createAction(
  '[JobOffers Page] Change Expirence Filter Value',
  props<{ Expirence: ExpirenceEnum }>()
);

export const changeCategoryFilterValue = createAction(
  '[JobOffers Page] Change Category Filter Value',
  props<{ Category: CategoryEnum }>()
);

export const changeLocationFilterValue = createAction(
  '[JobOffers Page] Change Location Filter Value',
  props<{ Location: LocationEnum }>()
);

export const changeEducationFilterValue = createAction(
  '[JobOffers Page] Change Education Filter Value',
  props<{ Education: EducationEnum }>()
);

export const changeEmploymentTypeFilterValue = createAction(
  '[JobOffers Page] Change EmploymentType Filter Value',
  props<{ EmploymentType: EmploymentTypeEnum }>()
);

export const changeSalaryFilterValue = createAction(
  '[JobOffers Page] Change Salary Filter Value',
  props<{ Salary: SalaryEnum }>()
);

export const changeFavoriteFilterValue = createAction(
  '[JobOffers Page] Change Favorite Filter Value',
  props<{ checked: boolean }>()
);

export const updatePaginationDataJobOffers = createAction(
  '[JobOffers Page] Update Pagination Data JobOffers',
  props<{ PaginationData: PaginationDataModel }>()
);

export const cleanState = createAction('[JobOffers Page] Clean State');
