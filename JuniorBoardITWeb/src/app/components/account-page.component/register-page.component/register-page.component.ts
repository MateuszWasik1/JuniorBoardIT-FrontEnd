import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/services/translate.service';
import { RegisterUser } from '../account-page-state/account-page-state.actions';
import { PasswordConsistency, PatternValidator } from 'src/app/validators/forms.validator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { selectErrorMessage } from '../account-page-state/account-page-state.selectors';
import { ButtonModule } from 'primeng/button';

type FormModel = {
  UUserName: FormControl<string>;
  UEmail: FormControl<string>;
  UPassword: FormControl<string>;
  UPassword2: FormControl<string>;
};

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule]
})
export class RegisterComponent implements OnInit {
  public subscriptions: Subscription[];

  public IsPasswordsEqual: boolean = true;

  public ErrorMessage$ = this.store.select(selectErrorMessage);

  public form: FormGroup<FormModel>;

  constructor(
    public store: Store<AppState>,
    public translations: TranslationService,
    public router: Router,
    public errorHandler: MainUIErrorHandler
  ) {
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

  public RegisterUser = () => this.store.dispatch(RegisterUser({ user: this.form.value }));

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
