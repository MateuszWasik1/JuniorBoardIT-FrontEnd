import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/services/translate.service';
import { Login } from '../account-page-state/account-page-state.actions';
import { Router } from '@angular/router';
import { selectErrorMessage } from '../account-page-state/account-page-state.selectors';
import { Subscription } from 'rxjs';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { ButtonModule } from 'primeng/button';
import { FormErrorsService } from 'src/app/services/form-error.service';

type FormModel = {
  UUserName: FormControl<string>;
  UPassword: FormControl<string>;
};

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['../register-page.component/register-page.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule]
})
export class LoginComponent implements OnInit {
  public subscriptions: Subscription[];

  public form: FormGroup<FormModel>;

  public LoginTranslations = {
    UUserName: 'Account_Register_UserName',
    UPassword: 'Account_Register_Password'
  };

  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(
    public store: Store<AppState>,
    public translations: TranslationService,
    public router: Router,
    public errorHandler: MainUIErrorHandler,
    private formErrorsService: FormErrorsService
  ) {
    this.subscriptions = [];
    this.form = this.InitLoginForm();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.ErrorMessage$.subscribe((error) => {
        this.errorHandler.HandleException(error);
      })
    );
  }

  public Clear = () => this.form.reset();

  public Login = () => {
    if (this.form.invalid) {
      return this.formErrorsService.getAllInvalidControls(this.form, '', this.LoginTranslations);
    }

    this.store.dispatch(Login({ user: this.form.value }));
  };

  private InitLoginForm = (): FormGroup<FormModel> => {
    return new FormGroup<FormModel>({
      UUserName: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
      UPassword: new FormControl<string>('', { validators: [Validators.required], nonNullable: true })
    });
  };

  public GoToRegistration = () => this.router.navigate(['/register']);
}
