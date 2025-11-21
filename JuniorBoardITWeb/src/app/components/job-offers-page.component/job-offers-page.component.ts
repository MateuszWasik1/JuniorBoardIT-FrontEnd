import { AsyncPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TextareaModule } from 'primeng/textarea';
import { TooltipModule } from 'primeng/tooltip';
import { Subscription } from 'rxjs';

import { CategoryEnum } from 'src/app/enums/JobOffers/CategoryEnum';
import { CurrencyEnum } from 'src/app/enums/JobOffers/CurrencyEnum';
import { EducationEnum } from 'src/app/enums/JobOffers/EducationEnum';
import { EmploymentTypeEnum } from 'src/app/enums/JobOffers/EmploymentTypeEnum';
import { ExpirenceEnum } from 'src/app/enums/JobOffers/ExpirenceEnum';
import { LocationEnum } from 'src/app/enums/JobOffers/LocationEnum';
import { SalaryEnum } from 'src/app/enums/JobOffers/SalaryEnum';
import { ReportsReasonsEnum } from 'src/app/enums/Reports/ReportsReasonsEnum';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { ReportReasonsModel, SelectObjectModel } from 'src/app/models/general-models';
import { TranslationService } from 'src/app/services/translate.service';

import { AppState } from '../../app.state';
import {
  addToFavorite,
  applyForJobOffer,
  changeCategoryFilterValue,
  changeEducationFilterValue,
  changeEmploymentTypeFilterValue,
  changeExpirenceFilterValue,
  changeFavoriteFilterValue,
  changeLocationFilterValue,
  changeSalaryFilterValue,
  cleanState,
  deleteJobOffer,
  loadJobOffers,
  loadRoles,
  loadUserData,
  updatePaginationDataJobOffers
} from './job-offers-page-state/job-offers-page-state.actions';
import {
  selectCount,
  selectErrorMessage,
  selectFilters,
  selectJobOffers,
  selectRoles,
  selectUserData
} from './job-offers-page-state/job-offers-page-state.selectors';
import { cleanState as cleanStateReport } from '../reports-page.component/reports-page-state/reports-page-state.actions';
import { saveReport } from '../reports-page.component/reports-page-state/reports-page-state.actions';
import { PaginatorComponent } from '../shared/paginator.component/paginator.component';

interface FormReportModel {
  RJOGID: FormControl<string>;
  RReasons: FormControl<object>;
  RText: FormControl<string>;
}

interface FormUserDataModel {
  UFirstName: FormControl<string>;
  ULastName: FormControl<string>;
  UEmail: FormControl<string>;
  UPhone: FormControl<string>;
  UCV: FormControl<string>;
  JOGID: FormControl<string>;
}

@Component({
  selector: 'app-tasks-page',
  templateUrl: './job-offers-page.component.html',
  styleUrls: ['./job-offers-page.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    PaginatorComponent,
    ReactiveFormsModule,
    SelectModule,
    CheckboxModule,
    ButtonModule,
    DialogModule,
    TextareaModule,
    SelectButtonModule,
    InputTextModule,
    FileUploadModule,
    CardModule,
    TooltipModule
  ]
})
export class JobOffersPageComponent implements OnInit, OnDestroy {
  public store = inject(Store<AppState>);
  public router = inject(Router);
  public translations = inject(TranslationService);
  public errorHandler = inject(MainUIErrorHandler);

  public subscriptions: Subscription[];

  public locationTypes: SelectObjectModel[] = [
    { id: LocationEnum.Remote, name: 'Zdalnie' },
    { id: LocationEnum.Hybrid, name: 'Hybrydowo' },
    { id: LocationEnum.Stationary, name: 'Stacjonarnie' },
    { id: LocationEnum.All, name: 'Wszystkie' }
  ];
  public employmentTypes: SelectObjectModel[] = [
    { id: EmploymentTypeEnum.UoP, name: 'UoP' },
    { id: EmploymentTypeEnum.UZ, name: 'UZ' },
    { id: EmploymentTypeEnum.UD, name: 'UD' },
    { id: EmploymentTypeEnum.B2B, name: 'B2B' },
    { id: EmploymentTypeEnum.All, name: 'Wszystkie' }
  ];
  public expirenceTypes: SelectObjectModel[] = [
    { id: ExpirenceEnum.Junior, name: 'Junior' },
    { id: ExpirenceEnum.Mid, name: 'Mid' },
    { id: ExpirenceEnum.Regular, name: 'Regular' },
    { id: ExpirenceEnum.Senior, name: 'Senior' },
    { id: ExpirenceEnum.Lead, name: 'Lead' },
    { id: ExpirenceEnum.All, name: 'Wszystkie' }
  ];
  public categoryTypes: SelectObjectModel[] = [
    { id: CategoryEnum.FrontEnd, name: 'FrontEnd' },
    { id: CategoryEnum.BackEnd, name: 'BackEnd' },
    { id: CategoryEnum.DevOps, name: 'DevOps' },
    { id: CategoryEnum.QA, name: 'QA' },
    { id: CategoryEnum.UX, name: 'UX' },
    { id: CategoryEnum.All, name: 'Wszystkie' }
  ];
  public currencyTypes: SelectObjectModel[] = [
    { id: CurrencyEnum.PLN, name: 'PLN' },
    { id: CurrencyEnum.USD, name: 'USD' },
    { id: CurrencyEnum.GBP, name: 'GBP' },
    { id: CurrencyEnum.EUR, name: 'EUR' },
    { id: CurrencyEnum.CHF, name: 'CHF' }
  ];
  public salaryTypes: SelectObjectModel[] = [
    { id: SalaryEnum.Daily, name: 'Dniówka' },
    { id: SalaryEnum.Weekly, name: 'Tygodniówka' },
    { id: SalaryEnum.Monthly, name: 'Miesięcznie' },
    { id: SalaryEnum.Yearly, name: 'Rocznie' },
    { id: SalaryEnum.All, name: 'Wszystkie' }
  ];
  public educationTypes: SelectObjectModel[] = [
    { id: EducationEnum.Elementary, name: 'Podstawowe' },
    { id: EducationEnum.Secondary, name: 'Średnie' },
    { id: EducationEnum.Vocational, name: 'Zawodowe' },
    { id: EducationEnum.HigherILevel, name: 'Wyższe pierwszego stopnia' },
    { id: EducationEnum.HigherIILevel, name: 'Wyższe drugiego stopnia' },
    { id: EducationEnum.All, name: 'Wszystkie' }
  ];
  public count = 0;
  public reportModalVisible = false;
  public applicationModalVisible = false;
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
  public UserData$ = this.store.select(selectUserData);
  public ErrorMessage$ = this.store.select(selectErrorMessage);
  public Roles$ = this.store.select(selectRoles);

  constructor() {
    this.subscriptions = [];
    this.formFilter = new FormGroup({
      expirence: new FormControl(this.expirenceTypes[5].id),
      category: new FormControl(this.categoryTypes[5].id),
      location: new FormControl(this.locationTypes[3].id),
      education: new FormControl(this.educationTypes[5].id),
      employmentType: new FormControl(this.employmentTypes[4].id),
      salary: new FormControl(this.salaryTypes[4].id)
    });
    this.reportForm = this.InitReportForm();
    this.userDataForm = this.InitUserDataForm();
  }

  ngOnInit(): void {
    this.store.dispatch(loadUserData());

    this.store.dispatch(loadRoles());

    this.subscriptions.push(this.Filters$.subscribe(() => this.store.dispatch(loadJobOffers())));

    this.subscriptions.push(this.ErrorMessage$.subscribe((error) => this.errorHandler.HandleException(error)));

    this.subscriptions.push(this.UserData$.subscribe((user) => this.userDataForm.patchValue(user)));

    this.subscriptions.push(this.Count$.subscribe((count) => (this.count = count)));
  }

  public ChangeExpirienceFilterValue = (expirence: ExpirenceEnum) =>
    this.store.dispatch(changeExpirenceFilterValue({ Expirence: expirence }));

  public ChangeCategoryFilterValue = (category: CategoryEnum) =>
    this.store.dispatch(changeCategoryFilterValue({ Category: category }));

  public ChangeLocationFilterValue = (location: LocationEnum) =>
    this.store.dispatch(changeLocationFilterValue({ Location: location }));

  public ChangeEducationFilterValue = (education: EducationEnum) =>
    this.store.dispatch(changeEducationFilterValue({ Education: education }));

  public ChangeEmploymentTypeFilterValue = (employmentType: EmploymentTypeEnum) =>
    this.store.dispatch(changeEmploymentTypeFilterValue({ EmploymentType: employmentType }));

  public ChangeSalaryFilterValue = (salary: SalaryEnum) =>
    this.store.dispatch(changeSalaryFilterValue({ Salary: salary }));

  public ChangeFavoriteFilterValue = (checked: boolean) =>
    this.store.dispatch(changeFavoriteFilterValue({ checked: checked }));

  public UpdatePaginationData = (PaginationData: any) =>
    this.store.dispatch(updatePaginationDataJobOffers({ PaginationData: PaginationData }));

  public AddJobOffer = () => this.router.navigate(['job-offer/0']);

  public ModifyJobOffer = (JOGID: string) => this.router.navigate([`job-offer/${JOGID}`]);

  public DeleteJobOffer = (JOGID: string) => this.store.dispatch(deleteJobOffer({ JOGID: JOGID }));

  public ReportModalOpen = (JOGID: string) => {
    this.reportForm.patchValue({ RJOGID: JOGID });
    this.reportModalVisible = true;
  };

  public ReportModalClose = () => (this.reportModalVisible = false);

  public ReportJobOffer = () => {
    this.reportModalVisible = false;
    this.store.dispatch(saveReport({ Report: this.reportForm.value }));
  };

  public ApplicationModalOpen = (JOGID: string) => {
    this.userDataForm.patchValue({ JOGID: JOGID });
    this.applicationModalVisible = true;
  };

  public ApplicationModalClose = () => {
    this.applicationModalVisible = false;
    this.userDataForm.patchValue({ UCV: '' });
  };

  public ApplicationForJobOffer = () => {
    this.applicationModalVisible = false;
    this.store.dispatch(applyForJobOffer({ ApplyData: this.userDataForm.value }));
  };

  public OnFileUpload = (event: any) => {
    const file: File = event.files[0];
    this.convertToBase64(file).then((base64) => {
      this.userDataForm.patchValue({ UCV: base64?.toString() });
    });
  };

  public AddToFavorite = (JOGID: string) => this.store.dispatch(addToFavorite({ JOGID: JOGID }));

  public DisplayLocationType = (locationType: LocationEnum) => this.locationTypes[locationType].name;

  public DisplayEmploymentType = (employmentType: EmploymentTypeEnum) => this.employmentTypes[employmentType].name;

  public DisplayExpirenceType = (expirenceType: ExpirenceEnum) => this.expirenceTypes[expirenceType].name;

  public DisplayCategoryType = (categoryType: CategoryEnum) => this.categoryTypes[categoryType].name;

  public DisplayCurrencyType = (currencyType: CurrencyEnum) => this.currencyTypes[currencyType].name;

  public DisplaySalaryType = (salaryType: SalaryEnum) => this.salaryTypes[salaryType].name;

  public DisplayEducationType = (educationType: EducationEnum) => this.educationTypes[educationType].name;

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
      UCV: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
      JOGID: new FormControl<string>('', { validators: [Validators.required], nonNullable: true })
    });
  };

  private convertToBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(cleanState());
    this.store.dispatch(cleanStateReport());
  }
}
