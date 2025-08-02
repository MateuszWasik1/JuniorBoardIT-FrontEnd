import { Filters, Users } from '../users-page.models';

export const featureKeyUsersState = 'users-page-state';

export interface UsersState {
  Users: Users[];
  Filters: Filters;
  UsersCount: number;
  ErrorMessage: string;
}
