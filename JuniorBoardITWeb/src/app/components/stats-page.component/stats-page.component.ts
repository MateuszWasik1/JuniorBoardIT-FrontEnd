import { AsyncPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ChartData, ChartOptions } from 'chart.js';
import { ChartModule } from 'primeng/chart';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { Subscription } from 'rxjs';

import { StatsChartTypeEnum } from 'src/app/enums/Stats/StatsChartTypeEnum';
import { StatsTypeEnum } from 'src/app/enums/Stats/StatsTypeEnum';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { SelectObjectModel } from 'src/app/models/general-models';
import { TranslationService } from 'src/app/services/translate.service';

import { AppState } from '../../app.state';
import {
  changeCGIDFilter,
  changeChartTypeFilter,
  changeDataTypeFilter,
  changeDateFilter,
  changeEndDateFilter,
  changeStartDateFilter,
  cleanState,
  loadCompanies,
  loadNumberOfActiveCompaniesOfferts,
  loadNumberOfCompaniesPublishedOfferts,
  loadNumberOfCompanyPublishedOfferts,
  loadNumberOfCompanyRecruiters,
  loadNumberOfRecruiterPublishedOfferts,
  loadUserRoles
} from './stats-page-state/stats-page-state.actions';
import {
  selectCompanies,
  selectErrorMessage,
  selectFilters,
  selectStats,
  selectUserRoles
} from './stats-page-state/stats-page-state.selectors';

interface FormModel {
  StartDate: FormControl<Date>;
  EndDate: FormControl<Date>;
  Date: FormControl<Date>;
  ChartType: FormControl<StatsChartTypeEnum>;
  DataType: FormControl<StatsTypeEnum>;
  CGID: FormControl<string>;
}

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss'],
  standalone: true,
  imports: [AsyncPipe, ChartModule, ReactiveFormsModule, SelectModule, DatePickerModule]
})
export class StatsPageComponent implements OnInit, OnDestroy {
  public translations = inject(TranslationService);
  private store = inject(Store<AppState>);
  private errorHandler = inject(MainUIErrorHandler);
  private cdr = inject(ChangeDetectorRef);

  public subscriptions: Subscription[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  public filterForm: FormGroup<FormModel>;

  public dataTypes: SelectObjectModel[] = [
    { id: StatsTypeEnum.NumberOfCompaniesPublishedOfferts, name: 'Oferty opublikowane przez wszystkie firmy' },
    { id: StatsTypeEnum.NumberOfActiveCompaniesOfferts, name: 'Aktywne oferty firmy' }
  ];

  public chartTypes: SelectObjectModel[] = [{ id: 0, name: StatsChartTypeEnum.Bar }];

  public Stats$ = this.store.select(selectStats);
  public Filters$ = this.store.select(selectFilters);
  public Companies$ = this.store.select(selectCompanies);
  public UserRoles$ = this.store.select(selectUserRoles);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor() {
    this.subscriptions = [];

    this.filterForm = this.InitJobOfferForm();
  }
  public ngOnInit() {
    this.store.dispatch(loadNumberOfRecruiterPublishedOfferts());
    this.store.dispatch(loadCompanies());
    this.store.dispatch(loadUserRoles());

    this.subscriptions.push(
      this.UserRoles$.subscribe((roles) => {
        if (roles.IsAdmin || roles.IsSupport) {
          this.dataTypes = [
            { id: StatsTypeEnum.NumberOfRecruiterPublishedOfferts, name: 'Oferty opublikowane przez rekrutera' },
            { id: StatsTypeEnum.NumberOfCompanyPublishedOfferts, name: 'Oferty opublikowane przez firmę' },
            { id: StatsTypeEnum.NumberOfCompaniesPublishedOfferts, name: 'Oferty opublikowane przez wszystkie firmy' },
            { id: StatsTypeEnum.NumberOfActiveCompaniesOfferts, name: 'Aktywne oferty firmy' },
            { id: StatsTypeEnum.NumberOfCompanyRecruiters, name: 'Aktywni rekruterzy firmy' }
          ];
        } else if (roles.IsRecruiter) {
          this.dataTypes = [
            { id: StatsTypeEnum.NumberOfRecruiterPublishedOfferts, name: 'Oferty opublikowane przez rekrutera' },
            { id: StatsTypeEnum.NumberOfCompanyPublishedOfferts, name: 'Oferty opublikowane przez firmę' },
            { id: StatsTypeEnum.NumberOfCompaniesPublishedOfferts, name: 'Oferty opublikowane przez wszystkie firmy' },
            { id: StatsTypeEnum.NumberOfActiveCompaniesOfferts, name: 'Aktywne oferty firmy' }
          ];
        }
      })
    );

    this.subscriptions.push(
      this.Filters$.subscribe((filters) => {
        this.filterForm.patchValue({
          StartDate: filters.StartDate,
          EndDate: filters.EndDate,
          Date: filters.Date,
          CGID: filters.CGID
        });

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

  public ChangeStartDate = (StartDate: Date) => this.store.dispatch(changeStartDateFilter({ StartDate: StartDate }));

  public ChangeEndDate = (EndDate: Date) => this.store.dispatch(changeEndDateFilter({ EndDate: EndDate }));

  public ChangeDate = (Date: Date) => this.store.dispatch(changeDateFilter({ Date: Date }));

  public ChangeDataType = (DataType: StatsTypeEnum) =>
    this.store.dispatch(changeDataTypeFilter({ DataType: DataType }));

  public ChangeChartType = (ChartType: StatsChartTypeEnum) =>
    this.store.dispatch(changeChartTypeFilter({ ChartType: ChartType }));

  public ChangeCGID = (CGID: string) => this.store.dispatch(changeCGIDFilter({ CGID: CGID }));

  private InitJobOfferForm = (): FormGroup<FormModel> => {
    return new FormGroup<FormModel>({
      StartDate: new FormControl<Date>(new Date(), { nonNullable: true }),
      EndDate: new FormControl<Date>(new Date(), { nonNullable: true }),
      Date: new FormControl<Date>(new Date(), { nonNullable: true }),
      ChartType: new FormControl<StatsChartTypeEnum>(StatsChartTypeEnum.Bar, { nonNullable: true }),
      DataType: new FormControl<StatsTypeEnum>(StatsTypeEnum.NumberOfRecruiterPublishedOfferts, { nonNullable: true }),
      CGID: new FormControl<string>('', { nonNullable: true })
    });
  };

  public ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(cleanState());
  }
}
