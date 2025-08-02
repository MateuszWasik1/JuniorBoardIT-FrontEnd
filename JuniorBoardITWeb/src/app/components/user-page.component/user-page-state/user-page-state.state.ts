import { User } from '../user-page.models';

export const featureKeyUserState = 'user-page-state';

export interface UserState {
  User: User;
  ErrorMessage: string;
}
