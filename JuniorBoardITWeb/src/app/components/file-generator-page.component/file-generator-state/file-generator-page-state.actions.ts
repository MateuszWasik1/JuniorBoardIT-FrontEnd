import { createAction, props } from '@ngrx/store';

import { CompaniesModel as UserCompaniesModel } from '../../user-page.component/user-page.models';
import { FileTypeEnum } from 'src/app/enums/FileGenerator/FileTypeEnum';

export const loadFileSuccess = createAction('[File Generator Page] Load File Success');
export const loadFileError = createAction('[File Generator Page] Load File Error', props<{ Error: string }>());

export const downloadApplicationsFile = createAction('[File Generator Page] Download Applications File');

export const loadCompanies = createAction('[File Generator Page] Load Companies');
export const loadCompaniesSuccess = createAction(
  '[File Generator Page] Load Companies Success',
  props<{ Companies: UserCompaniesModel }>()
);
export const loadCompaniesError = createAction(
  '[File Generator Page] Load Companies Error',
  props<{ Error: string }>()
);

export const changeStartDateFilter = createAction(
  '[File Generator Page] Change Start Date Filter',
  props<{ StartDate: Date }>()
);

export const changeEndDateFilter = createAction(
  '[File Generator Page] Change End Date Filter',
  props<{ EndDate: Date }>()
);

export const changeDataTypeFilter = createAction(
  '[File Generator Page] Change Data Type Filter',
  props<{ DataType: FileTypeEnum }>()
);

export const changeCGIDFilter = createAction('[File Generator Page] Change CGID Filter', props<{ CGID: string }>());

export const cleanState = createAction('[File Generator Page] Clean State');
