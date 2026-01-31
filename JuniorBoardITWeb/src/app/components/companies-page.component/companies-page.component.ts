import { AsyncPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';
import { Subscription } from 'rxjs';

import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { PaginationDataModel } from 'src/app/models/general-models';
import { TranslationService } from 'src/app/services/translate.service';

import { AppState } from '../../app.state';
import {
  changeNameFilterValue,
  cleanState,
  deleteCompany,
  loadCompanies,
  updatePaginationData
} from './companies-page-state/companies-page-state.actions';
import {
  selectCompaniesCount,
  selectCompenies,
  selectErrorMessage,
  selectFilters
} from './companies-page-state/companies-page-state.selectors';
import { PaginatorComponent } from '../shared/paginator.component/paginator.component';

@Component({
  selector: 'app-companies-page',
  templateUrl: './companies-page.component.html',
  styleUrls: ['./companies-page.component.scss'],
  standalone: true,
  imports: [PaginatorComponent, AsyncPipe, ButtonModule, SelectModule, InputTextModule, TooltipModule]
})
export class CompaniesPageComponent implements OnInit, OnDestroy {
  public store = inject(Store<AppState>);
  public translations = inject(TranslationService);
  public router = inject(Router);
  public errorHandler = inject(MainUIErrorHandler);

  public subscriptions: Subscription[];
  public count = 0;

  public Companies$ = this.store.select(selectCompenies);
  public Filters$ = this.store.select(selectFilters);
  public Count$ = this.store.select(selectCompaniesCount);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private debounceTimer: any;

  constructor() {
    this.subscriptions = [];
  }
  ngOnInit(): void {
    this.subscriptions.push(this.Filters$.subscribe(() => this.store.dispatch(loadCompanies())));

    this.subscriptions.push(this.Count$.subscribe((count) => (this.count = count)));

    this.subscriptions.push(
      this.ErrorMessage$.subscribe((error) => {
        this.errorHandler.HandleException(error);
      })
    );
  }

  public AddCompany = () => this.router.navigate(['company/0']);

  public ModifyCompany = (CGID: string) => this.router.navigate([`company/${CGID}`]);

  public DeleteCompany = (CGID: string) => this.store.dispatch(deleteCompany({ CGID: CGID }));

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
