import { Companies, User } from '../user-page.models';

export const featureKeyUserState = 'user-page-state';

export interface UserState {
  User: User;
  Companies: Companies[];
  ErrorMessage: string;
}
