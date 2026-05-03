import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';
import { AppState } from 'src/app/app.state';

import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { TranslationService } from 'src/app/services/translate.service';
import {
  selectCompanies,
  selectErrorMessage,
  selectFilters
} from './file-generator-state/file-generator-page-state.selectors';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  changeCGIDFilter,
  changeDataTypeFilter,
  changeEndDateFilter,
  changeStartDateFilter,
  cleanState,
  downloadApplicationsFile,
  loadCompanies
} from './file-generator-state/file-generator-page-state.actions';
import { AsyncPipe } from '@angular/common';
import { DatePicker } from 'primeng/datepicker';
import { FileTypeEnum } from 'src/app/enums/FileGenerator/FileTypeEnum';
import { SelectObjectModel } from 'src/app/models/general-models';

interface FormModel {
  StartDate: FormControl<Date>;
  EndDate: FormControl<Date>;
  CGID: FormControl<string>;
}

@Component({
  selector: 'app-file-generator-page',
  templateUrl: './file-generator-page.component.html',
  standalone: true,
  imports: [AsyncPipe, DatePicker, ButtonModule, SelectModule, InputTextModule, TooltipModule, ReactiveFormsModule]
})
export class FileGeneratorPageComponent implements OnInit, OnDestroy {
  public translations = inject(TranslationService);
  private store = inject(Store<AppState>);
  public router = inject(Router);
  public errorHandler = inject(MainUIErrorHandler);

  public subscriptions: Subscription[];

  public filterForm: FormGroup<FormModel>;

  public dataTypes: SelectObjectModel[] = [{ id: FileTypeEnum.Applications, name: 'Aplikacje użytkowników' }];

  public Filters$ = this.store.select(selectFilters);
  public Companies$ = this.store.select(selectCompanies);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor() {
    this.subscriptions = [];
    this.filterForm = this.InitFilterForm();
  }

  public ngOnInit(): void {
    this.store.dispatch(loadCompanies());

    this.subscriptions.push(
      this.Filters$.subscribe((filters) => {
        this.filterForm.patchValue({
          StartDate: filters.StartDate,
          EndDate: filters.EndDate,
          CGID: filters.CGID
        });

        if (filters.DataType === FileTypeEnum.Applications) {
          this.store.dispatch(downloadApplicationsFile());
        }
      })
    );
  }

  public ChangeStartDate = (StartDate: Date) => this.store.dispatch(changeStartDateFilter({ StartDate: StartDate }));

  public ChangeEndDate = (EndDate: Date) => this.store.dispatch(changeEndDateFilter({ EndDate: EndDate }));

  public ChangeDataType = (DataType: FileTypeEnum) => this.store.dispatch(changeDataTypeFilter({ DataType: DataType }));

  public ChangeCGID = (CGID: string) => this.store.dispatch(changeCGIDFilter({ CGID: CGID }));

  private InitFilterForm = (): FormGroup<FormModel> => {
    return new FormGroup<FormModel>({
      StartDate: new FormControl<Date>(new Date(), { nonNullable: true }),
      EndDate: new FormControl<Date>(new Date(), { nonNullable: true }),
      CGID: new FormControl<string>('', { nonNullable: true })
    });
  };

  public ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(cleanState());
  }
}
