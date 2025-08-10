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
