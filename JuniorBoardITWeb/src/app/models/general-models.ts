export interface SelectObjectModel {
  id: number;
  name: string;
}

export interface ReportReasonsModel {
  name: string;
  value: string;
}

export interface PaginationDataModel {
  Skip: number;
  Take: number;
}

export interface UserRolesModel {
  IsAdmin: boolean;
  IsPremium: boolean;
  IsRecruiter: boolean;
  IsSupport: boolean;
  IsUser: boolean;
}
