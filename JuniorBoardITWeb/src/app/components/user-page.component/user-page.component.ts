import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/services/translate.service';
import {
  cleanState,
  loadCompanies,
  loadUser,
  loadUserByAdmin,
  saveUser,
  saveUserByAdmin
} from './user-page-state/user-page-state.actions';
import { selectCompanies, selectErrorMessage, selectUser } from './user-page-state/user-page-state.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { RolesEnum } from 'src/app/enums/RolesEnum';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { AsyncPipe } from '@angular/common';
import { FormErrorsService } from 'src/app/services/form-error.service';
import { UserTranslations } from './user-page.models';

type FormModel = {
  UID: FormControl<number>;
  UGID: FormControl<string>;
  URID: FormControl<number>;
  UFirstName: FormControl<string>;
  ULastName: FormControl<string>;
  UUserName: FormControl<string>;
  UEmail: FormControl<string>;
  UPhone: FormControl<string>;
  UCompany: FormControl<string>;
  UCompanyGID: FormControl<string>;
};

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, ButtonModule, InputTextModule, InputNumberModule, SelectModule]
})
export class UserPageComponent implements OnInit, OnDestroy {
  public IsAdminView: boolean = false;
  public roles: any;
  public selectedRole: any;
  public selectedFilterRole: any;
  public subscriptions: Subscription[];

  public form: FormGroup<FormModel>;

  public User$ = this.store.select(selectUser);
  public Companies$ = this.store.select(selectCompanies);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(
    public store: Store<AppState>,
    public route: ActivatedRoute,
    public router: Router,
    public translations: TranslationService,
    public errorHandler: MainUIErrorHandler,
    private formErrorsService: FormErrorsService
  ) {
    this.subscriptions = [];
    this.form = this.InitUserForm();
  }

  ngOnInit(): void {
    this.IsAdminView = this.route.snapshot.paramMap.get('ugid') != null;

    if (this.IsAdminView) {
      this.store.dispatch(loadUserByAdmin({ ugid: this.route.snapshot.paramMap.get('ugid') }));
      this.store.dispatch(loadCompanies());
    } else {
      this.store.dispatch(loadUser());
    }

    this.roles = [
      { id: 1, name: RolesEnum.User },
      { id: 2, name: RolesEnum.Premium },
      { id: 3, name: RolesEnum.Recruiter },
      { id: 4, name: RolesEnum.Support },
      { id: 5, name: RolesEnum.Admin }
    ];

    this.subscriptions.push(
      this.User$.subscribe((User) => {
        this.form.patchValue(User);

        this.selectedRole = this.roles[User.URID ? User.URID - 1 : 0].id;
      })
    );

    this.subscriptions.push(
      this.ErrorMessage$.subscribe((error) => {
        this.errorHandler.HandleException(error);
      })
    );
  }

  public Save = () => {
    let model = {
      UGID: '',
      URID: '',
      UFirstName: this.form.controls.UFirstName.value,
      ULastName: this.form.controls.ULastName.value,
      UUserName: this.form.controls.UUserName.value,
      UEmail: this.form.controls.UEmail.value,
      UPhone: this.form.controls.UPhone.value,
      UCompanyGID: ''
    };

    if (this.form.invalid) {
      return this.formErrorsService.getAllInvalidControls(this.form, '', UserTranslations);
    }

    if (this.IsAdminView) {
      model.UGID = this.form.controls.UGID.value;
      model.URID = this.selectedRole;
      model.UCompanyGID = this.form.controls.UCompanyGID.value;

      this.store.dispatch(saveUserByAdmin({ User: model }));
    } else {
      this.store.dispatch(saveUser({ User: model }));
    }
  };

  public Cancel = () => this.router.navigate(['/users']);

  private InitUserForm = (): FormGroup<FormModel> => {
    return new FormGroup<FormModel>({
      UID: new FormControl<number>({ value: 0, disabled: true }, { validators: [], nonNullable: true }),
      UGID: new FormControl<string>({ value: '', disabled: true }, { validators: [], nonNullable: true }),
      URID: new FormControl<number>(1, { validators: [], nonNullable: true }),
      UFirstName: new FormControl<string>('', { validators: [Validators.maxLength(50)], nonNullable: true }),
      ULastName: new FormControl<string>('', { validators: [Validators.maxLength(50)], nonNullable: true }),
      UUserName: new FormControl<string>(
        { value: '', disabled: true },
        { validators: [Validators.required, Validators.maxLength(100)], nonNullable: true }
      ),
      UEmail: new FormControl<string>('', {
        validators: [Validators.required, Validators.email, Validators.maxLength(100)],
        nonNullable: true
      }),
      UPhone: new FormControl<string>('', { validators: [Validators.maxLength(100)], nonNullable: true }),
      UCompany: new FormControl<string>('', { validators: [Validators.maxLength(100)], nonNullable: true }),
      UCompanyGID: new FormControl<string>('', { validators: [Validators.maxLength(100)], nonNullable: true })
    });
  };

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(cleanState());
  }
}
