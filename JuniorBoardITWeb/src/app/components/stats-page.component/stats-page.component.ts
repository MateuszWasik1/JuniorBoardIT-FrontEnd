import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { firstValueFrom, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';
import {
  changeCategoryFilter,
  changeDataTypeFilter,
  changeEndDateFilter,
  changeStartDateFilter,
  cleanState,
  loadCategorySpendedMoneyBarChartStats,
  loadCustomStats,
  loadNotesBarChartStats,
  loadSavingBarChartStats,
  loadTaskSpendedMoneyBarChartStats
} from './stats-page-state/stats-page-state.actions';
import {
  selectErrorMessage,
  selectErrors,
  selectFilters,
  selectStats
} from './stats-page-state/stats-page-state.selectors';
import { ChartData, ChartOptions } from 'chart.js';
import { TranslationService } from 'src/app/services/translate.service';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { ChartModule } from 'primeng/chart';
import { AsyncPipe } from '@angular/common';
import { SelectObjectModel } from 'src/app/models/general-models';
import { StatsTypeEnum } from 'src/app/enums/Stats/StatsTypeEnum';

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss'],
  standalone: true,
  imports: [AsyncPipe, ChartModule]
})
export class StatsPageComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[];
  public basicData: any;

  public barChartOptions: ChartOptions = {
    scales: {
      x: {},
      y: {
        min: 0,
        ticks: {
          precision: 0
        }
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    }
  };

  public dataTypes: SelectObjectModel[] = [
    { id: StatsTypeEnum.NumberOfRecruiterPublishedOfferts, name: 'Oferty opublikowane przez rekrutera' },
    { id: StatsTypeEnum.NumberOfCompanyPublishedOfferts, name: 'Oferty opublikowane przez firmę' },
    { id: StatsTypeEnum.NumberOfCompaniesPublishedOfferts, name: 'Oferty opublikowane przez wszystkie firmy' },
    { id: StatsTypeEnum.NumberOfActiveCompaniesOfferts, name: 'Aktywne oferty firmy' },
    { id: StatsTypeEnum.NumberOfCompanyRecruiters, name: 'Aktywni rekruterzy firmy' }
  ];

  public Stats$ = this.store.select(selectStats);
  public Filters$ = this.store.select(selectFilters);
  public IsStatsError$ = this.store.select(selectErrors);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(
    public store: Store<AppState>,
    public translations: TranslationService,
    public errorHandler: MainUIErrorHandler,
    private cdr: ChangeDetectorRef
  ) {
    this.subscriptions = [];
  }
  ngOnInit() {
    // this.store.dispatch(loadSavingBarChartStats());
    // this.store.dispatch(loadCategories());
    this.store.dispatch(loadCustomStats());
    this.subscriptions.push(
      this.Filters$.subscribe((filters) => {
        // if (filters.DataType == 'savings') this.store.dispatch(loadSavingBarChartStats());
        // if (filters.DataType == 'task-money') this.store.dispatch(loadTaskSpendedMoneyBarChartStats());
        // if (filters.DataType == 'category') this.store.dispatch(loadCategorySpendedMoneyBarChartStats());
        // if (filters.DataType == 'notes') this.store.dispatch(loadNotesBarChartStats());
      })
    );

    // this.subscriptions.push(
    //   this.IsStatsError$.subscribe((isError) => {
    //     if (isError) this.store.dispatch(loadCustomStats());
    //   })
    // );

    this.subscriptions.push(
      this.ErrorMessage$.subscribe((error) => {
        this.errorHandler.HandleException(error);
      })
    );

    this.subscriptions.push(
      this.Stats$.subscribe((stats) => {
        this.basicData = JSON.parse(JSON.stringify(stats as ChartData));
        this.cdr.detectChanges();
      })
    );
  }

  public setMonthAndYear(normalizedMonth: any, datepicker: MatDatepicker<Moment>, isStartDate: boolean) {
    if (isStartDate) {
      this.store.dispatch(changeStartDateFilter({ startDate: normalizedMonth.value }));
    } else {
      this.store.dispatch(changeEndDateFilter({ endDate: normalizedMonth.value }));
    }

    datepicker.close();
  }

  public changeDataType = (dataType: any) => this.store.dispatch(changeDataTypeFilter({ dataType: dataType.value }));

  public changeCategory = (dataType: any) => this.store.dispatch(changeCategoryFilter({ category: dataType.value }));

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(cleanState());
  }
}
