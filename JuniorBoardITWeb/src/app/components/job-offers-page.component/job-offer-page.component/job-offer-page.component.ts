import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/services/translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { Guid } from 'guid-typescript';
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
import { AsyncPipe } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';

type FormModel = {
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
  JOPostedAt: FormControl<Date>;
  JOExpiresAt: FormControl<Date>;
  JOStatus: FormControl<StatusEnum>;
};

@Component({
  selector: 'app-task-page',
  templateUrl: './job-offer-page.component.html',
  styleUrls: ['./job-offer-page.component.scss'],
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, InputTextModule, InputNumber, DatePickerModule, SelectModule, ButtonModule]
})
export class JobOfferPageComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[];
  public locationTypes: object[] = [
    { id: '0', name: 'Zdalnie' },
    { id: '1', name: 'Hybrydowo' },
    { id: '2', name: 'Stacjonarnie' }
  ];
  public employmentTypes: object[] = [
    { id: '0', name: 'UoP' },
    { id: '1', name: 'UZ' },
    { id: '2', name: 'UD' },
    { id: '3', name: 'B2B' }
  ];
  public expirenceTypes: object[] = [
    { id: '0', name: 'Junior' },
    { id: '1', name: 'Mid' },
    { id: '2', name: 'Regular' },
    { id: '3', name: 'Senior' },
    { id: '4', name: 'Lead' }
  ];
  public categoryTypes: object[] = [
    { id: '0', name: 'FrontEnd' },
    { id: '1', name: 'BackEnd' },
    { id: '2', name: 'DevOps' },
    { id: '3', name: 'QA' },
    { id: '4', name: 'UX' }
  ];
  public currencyTypes: object[] = [
    { id: '0', name: 'PLN' },
    { id: '1', name: 'USD' },
    { id: '2', name: 'GBP' },
    { id: '3', name: 'EUR' },
    { id: '4', name: 'CHF' }
  ];
  public salaryTypes: object[] = [
    { id: '0', name: 'Dniówka' },
    { id: '1', name: 'Tygodniówka' },
    { id: '2', name: 'Miesięcznie' },
    { id: '3', name: 'Rocznie' }
  ];
  public statuses: object[] = [
    { id: '0', name: 'Aktywny' },
    { id: '1', name: 'Zarchiwizowany' },
    { id: '2', name: 'Szkic' },
    { id: '3', name: 'Wygasły' }
  ];

  public form: FormGroup = new FormGroup({});
  // public form: FormGroup<FormModel> = new FormGroup<FormModel>({});

  public jogid: string = '';
  public isNewJobOfferView: boolean = true;
  // public minPostedAtDate: Date = new Date().;

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
  }
  ngOnInit(): void {
    this.jogid = this.route.snapshot.paramMap.get('tgid') ?? '';
    this.isNewJobOfferView = this.jogid == '' || this.jogid == '0';

    if (!this.isNewJobOfferView) {
      this.store.dispatch(loadJobOffer({ JOGID: this.jogid }));
    }

    this.subscriptions.push(
      this.JobOffer$.subscribe((x) => {
        this.form = new FormGroup<FormModel>({
          JOTitle: new FormControl<string>(x.JOTitle, {
            validators: [Validators.required, Validators.maxLength(255)],
            nonNullable: true
          }),
          JOCompanyName: new FormControl<string>(x.JOCompanyName, {
            validators: [Validators.required, Validators.maxLength(255)],
            nonNullable: true
          }),
          JOLocationType: new FormControl<LocationEnum>(x.JOLocationType, {
            validators: [Validators.required],
            nonNullable: true
          }),
          JOOfficeLocation: new FormControl<string>(x.JOOfficeLocation, {
            validators: [Validators.maxLength(100)],
            nonNullable: true
          }),
          JOEmploymentType: new FormControl<EmploymentTypeEnum>(x.JOEmploymentType, {
            validators: [Validators.required],
            nonNullable: true
          }),
          JOExpirenceLevel: new FormControl<ExpirenceEnum>(x.JOExpirenceLevel, {
            validators: [Validators.required],
            nonNullable: true
          }),
          JOExpirenceYears: new FormControl<number>(x.JOExpirenceYears, {
            validators: [Validators.required],
            nonNullable: true
          }),
          JOCategory: new FormControl<CategoryEnum>(x.JOCategory, {
            validators: [Validators.required],
            nonNullable: true
          }),
          JOSalaryMin: new FormControl<number>(x.JOSalaryMin, {
            validators: [Validators.required, Validators.min(0)],
            nonNullable: true
          }),
          JOSalaryMax: new FormControl<number>(x.JOSalaryMax, {
            validators: [Validators.required, Validators.min(0)],
            nonNullable: true
          }),
          JOCurrency: new FormControl<CurrencyEnum>(x.JOCurrency, {
            validators: [Validators.required],
            nonNullable: true
          }),
          JOSalaryType: new FormControl<SalaryEnum>(x.JOSalaryType, {
            validators: [Validators.required],
            nonNullable: true
          }),
          JODescription: new FormControl<string>(x.JODescription, {
            validators: [Validators.required, Validators.maxLength(2000)],
            nonNullable: true
          }),
          JORequirements: new FormControl<string>(x.JORequirements, {
            validators: [Validators.required, Validators.maxLength(2000)],
            nonNullable: true
          }),
          JOBenefits: new FormControl<string>(x.JOBenefits, {
            validators: [Validators.required, Validators.maxLength(2000)],
            nonNullable: true
          }),
          JOPostedAt: new FormControl<Date>(x.JOPostedAt, { validators: [Validators.required], nonNullable: true }),
          JOExpiresAt: new FormControl<Date>(x.JOExpiresAt, { validators: [Validators.required], nonNullable: true }),
          JOStatus: new FormControl<StatusEnum>(x.JOStatus, { validators: [Validators.required], nonNullable: true })
        });
      })
    );
    this.subscriptions.push(
      this.ErrorMessage$.subscribe((error) => {
        this.errorHandler.HandleException(error);
      })
    );
  }

  public SaveTask = () => {
    console.log(this.form.value);

    if (this.jogid == '0' || this.jogid == '') {
      this.store.dispatch(addJobOffer({ JobOffer: this.form.value }));
    } else {
      this.store.dispatch(updateJobOffer({ JobOffer: this.form.value }));
    }
  };

  // public DisplayStatus = (status: number) => this.statuses[status].name;

  public Cancel = () => this.router.navigate(['/job-offers']);

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(cleanState());
  }
}
