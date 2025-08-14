import { createAction, props } from '@ngrx/store';

export const loadJobOffer = createAction('[JobOffers Page] Load JobOffer', props<{ JOGID: any }>());
export const loadJobOfferSuccess = createAction('[JobOffers Page] Load JobOffer Success', props<{ JobOffer: any }>());
export const loadJobOfferError = createAction('[JobOffers Page] Load JobOffer Error', props<{ error: any }>());

export const loadJobOffers = createAction('[JobOffers Page] Load JobOffers');
export const loadJobOffersSuccess = createAction(
  '[JobOffers Page] Load JobOffers Success',
  props<{ JobOffers: any }>()
);
export const loadJobOffersError = createAction('[JobOffers Page] Load JobOffers Error', props<{ error: any }>());

export const loadUserData = createAction('[JobOffers Page] Load User Data');
export const loadUserDataSuccess = createAction('[JobOffers Page] Load User Data Success', props<{ User: any }>());
export const loadUserDataError = createAction('[JobOffers Page] Load User Data Error', props<{ error: any }>());

export const loadCompany = createAction('[JobOffers Page] Load Company', props<{ CGID: any }>());
export const loadCompanySuccess = createAction('[JobOffers Page] Load Company Success', props<{ Company: any }>());
export const loadCompanyError = createAction('[JobOffers Page] Load Company Error', props<{ error: any }>());

export const addJobOffer = createAction('[JobOffers Page] Add JobOffer', props<{ JobOffer: any }>());
export const addJobOfferSuccess = createAction('JobOffers Page] Add JobOffer Success');
export const addJobOfferError = createAction('[JobOffers Page] Add JobOffer Error', props<{ error: any }>());

export const applyForJobOffer = createAction('[JobOffers Page] Apply For Job Offer', props<{ ApplyData: any }>());
export const applyForJobOfferSuccess = createAction('[JobOffers Page] Apply For Job Offer Success');
export const applyForJobOfferError = createAction(
  '[JobOffers Page] Apply For Job Offer Error',
  props<{ error: any }>()
);

export const updateJobOffer = createAction('[JobOffers Page] Update JobOffer', props<{ JobOffer: any }>());
export const updateJobOfferSuccess = createAction('JobOffers Page] Update JobOffer Success');
export const updateJobOfferError = createAction('[JobOffers Page] Update JobOffer Error', props<{ error: any }>());

export const deleteJobOffer = createAction('[JobOffers Page] Delete JobOffer', props<{ JOGID: any }>());
export const deleteJobOfferSuccess = createAction('JobOffers Page] Delete JobOffer Success', props<{ JOGID: any }>());
export const deleteJobOfferError = createAction('[JobOffers Page] Delete JobOffer Error', props<{ error: any }>());

export const ChangeEducationFilterValue = createAction(
  '[JobOffers Page] Change Education Filter Value',
  props<{ value: any }>()
);

export const ChangeFavoriteFilterValue = createAction(
  '[JobOffers Page] Change Favorite Filter Value',
  props<{ checked: any }>()
);

export const updatePaginationDataJobOffers = createAction(
  '[JobOffers Page] Update Pagination Data JobOffers',
  props<{ PaginationData: any }>()
);

export const cleanState = createAction('[JobOffers Page] Clean State');
