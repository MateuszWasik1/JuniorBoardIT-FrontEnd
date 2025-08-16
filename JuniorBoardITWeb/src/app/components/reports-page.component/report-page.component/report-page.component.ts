import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/services/translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
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
import { CardModule } from 'primeng/card';
import { changeReportStatus, cleanState, loadReport } from '../reports-page-state/reports-page-state.actions';
import { selectErrorMessage, selectJobOffer, selectReport } from '../reports-page-state/reports-page-state.selectors';
import { ReportsStatusEnum } from 'src/app/enums/Reports/ReportsStatusEnum';
import { ReportReasonsModel, SelectObjectModel } from 'src/app/models/general-models';
import { MessageModule } from 'primeng/message';
import { ReportsReasonsEnum } from 'src/app/enums/Reports/ReportsReasonsEnum';
import { FormErrorsService } from 'src/app/services/form-error.service';
import { ReportTranslations } from '../reports-page.models';

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

type FormReportModel = {
  ReportStatus: FormControl<ReportsStatusEnum>;
};

@Component({
  selector: 'app-task-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    InputTextModule,
    InputNumber,
    DatePickerModule,
    SelectModule,
    ButtonModule,
    CardModule,
    MessageModule
  ]
})
export class ReportPageComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[];
  public locationTypes: SelectObjectModel[] = [
    { id: 0, name: 'Zdalnie' },
    { id: 1, name: 'Hybrydowo' },
    { id: 2, name: 'Stacjonarnie' }
  ];
  public employmentTypes: SelectObjectModel[] = [
    { id: 0, name: 'UoP' },
    { id: 1, name: 'UZ' },
    { id: 2, name: 'UD' },
    { id: 3, name: 'B2B' }
  ];
  public expirenceTypes: SelectObjectModel[] = [
    { id: 0, name: 'Junior' },
    { id: 1, name: 'Mid' },
    { id: 2, name: 'Regular' },
    { id: 3, name: 'Senior' },
    { id: 4, name: 'Lead' }
  ];
  public categoryTypes: SelectObjectModel[] = [
    { id: 0, name: 'FrontEnd' },
    { id: 1, name: 'BackEnd' },
    { id: 2, name: 'DevOps' },
    { id: 3, name: 'QA' },
    { id: 4, name: 'UX' }
  ];
  public currencyTypes: SelectObjectModel[] = [
    { id: 0, name: 'PLN' },
    { id: 1, name: 'USD' },
    { id: 2, name: 'GBP' },
    { id: 3, name: 'EUR' },
    { id: 4, name: 'CHF' }
  ];
  public salaryTypes: SelectObjectModel[] = [
    { id: 0, name: 'Dniówka' },
    { id: 1, name: 'Tygodniówka' },
    { id: 2, name: 'Miesięcznie' },
    { id: 3, name: 'Rocznie' }
  ];
  public statuses: SelectObjectModel[] = [
    { id: 0, name: 'Aktywny' },
    { id: 1, name: 'Zarchiwizowany' },
    { id: 2, name: 'Szkic' },
    { id: 3, name: 'Wygasły' }
  ];
  public reportsStatusType: SelectObjectModel[] = [
    { id: ReportsStatusEnum.New, name: 'Nowe' },
    { id: ReportsStatusEnum.InVerification, name: 'W weryfikacji' },
    { id: ReportsStatusEnum.Rejected, name: 'Odrzucone' },
    { id: ReportsStatusEnum.Accepted, name: 'Zaakceptowane' }
  ];
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

  public form: FormGroup = new FormGroup({});
  public reportForm: FormGroup<FormReportModel>;

  public Report$ = this.store.select(selectReport);
  public JobOffer$ = this.store.select(selectJobOffer);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(
    public store: Store<AppState>,
    public translations: TranslationService,
    public route: ActivatedRoute,
    public router: Router,
    public errorHandler: MainUIErrorHandler,
    private formErrorsService: FormErrorsService
  ) {
    this.subscriptions = [];

    this.reportForm = this.InitReportForm();
  }
  ngOnInit(): void {
    this.store.dispatch(loadReport({ RGID: this.route.snapshot.paramMap.get('rgid') }));

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
      this.Report$.subscribe((report) => {
        if (report.RID !== 0 && (report.RSupportGID == '' || report.RSupportGID == null)) {
          this.ChangeReportStatus(report.RGID, ReportsStatusEnum.New);
        }
      })
    );
    this.subscriptions.push(
      this.ErrorMessage$.subscribe((error) => {
        this.errorHandler.HandleException(error);
      })
    );
  }

  public ChangeReportStatus = (RGID: string, RStatus: ReportsStatusEnum): void => {
    if (this.form.invalid) {
      return this.formErrorsService.getAllInvalidControls(this.form, '', ReportTranslations);
    }

    this.store.dispatch(changeReportStatus({ RGID: RGID, RStatus: RStatus }));
  };

  public DisplayReasons = (reasons: string): string => {
    const selectedValues = reasons.split(',');

    const selectedReasons = this.reportReasons.filter((reason) => selectedValues.includes(reason.value));

    const reasonNames = selectedReasons.map((reason) => reason.name);

    return reasonNames.join(', ');
  };

  public DisplayStatus = (reportStatus: ReportsStatusEnum): string => this.reportsStatusType[reportStatus].name;

  public DisplaySeverity = (reportStatus: ReportsStatusEnum): string => {
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

  public Cancel = (): Promise<boolean> => this.router.navigate(['/reports']);

  private InitReportForm(): FormGroup<FormReportModel> {
    return new FormGroup<FormReportModel>({
      ReportStatus: new FormControl<ReportsStatusEnum>(ReportsStatusEnum.New, { nonNullable: true })
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(cleanState());
  }
}
