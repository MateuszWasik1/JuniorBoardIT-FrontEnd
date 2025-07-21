export const featureKeyUserState = 'user-page-state';

export interface UserState {
  User: {
    UID: number;
    UGID: string;
    URID: number;
    UFirstName: string;
    ULastName: string;
    UUserName: string;
    UEmail: string;
    UPhone: string;
  };
  ErrorMessage: string;
}
