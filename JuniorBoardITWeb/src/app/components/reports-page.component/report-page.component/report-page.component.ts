import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { Subscription } from 'rxjs';

import { CompanyEmpNoEnum } from 'src/app/enums/Companies/CompanyEmpNoEnum';
import { CategoryEnum } from 'src/app/enums/JobOffers/CategoryEnum';
import { CurrencyEnum } from 'src/app/enums/JobOffers/CurrencyEnum';
import { EducationEnum } from 'src/app/enums/JobOffers/EducationEnum';
import { EmploymentTypeEnum } from 'src/app/enums/JobOffers/EmploymentTypeEnum';
import { ExpirenceEnum } from 'src/app/enums/JobOffers/ExpirenceEnum';
import { LocationEnum } from 'src/app/enums/JobOffers/LocationEnum';
import { SalaryEnum } from 'src/app/enums/JobOffers/SalaryEnum';
import { ReportsReasonsEnum } from 'src/app/enums/Reports/ReportsReasonsEnum';
import { ReportsStatusEnum } from 'src/app/enums/Reports/ReportsStatusEnum';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { ReportReasonsModel, SelectObjectModel } from 'src/app/models/general-models';
import { FormErrorsService } from 'src/app/services/form-error.service';
import { TranslationService } from 'src/app/services/translate.service';

import { AppState } from '../../../app.state';
import { changeReportStatus, cleanState, loadReport } from '../reports-page-state/reports-page-state.actions';
import {
  selectCompany,
  selectErrorMessage,
  selectJobOffer,
  selectReport
} from '../reports-page-state/reports-page-state.selectors';
import { ReportTranslations } from '../reports-page.models';

interface FormReportModel {
  ReportStatus: FormControl<ReportsStatusEnum>;
}

@Component({
  selector: 'app-task-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    ReactiveFormsModule,
    InputTextModule,
    DatePickerModule,
    SelectModule,
    ButtonModule,
    CardModule,
    MessageModule
  ]
})
export class ReportPageComponent implements OnInit, OnDestroy {
  public store = inject(Store<AppState>);
  public translations = inject(TranslationService);
  public route = inject(ActivatedRoute);
  public router = inject(Router);
  public errorHandler = inject(MainUIErrorHandler);
  private formErrorsService = inject(FormErrorsService);

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
  public educationTypes: SelectObjectModel[] = [
    { id: EducationEnum.Elementary, name: 'Podstawowe' },
    { id: EducationEnum.Secondary, name: 'Średnie' },
    { id: EducationEnum.Vocational, name: 'Zawodowe' },
    { id: EducationEnum.HigherILevel, name: 'Wyższe pierwszego stopnia' },
    { id: EducationEnum.HigherIILevel, name: 'Wyższe drugiego stopnia' },
    { id: EducationEnum.All, name: 'Wszystkie' }
  ];
  public companyEmpNoTypes: SelectObjectModel[] = [
    { id: CompanyEmpNoEnum.Microenterprise, name: 'Mikro przedsiębiorstwo (1-9) ' },
    { id: CompanyEmpNoEnum.SmallEnterprise, name: 'Małe przedsiębiorstwo (10-49) ' },
    { id: CompanyEmpNoEnum.MediumEnterprise, name: 'Średnie przedsiębiorstwo (50-249) ' },
    { id: CompanyEmpNoEnum.LargeEnterprise, name: 'Duże przedsiębiorstwo (250-9999) ' },
    { id: CompanyEmpNoEnum.EnormousEnterprise, name: 'Wielkie przedsiębiorstwo (1000-4999) ' },
    { id: CompanyEmpNoEnum.GlobalEnterprise, name: 'Globalne przedsiębiorstwo (5000+) ' }
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

  public form: FormGroup<FormReportModel>;

  public Report$ = this.store.select(selectReport);
  public JobOffer$ = this.store.select(selectJobOffer);
  public Company$ = this.store.select(selectCompany);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor() {
    this.subscriptions = [];

    this.form = this.InitReportForm();
  }

  public ngOnInit(): void {
    this.store.dispatch(loadReport({ RGID: this.route.snapshot.paramMap.get('rgid') as string }));

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

  public DisplayLocationType = (locationType: LocationEnum) => this.locationTypes[locationType].name;

  public DisplayEmploymentType = (employmentType: EmploymentTypeEnum) => this.employmentTypes[employmentType].name;

  public DisplayExpirenceType = (expirenceType: ExpirenceEnum) => this.expirenceTypes[expirenceType].name;

  public DisplayCategoryType = (categoryType: CategoryEnum) => this.categoryTypes[categoryType].name;

  public DisplayCurrencyType = (currencyType: CurrencyEnum) => this.currencyTypes[currencyType].name;

  public DisplaySalaryType = (salaryType: SalaryEnum) => this.salaryTypes[salaryType].name;

  public DisplayEducationType = (educationType: EducationEnum) => this.educationTypes[educationType].name;

  public DisplayCompanySize = (companyEmpNo: CompanyEmpNoEnum) => this.companyEmpNoTypes[companyEmpNo].name;

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
