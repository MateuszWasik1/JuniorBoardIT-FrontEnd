import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { TranslationService } from 'src/app/services/translate.service';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { Router } from '@angular/router';
import {
  ChangeEducationFilterValue,
  ChangeFavoriteFilterValue,
  cleanState,
  deleteJobOffer,
  loadJobOffers,
  updatePaginationDataJobOffers
} from './job-offers-page-state/job-offers-page-state.actions';
import { cleanState as cleanStateReport } from '../reports-page.component/reports-page-state/reports-page-state.actions';
import {
  selectCount,
  selectErrorMessage,
  selectFilters,
  selectJobOffers
} from './job-offers-page-state/job-offers-page-state.selectors';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { PaginatorComponent } from '../shared/paginator.component/paginator.component';
import { SelectModule } from 'primeng/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ReportReasonsModel } from 'src/app/models/general-models';
import { ReportsReasonsEnum } from 'src/app/enums/Reports/ReportsReasonsEnum';
import { saveReport } from '../reports-page.component/reports-page-state/reports-page-state.actions';
import { InputTextModule } from 'primeng/inputtext';

type FormReportModel = {
  RJOGID: FormControl<string>;
  RReasons: FormControl<object>;
  RText: FormControl<string>;
};

type FormUserDataModel = {
  UFirstName: FormControl<string>;
  ULastName: FormControl<string>;
  UEmail: FormControl<string>;
  UPhone: FormControl<string>;
  UCV: FormControl<any>;
  JOGID: FormControl<string>;
};

@Component({
  selector: 'app-tasks-page',
  templateUrl: './job-offers-page.component.html',
  styleUrls: ['./job-offers-page.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    PaginatorComponent,
    ReactiveFormsModule,
    SelectModule,
    CheckboxModule,
    ButtonModule,
    DialogModule,
    TextareaModule,
    SelectButtonModule,
    InputTextModule
  ]
})
export class JobOffersPageComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[];
  public educationTypes = [
    { id: 0, name: 'Podstawowe' },
    { id: 1, name: 'Średnie' },
    { id: 2, name: 'Zawodowe' },
    { id: 3, name: 'Wyższe pierwszego stopnia' },
    { id: 4, name: 'Wyższe drugiego stopnia' },
    { id: 5, name: 'Wszystkie' }
  ];
  public count: number = 0;
  public reportModalVisible: boolean = false;
  public applicationModalVisible: boolean = false;
  public reportReasons: ReportReasonsModel[] = [
    { name: 'Błędne widełki płacy', value: ReportsReasonsEnum.Reason0 },
    { name: 'Błędny opis względem wprowadzonych danych', value: ReportsReasonsEnum.Reason1 },
    { name: 'Wymagane zbyt wiele lat doświadczenie względem poziomu doświadczenia', value: ReportsReasonsEnum.Reason2 },
    { name: 'Błędnie opisane stanowisko względem kategorii', value: ReportsReasonsEnum.Reason3 },
    { name: 'Brak klarownego opis stanowiska', value: ReportsReasonsEnum.Reason4 },
    { name: 'Brak klarownych wymagań stanowiska', value: ReportsReasonsEnum.Reason5 },
    { name: 'Brak lokalizacji biura dla pracy stacjonarnej', value: ReportsReasonsEnum.Reason6 },
    { name: 'Po prostu mi się nie podoba', value: ReportsReasonsEnum.Reason7 }
  ];

  public formFilter: FormGroup = new FormGroup({});

  public reportForm: FormGroup<FormReportModel>;

  public userDataForm: FormGroup<FormUserDataModel>;

  public Filters$ = this.store.select(selectFilters);
  public Count$ = this.store.select(selectCount);
  public JobOffers$ = this.store.select(selectJobOffers);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(
    public store: Store<AppState>,
    public router: Router,
    public translations: TranslationService,
    public errorHandler: MainUIErrorHandler
  ) {
    this.subscriptions = [];
    this.formFilter = new FormGroup({
      education: new FormControl(this.educationTypes[5].id)
    });
    this.reportForm = this.InitReportForm();
    this.userDataForm = this.InitUserDataForm();
  }

  ngOnInit(): void {
    this.subscriptions.push(this.Filters$.subscribe(() => this.store.dispatch(loadJobOffers())));

    this.subscriptions.push(this.ErrorMessage$.subscribe((error) => this.errorHandler.HandleException(error)));

    this.subscriptions.push(this.Count$.subscribe((count) => (this.count = count)));
  }

  public ChangeEducationFilterValue = (event: any) =>
    this.store.dispatch(ChangeEducationFilterValue({ value: event.value }));

  public ChangeFavoriteFilterValue = (checked: boolean) =>
    this.store.dispatch(ChangeFavoriteFilterValue({ checked: checked }));

  public AddJobOffer = () => this.router.navigate(['job-offer/0']);

  public ModifyJobOffer = (JOGID: string) => this.router.navigate([`job-offer/${JOGID}`]);

  public DeleteJobOffer = (JOGID: string) => this.store.dispatch(deleteJobOffer({ JOGID: JOGID }));

  public UpdatePaginationData = (PaginationData: any) =>
    this.store.dispatch(updatePaginationDataJobOffers({ PaginationData: PaginationData }));

  public ReportModalOpen = (JOGID: string) => {
    this.reportForm.patchValue({ RJOGID: JOGID });
    this.reportModalVisible = true;
  };

  public ReportModalClose = () => (this.reportModalVisible = false);

  public ReportJobOffer = () => {
    this.applicationModalVisible = false;
    this.store.dispatch(saveReport({ Report: this.reportForm.value }));
  };

  public ApplicationModalOpen = (JOGID: string) => {
    this.userDataForm.patchValue({ JOGID: JOGID });
    this.applicationModalVisible = true;
  };

  public ApplicationModalClose = () => (this.applicationModalVisible = false);

  public ApplicationForJobOffer = () => {
    this.applicationModalVisible = false;
    this.store.dispatch(saveReport({ Report: this.reportForm.value }));
  };

  private InitReportForm = (): FormGroup<FormReportModel> => {
    return new FormGroup<FormReportModel>({
      RJOGID: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
      RReasons: new FormControl<object>([], { validators: [], nonNullable: true }),
      RText: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(4000)],
        nonNullable: true
      })
    });
  };

  private InitUserDataForm = (): FormGroup<FormUserDataModel> => {
    return new FormGroup<FormUserDataModel>({
      UFirstName: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(50)],
        nonNullable: true
      }),
      ULastName: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(50)],
        nonNullable: true
      }),
      UEmail: new FormControl<string>('', {
        validators: [Validators.required, Validators.email, Validators.maxLength(100)],
        nonNullable: true
      }),
      UPhone: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(100)],
        nonNullable: true
      }),
      UCV: new FormControl<any>('', { validators: [Validators.required], nonNullable: true }),
      JOGID: new FormControl<string>('', { validators: [Validators.required], nonNullable: true })
    });
  };

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(cleanState());
    this.store.dispatch(cleanStateReport());
  }
}
