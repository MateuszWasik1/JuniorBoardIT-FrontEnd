import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';

import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { FormErrorsService } from 'src/app/services/form-error.service';
import { TranslationService } from 'src/app/services/translate.service';
import { PasswordConsistency, PatternValidator } from 'src/app/validators/forms.validator';

import { AppState } from '../../../app.state';
import { RegisterUser } from '../account-page-state/account-page-state.actions';
import { selectErrorMessage } from '../account-page-state/account-page-state.selectors';
import { RegisterUserModel } from '../account-page.models';

interface FormModel {
  UUserName: FormControl<string>;
  UEmail: FormControl<string>;
  UPassword: FormControl<string>;
  UPassword2: FormControl<string>;
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule]
})
export class RegisterComponent implements OnInit {
  public store = inject(Store<AppState>);
  public translations = inject(TranslationService);
  public router = inject(Router);
  public errorHandler = inject(MainUIErrorHandler);
  private formErrorsService = inject(FormErrorsService);

  public subscriptions: Subscription[];

  public IsPasswordsEqual = true;

  public ErrorMessage$ = this.store.select(selectErrorMessage);

  public form: FormGroup<FormModel>;

  public RegisterTranslations = {
    UUserName: 'Account_Register_UserName',
    UEmail: 'Account_Register_Email',
    UPassword: 'Account_Register_Password',
    UPassword2: 'Account_Register_Password_Repeat'
  };

  constructor() {
    this.subscriptions = [];
    this.form = this.InitRegisterForm();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.ErrorMessage$.subscribe((error) => {
        this.errorHandler.HandleException(error);
      })
    );
  }

  public Clear = () => this.form.reset();

  public RegisterUser = () => {
    if (this.form.invalid) {
      return this.formErrorsService.getAllInvalidControls(this.form, '', this.RegisterTranslations);
    }

    this.store.dispatch(RegisterUser({ User: this.form.value as RegisterUserModel }));
  };

  private InitRegisterForm = (): FormGroup<FormModel> => {
    return new FormGroup<FormModel>(
      {
        UUserName: new FormControl<string>('', {
          validators: [Validators.required, Validators.maxLength(100)],
          nonNullable: true
        }),
        UEmail: new FormControl<string>('', {
          validators: [Validators.required, Validators.email, Validators.maxLength(100)],
          nonNullable: true
        }),
        UPassword: new FormControl<string>('', {
          validators: [
            Validators.required,
            Validators.minLength(8),
            PatternValidator(new RegExp('(?=.*[0-9])'), {
              requiresDigit: true
            }),
            PatternValidator(new RegExp('(?=.*[A-Z])'), {
              requiresUppercase: true
            }),
            PatternValidator(new RegExp('(?=.*[a-z])'), {
              requiresLowercase: true
            }),
            PatternValidator(new RegExp('(?=.*[$@^!%*?&])'), {
              requiresSpecialChars: true
            })
          ],
          nonNullable: true
        }),
        UPassword2: new FormControl<string>('', {
          validators: [
            Validators.required,
            Validators.minLength(8),
            PatternValidator(new RegExp('(?=.*[0-9])'), {
              requiresDigit: true
            }),
            PatternValidator(new RegExp('(?=.*[A-Z])'), {
              requiresUppercase: true
            }),
            PatternValidator(new RegExp('(?=.*[a-z])'), {
              requiresLowercase: true
            }),
            PatternValidator(new RegExp('(?=.*[$@^!%*?&])'), {
              requiresSpecialChars: true
            })
          ],
          nonNullable: true
        })
      },
      {
        validators: PasswordConsistency
      }
    );
  };

  public GoToLogin = () => this.router.navigate(['/login']);
}
