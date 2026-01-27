import { createAction, props } from '@ngrx/store';

import { BugStatusEnum } from 'src/app/enums/Bugs/BugStatusEnum';
import { BugTypeEnum } from 'src/app/enums/Bugs/BugTypeEnum';
import { PaginationDataModel, UserRolesModel } from 'src/app/models/general-models';

import { Bug, BugNote, BugNotesModel, BugsModel, BugStatus } from '../bugs-page.models';

export const loadBugs = createAction('[Bugs Page] Load Bugs');
export const loadBugsSuccess = createAction('[Bugs Page] Load Bugs Success', props<{ Bugs: BugsModel }>());
export const loadBugsError = createAction('[Bugs Page] Load Bugs Error', props<{ error: string }>());

export const loadBug = createAction('[Bugs Page] Load Bug', props<{ bgid: string }>());
export const loadBugSuccess = createAction('[Bugs Page] Load Bug Success', props<{ Bug: Bug }>());
export const loadBugError = createAction('[Bugs Page] Load Bug Error', props<{ error: string }>());

export const loadBugNotes = createAction('[Bugs Page] Load Bug Notes', props<{ bgid: string }>());
export const loadBugNotesSuccess = createAction(
  '[Bugs Page] Load Bug Notes Success',
  props<{ BugNotes: BugNotesModel }>()
);
export const loadBugNotesError = createAction('[Bugs Page] Load Bug Notes Error', props<{ error: string }>());

export const saveBug = createAction('[Bugs Page] Save Bug', props<{ bug: Bug }>());
export const saveBugSuccess = createAction('[Bugs Page] Save Bug Success', props<{ bug: Bug }>());
export const saveBugError = createAction('[Bugs Page] Save Bug Error', props<{ error: string }>());

export const saveBugNote = createAction('[Bugs Page] Save Bug Note', props<{ BugNote: BugNote }>());
export const saveBugNoteSuccess = createAction('[Bugs Page] Save Bug Note Success', props<{ BugNote: BugNote }>());
export const saveBugNoteError = createAction('[Bugs Page] Save Bug Note Error', props<{ error: string }>());

export const changeBugStatus = createAction('[Bugs Page] Change Bug Status', props<{ model: BugStatus }>());
export const changeBugStatusSuccess = createAction(
  '[Bugs Page] Change Bug Status Success',
  props<{ status: BugStatusEnum }>()
);
export const changeBugStatusError = createAction('[Bugs Page] Change Bug Status Error', props<{ error: string }>());

export const changeBugsType = createAction('[Bugs Page] Change Bugs Type', props<{ BugType: BugTypeEnum }>());

export const changeMessageFilterValue = createAction(
  '[Bugs Page] Change Message Filter Value',
  props<{ Message: string }>()
);

export const loadUserRoles = createAction('[Bugs Page] Load User Roles');
export const loadUserRolesSuccess = createAction(
  '[Bugs Page] Load User Roles Success',
  props<{ UserRoles: UserRolesModel }>()
);
export const loadUserRolesError = createAction('[Bugs Page] Load User Roles Error', props<{ error: string }>());

export const updatePaginationData = createAction(
  '[Bugs Page] Update Pagination Data',
  props<{ PaginationData: PaginationDataModel }>()
);
export const updateBugNotesPaginationData = createAction(
  '[Bugs Page] Update Bug Notes Pagination Data',
  props<{ PaginationData: PaginationDataModel }>()
);

export const cleanState = createAction('[Bugs Page] Clean State');
