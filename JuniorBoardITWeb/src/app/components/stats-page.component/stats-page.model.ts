import { ChartType } from 'chart.js';
import { StatsTypeEnum } from 'src/app/enums/Stats/StatsTypeEnum';

export interface Filters {
  StartDate: any;
  EndDate: any;
  Date: any;
  ChartType: ChartType;
  DataType: StatsTypeEnum;
}
