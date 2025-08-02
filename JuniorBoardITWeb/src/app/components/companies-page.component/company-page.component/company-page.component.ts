import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  addCompany,
  cleanState,
  loadCompany,
  updateCompany
} from '../companies-page-state/companies-page-state.actions';
import { selectCompany, selectErrorMessage } from '../companies-page-state/companies-page-state.selectors';
import { TranslationService } from 'src/app/services/translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { IndustryEnum } from 'src/app/enums/Companies/IndustryEnum';
import { CompanyEmpNoEnum } from 'src/app/enums/Companies/CompanyEmpNoEnum';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectObjectModel } from 'src/app/models/general-models';

type FormModel = {
  CGID: FormControl<string>;
  CName: FormControl<string>;
  CIndustry: FormControl<IndustryEnum>;
  CDescription: FormControl<string>;
  CEmail: FormControl<string>;
  CAddress: FormControl<string>;
  CCity: FormControl<string>;
  CCountry: FormControl<string>;
  CPostalCode: FormControl<string>;
  CPhoneNumber: FormControl<string>;
  CNIP: FormControl<string>;
  CRegon: FormControl<string>;
  CKRS: FormControl<string>;
  CLI: FormControl<string>;
  CFoundedYear: FormControl<number>;
  CEmployeesNo: FormControl<CompanyEmpNoEnum>;
  CCreatedAt: FormControl<Date>;
  CUpdatedAt: FormControl<Date>;
};

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    ButtonModule,
    InputTextModule,
    SelectModule,
    TextareaModule,
    InputNumberModule
  ]
})
export class CompanyPageComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[];
  public form: FormGroup<FormModel>;
  public cgid: string = '';
  public isNewCompanyView: boolean = true;
  public industryTypes: SelectObjectModel[] = [
    { id: IndustryEnum.Industry, name: 'Przemysł' },
    { id: IndustryEnum.Trade, name: 'Handel' },
    { id: IndustryEnum.Services, name: 'Usługi' },
    { id: IndustryEnum.Technologies, name: 'Technologie' },
    { id: IndustryEnum.Agriculture, name: 'Rolnictwo' },
    { id: IndustryEnum.Construction, name: 'Budownictwo' },
    { id: IndustryEnum.Finance, name: 'Finanse' },
    { id: IndustryEnum.Healthcare, name: 'Opieka zdrowotna' },
    { id: IndustryEnum.Education, name: 'Edukacja' }
  ];
  public companyEmpNoTypes: SelectObjectModel[] = [
    { id: CompanyEmpNoEnum.Microenterprise, name: 'Mikro przedsiębiorstwo (1-9) ' },
    { id: CompanyEmpNoEnum.SmallEnterprise, name: 'Małe przedsiębiorstwo (10-49) ' },
    { id: CompanyEmpNoEnum.MediumEnterprise, name: 'Średnie przedsiębiorstwo (50-249) ' },
    { id: CompanyEmpNoEnum.LargeEnterprise, name: 'Duże przedsiębiorstwo (250-9999) ' },
    { id: CompanyEmpNoEnum.EnormousEnterprise, name: 'Wielkie przedsiębiorstwo (1000-4999) ' },
    { id: CompanyEmpNoEnum.GlobalEnterprise, name: 'Globalne przedsiębiorstwo (5000+) ' }
  ];

  public Company$ = this.store.select(selectCompany);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(
    public store: Store<AppState>,
    public translations: TranslationService,
    public route: ActivatedRoute,
    public router: Router,
    public errorHandler: MainUIErrorHandler
  ) {
    this.subscriptions = [];
    this.form = this.InitCompanyForm();
  }
  ngOnInit(): void {
    this.cgid = this.route.snapshot.paramMap.get('cgid') ?? '';
    this.isNewCompanyView = this.cgid == '' || this.cgid == '0';

    if (!this.isNewCompanyView) {
      this.store.dispatch(loadCompany({ CGID: this.cgid }));
    }

    this.subscriptions.push(
      this.Company$.subscribe((company) => {
        this.form.patchValue(company);
      })
    );

    this.subscriptions.push(
      this.ErrorMessage$.subscribe((error) => {
        this.errorHandler.HandleException(error);
      })
    );
  }

  public AddCompany = (): void => this.store.dispatch(addCompany({ Company: this.form.value }));

  public UpdateCompany = (): void => this.store.dispatch(updateCompany({ Company: this.form.value }));

  public Cancel = (): Promise<boolean> => this.router.navigate(['/companies']);

  private InitCompanyForm = (): FormGroup<FormModel> => {
    return new FormGroup<FormModel>({
      CGID: new FormControl<string>('', { validators: [], nonNullable: true }),
      CName: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(255)],
        nonNullable: true
      }),
      CIndustry: new FormControl<IndustryEnum>(IndustryEnum.Industry, {
        validators: [Validators.required],
        nonNullable: true
      }),
      CDescription: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(2000)],
        nonNullable: true
      }),
      CEmail: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(255)],
        nonNullable: true
      }),
      CAddress: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(255)],
        nonNullable: true
      }),
      CCity: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(255)],
        nonNullable: true
      }),
      CCountry: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(255)],
        nonNullable: true
      }),
      CPostalCode: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(255)],
        nonNullable: true
      }),
      CPhoneNumber: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(255)],
        nonNullable: true
      }),
      CNIP: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(255)],
        nonNullable: true
      }),
      CRegon: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(255)],
        nonNullable: true
      }),
      CKRS: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(255)],
        nonNullable: true
      }),
      CLI: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(255)],
        nonNullable: true
      }),
      CFoundedYear: new FormControl<number>(0, {
        validators: [Validators.required, Validators.min(1000)],
        nonNullable: true
      }),
      CEmployeesNo: new FormControl<CompanyEmpNoEnum>(CompanyEmpNoEnum.Microenterprise, {
        validators: [Validators.required, Validators.maxLength(200)],
        nonNullable: true
      }),
      CCreatedAt: new FormControl<Date>(new Date(), { validators: [Validators.required], nonNullable: true }),
      CUpdatedAt: new FormControl<Date>(new Date(), { validators: [Validators.required], nonNullable: true })
    });
  };

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(cleanState());
  }
}
