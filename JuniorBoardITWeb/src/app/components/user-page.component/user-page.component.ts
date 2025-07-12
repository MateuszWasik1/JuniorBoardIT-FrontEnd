import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/services/translate.service';
import {
  cleanState,
  loadUser,
  loadUserByAdmin,
  saveUser,
  saveUserByAdmin
} from './user-page-state/user-page-state.actions';
import { selectErrorMessage, selectUser } from './user-page-state/user-page-state.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { RolesEnum } from 'src/app/enums/RolesEnum';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

type FormModel = {
  UID: FormControl<number>;
  UGID: FormControl<string>;
  UFirstName: FormControl<string>;
  ULastName: FormControl<string>;
  UUserName: FormControl<string>;
  UEmail: FormControl<string>;
  UPhone: FormControl<string>;
};

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  standalone: true,
  imports: [MatSelectModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule]
})
export class UserPageComponent implements OnInit, OnDestroy {
  public IsAdminView: boolean = false;
  public roles: any;
  public selectedRole: any;
  public selectedFilterRole: any;
  public subscriptions: Subscription[];

  public form = new FormGroup<FormModel>({
    UID: new FormControl<number>(0, { validators: [], nonNullable: true }),
    UGID: new FormControl<string>('', { validators: [], nonNullable: true }),
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
    UPhone: new FormControl<string>('', { validators: [Validators.maxLength(100)], nonNullable: true })
  });

  public User$ = this.store.select(selectUser);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(
    public store: Store<AppState>,
    public route: ActivatedRoute,
    public router: Router,
    public translations: TranslationService,
    public errorHandler: MainUIErrorHandler
  ) {
    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.IsAdminView = this.route.snapshot.paramMap.get('ugid') != null;

    if (this.IsAdminView) this.store.dispatch(loadUserByAdmin({ ugid: this.route.snapshot.paramMap.get('ugid') }));
    else this.store.dispatch(loadUser());

    this.roles = [
      { id: '1', name: RolesEnum.User },
      { id: '2', name: RolesEnum.Premium },
      { id: '3', name: RolesEnum.Recruiter },
      { id: '4', name: RolesEnum.Support },
      { id: '5', name: RolesEnum.Admin }
    ];

    this.subscriptions.push(
      this.User$.subscribe((user) => {
        this.form.patchValue({
          UID: user.uid,
          UGID: user.ugid,
          UFirstName: user.uFirstName,
          ULastName: user.uLastName,
          UUserName: user.uUserName,
          UEmail: user.uEmail,
          UPhone: user.uPhone
        });

        this.selectedRole = this.roles[user.urid ? user.urid - 1 : 0].id;
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
      UPhone: this.form.controls.UPhone.value
    };

    if (this.IsAdminView) {
      model.UGID = this.form.controls.UGID.value;
      model.URID = this.selectedRole;
      this.store.dispatch(saveUserByAdmin({ User: model }));
    } else this.store.dispatch(saveUser({ User: model }));
  };

  public Cancel = () => this.router.navigate(['/users']);

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(cleanState());
  }
}
