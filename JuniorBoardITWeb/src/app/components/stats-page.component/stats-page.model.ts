import { StatsChartTypeEnum } from 'src/app/enums/Stats/StatsChartTypeEnum';
import { StatsTypeEnum } from 'src/app/enums/Stats/StatsTypeEnum';

export interface Filters {
  StartDate: Date;
  EndDate: Date;
  Date: Date;
  ChartType: StatsChartTypeEnum;
  DataType: StatsTypeEnum;
  CGID: string;
}

export interface Companies {
  CGID: string;
  CName: string;
}
