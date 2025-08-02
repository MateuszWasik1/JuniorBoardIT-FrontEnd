import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/services/translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import {
  addJobOffer,
  cleanState,
  loadJobOffer,
  updateJobOffer
} from '../job-offers-page-state/job-offers-page-state.actions';
import { selectErrorMessage, selectJobOffer } from '../job-offers-page-state/job-offers-page-state.selectors';
import { LocationEnum } from 'src/app/enums/JobOffers/LocationEnum';
import { EmploymentTypeEnum } from 'src/app/enums/JobOffers/EmploymentTypeEnum';
import { ExpirenceEnum } from 'src/app/enums/JobOffers/ExpirenceEnum';
import { CategoryEnum } from 'src/app/enums/JobOffers/CategoryEnum';
import { CurrencyEnum } from 'src/app/enums/JobOffers/CurrencyEnum';
import { SalaryEnum } from 'src/app/enums/JobOffers/SalaryEnum';
import { StatusEnum } from 'src/app/enums/JobOffers/StatusEnum';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { EducationEnum } from 'src/app/enums/JobOffers/EducationEnum';

type FormModel = {
  JOGID: FormControl<string>;
  JOTitle: FormControl<string>;
  JOCompanyName: FormControl<string>;
  JOLocationType: FormControl<LocationEnum>;
  JOOfficeLocation: FormControl<string>;
  JOEmploymentType: FormControl<EmploymentTypeEnum>;
  JOExpirenceLevel: FormControl<ExpirenceEnum>;
  JOExpirenceYears: FormControl<number>;
  JOCategory: FormControl<CategoryEnum>;
  JOSalaryMin: FormControl<number>;
  JOSalaryMax: FormControl<number>;
  JOCurrency: FormControl<CurrencyEnum>;
  JOSalaryType: FormControl<SalaryEnum>;
  JODescription: FormControl<string>;
  JORequirements: FormControl<string>;
  JOBenefits: FormControl<string>;
  JOEducation: FormControl<EducationEnum>;
  JOPostedAt: FormControl<Date>;
  JOExpiresAt: FormControl<Date>;
  JOStatus: FormControl<StatusEnum>;
};

@Component({
  selector: 'app-job-offer-page',
  templateUrl: './job-offer-page.component.html',
  styleUrls: ['./job-offer-page.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    InputTextModule,
    InputNumber,
    DatePickerModule,
    SelectModule,
    ButtonModule,
    JsonPipe
  ]
})
export class JobOfferPageComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[];
  public locationTypes: object[] = [
    { id: LocationEnum.Remote, name: 'Zdalnie' },
    { id: LocationEnum.Hybrid, name: 'Hybrydowo' },
    { id: LocationEnum.Stationary, name: 'Stacjonarnie' }
  ];
  public employmentTypes: object[] = [
    { id: EmploymentTypeEnum.UoP, name: 'UoP' },
    { id: EmploymentTypeEnum.UZ, name: 'UZ' },
    { id: EmploymentTypeEnum.UD, name: 'UD' },
    { id: EmploymentTypeEnum.B2B, name: 'B2B' }
  ];
  public expirenceTypes: object[] = [
    { id: ExpirenceEnum.Junior, name: 'Junior' },
    { id: ExpirenceEnum.Mid, name: 'Mid' },
    { id: ExpirenceEnum.Regular, name: 'Regular' },
    { id: ExpirenceEnum.Senior, name: 'Senior' },
    { id: ExpirenceEnum.Lead, name: 'Lead' }
  ];
  public categoryTypes: object[] = [
    { id: CategoryEnum.FrontEnd, name: 'FrontEnd' },
    { id: CategoryEnum.BackEnd, name: 'BackEnd' },
    { id: CategoryEnum.DevOps, name: 'DevOps' },
    { id: CategoryEnum.QA, name: 'QA' },
    { id: CategoryEnum.UX, name: 'UX' }
  ];
  public currencyTypes: object[] = [
    { id: CurrencyEnum.PLN, name: 'PLN' },
    { id: CurrencyEnum.USD, name: 'USD' },
    { id: CurrencyEnum.GBP, name: 'GBP' },
    { id: CurrencyEnum.EUR, name: 'EUR' },
    { id: CurrencyEnum.CHF, name: 'CHF' }
  ];
  public salaryTypes: object[] = [
    { id: SalaryEnum.Daily, name: 'Dniówka' },
    { id: SalaryEnum.Weekly, name: 'Tygodniówka' },
    { id: SalaryEnum.Monthly, name: 'Miesięcznie' },
    { id: SalaryEnum.Yearly, name: 'Rocznie' }
  ];
  public educationTypes: object[] = [
    { id: EducationEnum.Elementary, name: 'Podstawowe' },
    { id: EducationEnum.Secondary, name: 'Średnie' },
    { id: EducationEnum.Vocational, name: 'Zawodowe' },
    { id: EducationEnum.HigherILevel, name: 'Wyższe pierwszego stopnia' },
    { id: EducationEnum.HigherIILevel, name: 'Wyższe drugiego stopnia' },
    { id: EducationEnum.All, name: 'Wszystkie' }
  ];
  public statuses: object[] = [
    { id: StatusEnum.Active, name: 'Aktywny' },
    { id: StatusEnum.Archive, name: 'Zarchiwizowany' },
    { id: StatusEnum.Draft, name: 'Szkic' },
    { id: StatusEnum.Expired, name: 'Wygasły' }
  ];

  public form: FormGroup<FormModel>;

  public jogid: string = '';
  public isNewJobOfferView: boolean = true;

  public JobOffer$ = this.store.select(selectJobOffer);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(
    public store: Store<AppState>,
    public translations: TranslationService,
    public route: ActivatedRoute,
    public router: Router,
    public errorHandler: MainUIErrorHandler
  ) {
    this.subscriptions = [];
    this.form = this.InitJobOfferForm();
  }
  ngOnInit(): void {
    this.jogid = this.route.snapshot.paramMap.get('jogid') ?? '';
    this.isNewJobOfferView = this.jogid == '' || this.jogid == '0';

    if (!this.isNewJobOfferView) {
      this.store.dispatch(loadJobOffer({ JOGID: this.jogid }));
    }

    this.subscriptions.push(this.JobOffer$.subscribe((jobOffer) => this.form.patchValue(jobOffer)));

    this.subscriptions.push(
      this.ErrorMessage$.subscribe((error) => {
        this.errorHandler.HandleException(error);
      })
    );
  }

  public SaveJobOffer = () => {
    if (this.jogid == '0' || this.jogid == '') {
      this.store.dispatch(addJobOffer({ JobOffer: this.form.value }));
    } else {
      this.store.dispatch(updateJobOffer({ JobOffer: this.form.value }));
    }
  };

  public Cancel = () => this.router.navigate(['/job-offers']);

  private InitJobOfferForm = (): FormGroup<FormModel> => {
    return new FormGroup<FormModel>({
      JOGID: new FormControl<string>('', {
        validators: [Validators.required],
        nonNullable: true
      }),
      JOTitle: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(255)],
        nonNullable: true
      }),
      JOCompanyName: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(255)],
        nonNullable: true
      }),
      JOLocationType: new FormControl<LocationEnum>(LocationEnum.Remote, {
        validators: [Validators.required],
        nonNullable: true
      }),
      JOOfficeLocation: new FormControl<string>('', {
        validators: [Validators.maxLength(100)],
        nonNullable: true
      }),
      JOEmploymentType: new FormControl<EmploymentTypeEnum>(EmploymentTypeEnum.UoP, {
        validators: [Validators.required],
        nonNullable: true
      }),
      JOExpirenceLevel: new FormControl<ExpirenceEnum>(ExpirenceEnum.Junior, {
        validators: [Validators.required],
        nonNullable: true
      }),
      JOExpirenceYears: new FormControl<number>(0, {
        validators: [Validators.required],
        nonNullable: true
      }),
      JOCategory: new FormControl<CategoryEnum>(CategoryEnum.FrontEnd, {
        validators: [Validators.required],
        nonNullable: true
      }),
      JOSalaryMin: new FormControl<number>(0, {
        validators: [Validators.required, Validators.min(0)],
        nonNullable: true
      }),
      JOSalaryMax: new FormControl<number>(0, {
        validators: [Validators.required, Validators.min(0)],
        nonNullable: true
      }),
      JOCurrency: new FormControl<CurrencyEnum>(CurrencyEnum.PLN, {
        validators: [Validators.required],
        nonNullable: true
      }),
      JOSalaryType: new FormControl<SalaryEnum>(SalaryEnum.Daily, {
        validators: [Validators.required],
        nonNullable: true
      }),
      JODescription: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(2000)],
        nonNullable: true
      }),
      JORequirements: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(2000)],
        nonNullable: true
      }),
      JOBenefits: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(2000)],
        nonNullable: true
      }),
      JOEducation: new FormControl<EducationEnum>(EducationEnum.Elementary, {
        validators: [Validators.required],
        nonNullable: true
      }),
      JOPostedAt: new FormControl<Date>(new Date(), { validators: [Validators.required], nonNullable: true }),
      JOExpiresAt: new FormControl<Date>(new Date(), { validators: [Validators.required], nonNullable: true }),
      JOStatus: new FormControl<StatusEnum>(StatusEnum.Active, { validators: [Validators.required], nonNullable: true })
    });
  };

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(cleanState());
  }
}
