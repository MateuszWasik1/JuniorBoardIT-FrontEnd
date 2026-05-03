import { FileTypeEnum } from 'src/app/enums/FileGenerator/FileTypeEnum';

export interface FiltersModel {
  StartDate: Date;
  EndDate: Date;
  DataType: FileTypeEnum;
  CGID: string;
}

export interface CompaniesModel {
  CGID: string;
  CName: string;
}
