export interface UserModel {
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

export interface UsersModel {
  List: UserModel[];
  Count: number;
}

export interface FiltersModel {
  Skip: number;
  Take: number;
  Name: string;
  HasCompany: boolean;
  Role: number;
}
