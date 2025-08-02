import { Bug, BugFilters, BugNotes, BugNotesFilters, Bugs } from '../bugs-page.models';

export const featureKeyBugsState = 'bugs-page-state';

export interface BugsState {
  Bugs: Bugs[];
  Bug: Bug;
  BugNotes: BugNotes[];
  Filters: BugFilters;
  FiltersBugNotes: BugNotesFilters;
  BugsCount: number;
  BugsNotesCount: number;
  UserRoles: {
    IsSupport: boolean;
    IsAdmin: boolean;
  };
  ErrorMessage: string;
}
