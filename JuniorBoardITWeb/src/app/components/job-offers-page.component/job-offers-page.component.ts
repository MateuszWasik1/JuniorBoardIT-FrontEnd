import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { TranslationService } from 'src/app/services/translate.service';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { Router } from '@angular/router';
import {
  cleanState,
  deleteJobOffer,
  loadJobOffers,
  updatePaginationDataJobOffers
} from './job-offers-page-state/job-offers-page-state.actions';
import {
  selectCount,
  selectErrorMessage,
  selectFilters,
  selectJobOffers
} from './job-offers-page-state/job-offers-page-state.selectors';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { PaginatorComponent } from '../shared/paginator.component/paginator.component';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './job-offers-page.component.html',
  styleUrls: ['./job-offers-page.component.scss'],
  standalone: true,
  imports: [AsyncPipe, JsonPipe, PaginatorComponent]
})
export class JobOffersPageComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[];
  // public statuses: any;
  public count: number = 0;

  // public selectedFilterStatus: any;
  // public selectedFilterCategory: any;

  public Filters$ = this.store.select(selectFilters);
  public Count$ = this.store.select(selectCount);
  public JobOffers$ = this.store.select(selectJobOffers);
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
    // this.statuses = [
    //   {id: '0', name: 'Nie zaczęty'},
    //   {id: '1', name: 'W trakcie'},
    //   {id: '2', name: 'Skończony'},
    //   {id: '3', name: 'Wszystkie'},
    // ];

    this.subscriptions.push(this.Filters$.subscribe(() => this.store.dispatch(loadJobOffers())));

    this.subscriptions.push(this.ErrorMessage$.subscribe((error) => this.errorHandler.HandleException(error)));

    this.subscriptions.push(this.Count$.subscribe((count) => (this.count = count)));
  }

  // public ChangeCategoryFilterValue = (event: any) => this.store.dispatch(ChangeCategoryFilterValue({ value: event.value }));

  // public ChangeStatusFilterValue = (event: any) => this.store.dispatch(ChangeStatusFilterValue({ value: event.value }));

  // public DisplayStatus = (status: number) => this.statuses[status].name;

  public AddJobOffer = () => this.router.navigate(['job-offer/0']);

  public ModifyJobOffer = (JOGID: any) => this.router.navigate([`job-offer/${JOGID}`]);

  public DeleteJobOffer = (JOGID: any) => this.store.dispatch(deleteJobOffer({ JOGID: JOGID }));

  public UpdatePaginationData = (PaginationData: any) =>
    this.store.dispatch(updatePaginationDataJobOffers({ PaginationData: PaginationData }));

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(cleanState());
  }
}
