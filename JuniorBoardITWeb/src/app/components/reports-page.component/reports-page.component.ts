import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { TranslationService } from 'src/app/services/translate.service';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { Router } from '@angular/router';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { PaginatorComponent } from '../shared/paginator.component/paginator.component';
import { cleanState, loadReports, updatePaginationDataReports } from './reports-page-state/reports-page-state.actions';
import {
  selectCount,
  selectErrorMessage,
  selectFilters,
  selectReports
} from './reports-page-state/reports-page-state.selectors';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss'],
  standalone: true,
  imports: [AsyncPipe, JsonPipe, PaginatorComponent, CardModule]
})
export class ReportsPageComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[];
  public statuses = [
    { id: '0', name: 'Nowe' },
    { id: '1', name: 'W weryfikacji' },
    { id: '2', name: 'Odrzucone' },
    { id: '3', name: 'Zaakceptowane' }
  ];
  public count: number = 0;

  // public selectedFilterStatus: any;
  // public selectedFilterCategory: any;

  public Filters$ = this.store.select(selectFilters);
  public Count$ = this.store.select(selectCount);
  public Reports$ = this.store.select(selectReports);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(
    public store: Store<AppState>,
    public router: Router,
    public translations: TranslationService,
    public errorHandler: MainUIErrorHandler
  ) {
    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.subscriptions.push(this.Filters$.subscribe(() => this.store.dispatch(loadReports())));

    this.subscriptions.push(this.ErrorMessage$.subscribe((error) => this.errorHandler.HandleException(error)));

    this.subscriptions.push(this.Count$.subscribe((count) => (this.count = count)));
  }

  // public ChangeCategoryFilterValue = (event: any) => this.store.dispatch(ChangeCategoryFilterValue({ value: event.value }));

  // public ChangeStatusFilterValue = (event: any) => this.store.dispatch(ChangeStatusFilterValue({ value: event.value }));

  public DisplayStatus = (status: number) => this.statuses[status].name;

  public CheckReport = (RGID: any) => this.router.navigate([`reports/${RGID}`]);

  public UpdatePaginationData = (PaginationData: any) =>
    this.store.dispatch(updatePaginationDataReports({ PaginationData: PaginationData }));

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(cleanState());
  }
}
