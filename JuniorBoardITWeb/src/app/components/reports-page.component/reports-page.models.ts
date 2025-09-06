import { ReportsStatusEnum } from 'src/app/enums/Reports/ReportsStatusEnum';
import { ReportsTypeEnum } from 'src/app/enums/Reports/ReportsTypeEnum';

export interface Reports {
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

export interface Report {
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

export interface Filters {
  Skip: number;
  Take: number;
  ReportType: ReportsTypeEnum;
  Message: string;
}

export enum ReportTranslations {
  'ReportStatus' = 'Reports_Report_Card_New_Status'
}
