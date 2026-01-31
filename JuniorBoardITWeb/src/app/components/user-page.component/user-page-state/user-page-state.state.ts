import { CompanyModel, UserModel } from '../user-page.models';

export const featureKeyUserState = 'user-page-state';

export interface UserState {
  User: UserModel;
  Companies: CompanyModel[];
  ErrorMessage: string;
}
