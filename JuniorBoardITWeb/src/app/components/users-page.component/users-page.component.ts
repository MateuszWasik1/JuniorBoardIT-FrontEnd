import { AsyncPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';
import { Subscription } from 'rxjs';

import { RolesEnum } from 'src/app/enums/RolesEnum';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { PaginationDataModel, SelectObjectModel } from 'src/app/models/general-models';
import { TranslationService } from 'src/app/services/translate.service';

import { AppState } from '../../app.state';
import {
  changeHasCompanyFilterValue,
  changeNameFilterValue,
  changeUserRoleFilterValue,
  cleanState,
  deleteUser,
  loadUsers,
  updatePaginationData
} from './users-page-state/users-page-state.actions';
import {
  selectCount,
  selectErrorMessage,
  selectFilters,
  selectUsers
} from './users-page-state/users-page-state.selectors';
import { PaginatorComponent } from '../shared/paginator.component/paginator.component';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    PaginatorComponent,
    SelectModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    TooltipModule
  ]
})
export class UsersPageComponent implements OnInit, OnDestroy {
  public store = inject(Store<AppState>);
  public translations = inject(TranslationService);
  public router = inject(Router);
  public errorHandler = inject(MainUIErrorHandler);

  public subscriptions: Subscription[];
  public roles: SelectObjectModel[] = [
    { id: 0, name: 'Wszyscy' },
    { id: 1, name: RolesEnum.User },
    { id: 2, name: RolesEnum.Premium },
    { id: 3, name: RolesEnum.Recruiter },
    { id: 4, name: RolesEnum.Support },
    { id: 5, name: RolesEnum.Admin }
  ];

  public count = 0;

  public formFilter: FormGroup = new FormGroup({});

  public Users$ = this.store.select(selectUsers);
  public Filters$ = this.store.select(selectFilters);
  public Count$ = this.store.select(selectCount);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private debounceTimer: any;

  constructor() {
    this.subscriptions = [];
    this.formFilter = new FormGroup({
      role: new FormControl(this.roles[0].id)
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.ErrorMessage$.subscribe((error) => {
        this.errorHandler.HandleException(error);
      })
    );

    this.subscriptions.push(this.Filters$.subscribe(() => this.store.dispatch(loadUsers())));

    this.subscriptions.push(this.Count$.subscribe((count) => (this.count = count)));
  }

  public GoToUser = (ugid: string) => this.router.navigate([`/user/${ugid}`]);

  public DisplayRoles = (role: number) => this.roles[role].name;

  public DeleteUser = (ugid: string) => this.store.dispatch(deleteUser({ UGID: ugid }));

  public ChangeUserRoleFilterValue = (role: number) =>
    this.store.dispatch(changeUserRoleFilterValue({ UserRole: role }));

  public ChangeHasCompanyFilterValue = (hasCompany: boolean) =>
    this.store.dispatch(changeHasCompanyFilterValue({ HasCompany: hasCompany }));

  public ChangeNameFilterValue = (event: Event) => {
    const name = (event.target as HTMLInputElement).value;

    clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      this.store.dispatch(changeNameFilterValue({ Name: name }));
    }, 1000);
  };

  public UpdatePaginationData = (PaginationData: PaginationDataModel) =>
    this.store.dispatch(updatePaginationData({ PaginationData: PaginationData }));

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(cleanState());
  }
}
