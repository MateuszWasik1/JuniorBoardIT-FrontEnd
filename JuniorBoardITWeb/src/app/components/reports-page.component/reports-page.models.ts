import { ReportsStatusEnum } from 'src/app/enums/Reports/ReportsStatusEnum';
import { ReportsTypeEnum } from 'src/app/enums/Reports/ReportsTypeEnum';

export interface ReportsListModel {
  List: ReportsModel[];
  Count: number;
}

export interface ReportsModel {
  RID: number;
  RGID: string;
  RJOGID: string;
  RReporterGID: string;
  RSupportGID: string;
  RDate: Date;
  RReasons: string;
  RText: string;
  RStatus: ReportsStatusEnum;
  RReporterName: string;
  RSupportName: string;
}

export interface ReportModel {
  RID: number;
  RGID: string;
  RJOGID: string;
  RReporterGID: string;
  RSupportGID: string;
  RDate: Date;
  RReasons: string;
  RText: string;
  RStatus: ReportsStatusEnum;
}

export interface AddReportModel {
  RJOGID: string;
  RReasons: object;
  RText: string;
}

export interface FiltersModel {
  Skip: number;
  Take: number;
  ReportType: ReportsTypeEnum;
  Message: string;
}

export enum ReportTranslations {
  'ReportStatus' = 'Reports_Report_Card_New_Status'
}
