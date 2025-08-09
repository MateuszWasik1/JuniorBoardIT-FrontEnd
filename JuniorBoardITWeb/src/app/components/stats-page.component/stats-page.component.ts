import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
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
  loadNumberOfActiveCompaniesOfferts,
  loadNumberOfCompaniesPublishedOfferts,
  loadNumberOfCompanyPublishedOfferts,
  loadNumberOfCompanyRecruiters,
  loadNumberOfRecruiterPublishedOfferts
} from './stats-page-state/stats-page-state.actions';
import { selectErrorMessage, selectFilters, selectStats } from './stats-page-state/stats-page-state.selectors';
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
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(
    public translations: TranslationService,
    private store: Store<AppState>,
    private errorHandler: MainUIErrorHandler,
    private cdr: ChangeDetectorRef
  ) {
    this.subscriptions = [];
  }
  ngOnInit() {
    this.store.dispatch(loadNumberOfRecruiterPublishedOfferts());

    this.subscriptions.push(
      this.Filters$.subscribe((filters) => {
        if (filters.DataType === StatsTypeEnum.NumberOfRecruiterPublishedOfferts) {
          this.store.dispatch(loadNumberOfRecruiterPublishedOfferts());
        } else if (filters.DataType === StatsTypeEnum.NumberOfCompanyPublishedOfferts) {
          this.store.dispatch(loadNumberOfCompanyPublishedOfferts());
        } else if (filters.DataType === StatsTypeEnum.NumberOfCompaniesPublishedOfferts) {
          this.store.dispatch(loadNumberOfCompaniesPublishedOfferts());
        } else if (filters.DataType === StatsTypeEnum.NumberOfActiveCompaniesOfferts) {
          this.store.dispatch(loadNumberOfActiveCompaniesOfferts());
        } else if (filters.DataType === StatsTypeEnum.NumberOfCompanyRecruiters) {
          this.store.dispatch(loadNumberOfCompanyRecruiters());
        }
      })
    );

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
