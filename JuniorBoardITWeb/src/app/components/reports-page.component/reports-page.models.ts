import { ReportsStatusEnum } from 'src/app/enums/Reports/ReportsStatusEnum';

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
}
