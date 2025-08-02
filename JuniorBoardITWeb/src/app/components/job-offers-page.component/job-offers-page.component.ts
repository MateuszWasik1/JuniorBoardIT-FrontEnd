import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { TranslationService } from 'src/app/services/translate.service';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { Router } from '@angular/router';
import {
  ChangeEducationFilterValue,
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
import { SelectModule } from 'primeng/select';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './job-offers-page.component.html',
  styleUrls: ['./job-offers-page.component.scss'],
  standalone: true,
  imports: [AsyncPipe, JsonPipe, PaginatorComponent, ReactiveFormsModule, SelectModule]
})
export class JobOffersPageComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[];
  public educationTypes = [
    { id: 0, name: 'Podstawowe' },
    { id: 1, name: 'Średnie' },
    { id: 2, name: 'Zawodowe' },
    { id: 3, name: 'Wyższe pierwszego stopnia' },
    { id: 4, name: 'Wyższe drugiego stopnia' },
    { id: 5, name: 'Wszystkie' }
  ];
  public count: number = 0;

  public formFilter: FormGroup = new FormGroup({});

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
    this.formFilter = new FormGroup({
      education: new FormControl(this.educationTypes[5].id)
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(this.Filters$.subscribe(() => this.store.dispatch(loadJobOffers())));

    this.subscriptions.push(this.ErrorMessage$.subscribe((error) => this.errorHandler.HandleException(error)));

    this.subscriptions.push(this.Count$.subscribe((count) => (this.count = count)));
  }

  public ChangeEducationFilterValue = (event: any) =>
    this.store.dispatch(ChangeEducationFilterValue({ value: event.value }));

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
