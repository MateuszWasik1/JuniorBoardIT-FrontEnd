import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { TranslationService } from 'src/app/services/translate.service';
import {
  selectCompaniesCount,
  selectCompenies,
  selectErrorMessage,
  selectFilters
} from './companies-page-state/companies-page-state.selectors';
import {
  cleanState,
  deleteCompany,
  loadCompanies,
  updatePaginationData
} from './companies-page-state/companies-page-state.actions';
import { Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { AsyncPipe } from '@angular/common';
import { PaginatorComponent } from '../shared/paginator.component/paginator.component';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-companies-page',
  templateUrl: './companies-page.component.html',
  styleUrls: ['./companies-page.component.scss'],
  standalone: true,
  imports: [PaginatorComponent, AsyncPipe, ButtonModule, SelectModule]
})
export class CompaniesPageComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[];
  public count: number = 0;

  public Companies$ = this.store.select(selectCompenies);
  public Filters$ = this.store.select(selectFilters);
  public Count$ = this.store.select(selectCompaniesCount);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(
    public store: Store<AppState>,
    public translations: TranslationService,
    public router: Router,
    public errorHandler: MainUIErrorHandler
  ) {
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

  public UpdatePaginationData = (PaginationData: any) =>
    this.store.dispatch(updatePaginationData({ PaginationData: PaginationData }));

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(cleanState());
  }
}
