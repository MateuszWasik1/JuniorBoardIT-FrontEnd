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
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['../register-page.component/register-page.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule]
})
export class LoginComponent implements OnInit {
  public subscriptions: Subscription[];

  public ErrorMessage$ = this.store.select(selectErrorMessage);

  public form = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    public store: Store<AppState>,
    public translations: TranslationService,
    public router: Router,
    public errorHandler: MainUIErrorHandler
  ) {
    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.ErrorMessage$.subscribe((error) => {
        this.errorHandler.HandleException(error);
      })
    );
  }

  public Clear = () => {
    this.form.get('userName')?.setValue('');
    this.form.get('password')?.setValue('');
  };

  public Login = () => {
    let model = {
      UUserName: this.form.get('userName')?.value,
      UPassword: this.form.get('password')?.value
    };

    this.store.dispatch(Login({ user: model }));
  };

  public GoToRegistration = () => this.router.navigate(['/register']);
}
