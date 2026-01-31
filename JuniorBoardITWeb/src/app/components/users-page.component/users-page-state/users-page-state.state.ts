import { FiltersModel, UserModel } from '../users-page.models';

export const featureKeyUsersState = 'users-page-state';

export interface UsersState {
  Users: UserModel[];
  Filters: FiltersModel;
  UsersCount: number;
  ErrorMessage: string;
}
