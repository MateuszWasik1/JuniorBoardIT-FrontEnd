import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';
import { Subscription } from 'rxjs';

import { ReportsStatusEnum } from 'src/app/enums/Reports/ReportsStatusEnum';
import { ReportsTypeEnum } from 'src/app/enums/Reports/ReportsTypeEnum';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { PaginationDataModel, SelectObjectModel } from 'src/app/models/general-models';
import { TranslationService } from 'src/app/services/translate.service';

import { AppState } from '../../app.state';
import {
  changeMessageFilterValue,
  ChangeReportTypeFilterValue,
  cleanState,
  loadReports,
  updatePaginationDataReports
} from './reports-page-state/reports-page-state.actions';
import {
  selectCount,
  selectErrorMessage,
  selectFilters,
  selectReports
} from './reports-page-state/reports-page-state.selectors';
import { PaginatorComponent } from '../shared/paginator.component/paginator.component';

interface FormFilterModel {
  ReportType: FormControl<ReportsTypeEnum>;
}

@Component({
  selector: 'app-tasks-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    PaginatorComponent,
    CardModule,
    SelectModule,
    ReactiveFormsModule,
    ButtonModule,
    MessageModule,
    TooltipModule,
    InputTextModule
  ]
})
export class ReportsPageComponent implements OnInit, OnDestroy {
  public store = inject(Store<AppState>);
  public router = inject(Router);
  public translations = inject(TranslationService);
  public errorHandler = inject(MainUIErrorHandler);

  public subscriptions: Subscription[];
  public reportsStatusType: SelectObjectModel[] = [
    { id: ReportsStatusEnum.New, name: 'Nowe' },
    { id: ReportsStatusEnum.InVerification, name: 'W weryfikacji' },
    { id: ReportsStatusEnum.Rejected, name: 'Odrzucone' },
    { id: ReportsStatusEnum.Accepted, name: 'Zaakceptowane' }
  ];
  public reportsType: SelectObjectModel[] = [
    { id: ReportsTypeEnum.New, name: 'Nowe' },
    { id: ReportsTypeEnum.ImVerificator, name: 'Jestem weryfikatorem' },
    { id: ReportsTypeEnum.All, name: 'Wszystkie' }
  ];
  public count = 0;

  public formFilter: FormGroup<FormFilterModel>;

  public Filters$ = this.store.select(selectFilters);
  public Count$ = this.store.select(selectCount);
  public Reports$ = this.store.select(selectReports);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private debounceTimer: any;

  constructor() {
    this.subscriptions = [];
    this.formFilter = this.InitReportForm();
  }

  ngOnInit(): void {
    this.subscriptions.push(this.Filters$.subscribe(() => this.store.dispatch(loadReports())));

    this.subscriptions.push(this.ErrorMessage$.subscribe((error) => this.errorHandler.HandleException(error)));

    this.subscriptions.push(this.Count$.subscribe((count) => (this.count = count)));
  }

  public DisplayStatus = (reportStatus: ReportsStatusEnum) => this.reportsStatusType[reportStatus].name;

  public DisplaySeverity = (reportStatus: ReportsStatusEnum) => {
    switch (reportStatus) {
      case ReportsStatusEnum.New: {
        return 'secondary';
      }
      case ReportsStatusEnum.InVerification: {
        return 'info';
      }
      case ReportsStatusEnum.Rejected: {
        return 'error';
      }
      case ReportsStatusEnum.Accepted: {
        return 'success';
      }
      default: {
        return 'secondary';
      }
    }
  };

  public CheckReport = (RGID: string) => this.router.navigate([`report/${RGID}`]);

  public ChangeReportTypeFilterValue = (ReportType: ReportsTypeEnum) =>
    this.store.dispatch(ChangeReportTypeFilterValue({ ReportType: ReportType }));

  public ChangeMessageFilterValue = (event: Event) => {
    const message = (event.target as HTMLInputElement).value;

    clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      this.store.dispatch(changeMessageFilterValue({ Message: message }));
    }, 1000);
  };

  public UpdatePaginationData = (PaginationData: PaginationDataModel) =>
    this.store.dispatch(updatePaginationDataReports({ PaginationData: PaginationData }));

  private InitReportForm = (): FormGroup<FormFilterModel> => {
    return new FormGroup<FormFilterModel>({
      ReportType: new FormControl<ReportsTypeEnum>(ReportsTypeEnum.New, { nonNullable: true })
    });
  };

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(cleanState());
  }
}
