import { BubbleDataPoint, ChartData, ChartTypeRegistry, Point } from 'chart.js';

import { UserRolesModel } from 'src/app/models/general-models';

import { CompaniesModel, FiltersModel } from '../stats-page.model';

export const featureKeyStatsState = 'stats-page-state';

export interface StatsState {
  Stats: ChartData<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown>;
  Filters: FiltersModel;
  Companies: CompaniesModel[];
  UserRoles: UserRolesModel;
  ErrorMessage: string;
}
