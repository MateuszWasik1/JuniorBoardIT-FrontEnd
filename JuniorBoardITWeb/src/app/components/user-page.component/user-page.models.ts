export interface User {
  UID: number;
  UGID: string;
  URID: number;
  UFirstName: string;
  ULastName: string;
  UUserName: string;
  UEmail: string;
  UPhone: string;
  UCompany?: string;
  UCompanyGID?: string;
}

export interface Companies {
  CGID: string;
  CName: string;
}

export enum UserTranslations {
  'UFirstName' = 'User_First_Name',
  'ULastName' = 'User_Last_Name',
  'UUserName' = 'User_User_Name',
  'UEmail' = 'User_Email',
  'UPhone' = 'User_Phone',
  'UCompanyGID' = 'Users_User_Company'
}
