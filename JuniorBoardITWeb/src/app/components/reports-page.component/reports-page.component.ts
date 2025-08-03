import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { TranslationService } from 'src/app/services/translate.service';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { Router } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { PaginatorComponent } from '../shared/paginator.component/paginator.component';
import {
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
import { CardModule } from 'primeng/card';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReportsTypeEnum } from 'src/app/enums/Reports/ReportsTypeEnum';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { ReportsStatusEnum } from 'src/app/enums/Reports/ReportsStatusEnum';

import { MessageModule } from 'primeng/message';
import { SelectObjectModel } from 'src/app/models/general-models';
type FormFilterModel = {
  ReportType: FormControl<ReportsTypeEnum>;
};

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
    MessageModule
  ]
})
export class ReportsPageComponent implements OnInit, OnDestroy {
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
  public count: number = 0;

  public formFilter: FormGroup<FormFilterModel>;

  public Filters$ = this.store.select(selectFilters);
  public Count$ = this.store.select(selectCount);
  public Reports$ = this.store.select(selectReports);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(
    public store: Store<AppState>,
    public router: Router,
    public translations: TranslationService,
    public errorHandler: MainUIErrorHandler
  ) {
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

  public CheckReport = (RGID: any) => this.router.navigate([`report/${RGID}`]);

  public ChangeReportTypeFilterValue = (event: any) =>
    this.store.dispatch(ChangeReportTypeFilterValue({ ReportType: event.value as ReportsTypeEnum }));

  public UpdatePaginationData = (PaginationData: any) =>
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
