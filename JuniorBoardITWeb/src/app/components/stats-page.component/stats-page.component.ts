import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
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
  loadNumberOfRecruiterPublishedOfferts
} from './stats-page-state/stats-page-state.actions';
import {
  selectCompanies,
  selectErrorMessage,
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
import { DatePickerModule } from 'primeng/datepicker';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StatsChartTypeEnum } from 'src/app/enums/Stats/StatsChartTypeEnum';
import { SelectModule } from 'primeng/select';

type FormModel = {
  StartDate: FormControl<Date>;
  EndDate: FormControl<Date>;
  Date: FormControl<Date>;
  ChartType: FormControl<StatsChartTypeEnum>;
  DataType: FormControl<StatsTypeEnum>;
  CGID: FormControl<string>;
};

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss'],
  standalone: true,
  imports: [AsyncPipe, ChartModule, ReactiveFormsModule, SelectModule, DatePickerModule]
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

  public filterForm: FormGroup<FormModel>;

  public dataTypes: SelectObjectModel[] = [
    { id: StatsTypeEnum.NumberOfRecruiterPublishedOfferts, name: 'Oferty opublikowane przez rekrutera' },
    { id: StatsTypeEnum.NumberOfCompanyPublishedOfferts, name: 'Oferty opublikowane przez firmę' },
    { id: StatsTypeEnum.NumberOfCompaniesPublishedOfferts, name: 'Oferty opublikowane przez wszystkie firmy' },
    { id: StatsTypeEnum.NumberOfActiveCompaniesOfferts, name: 'Aktywne oferty firmy' },
    { id: StatsTypeEnum.NumberOfCompanyRecruiters, name: 'Aktywni rekruterzy firmy' }
  ];

  public chartTypes: SelectObjectModel[] = [{ id: 0, name: StatsChartTypeEnum.Bar }];

  public Stats$ = this.store.select(selectStats);
  public Filters$ = this.store.select(selectFilters);
  public Companies$ = this.store.select(selectCompanies);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(
    public translations: TranslationService,
    private store: Store<AppState>,
    private errorHandler: MainUIErrorHandler,
    private cdr: ChangeDetectorRef
  ) {
    this.subscriptions = [];

    this.filterForm = this.InitJobOfferForm();
  }
  ngOnInit() {
    this.store.dispatch(loadNumberOfRecruiterPublishedOfferts());
    this.store.dispatch(loadCompanies());

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

  public ChangeDataType = (DataType: any) => this.store.dispatch(changeDataTypeFilter({ DataType: DataType.value }));

  public ChangeChartType = (ChartType: any) =>
    this.store.dispatch(changeChartTypeFilter({ ChartType: ChartType.value }));

  public ChangeCGID = (CGID: any) => this.store.dispatch(changeCGIDFilter({ CGID: CGID.value }));

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

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(cleanState());
  }
}
