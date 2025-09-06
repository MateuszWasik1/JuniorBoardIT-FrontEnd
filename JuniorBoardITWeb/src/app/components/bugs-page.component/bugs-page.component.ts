import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { TranslationService } from 'src/app/services/translate.service';
import {
  selectBugs,
  selectErrorMessage,
  selectFilters,
  selectUserRoles,
  selectBugsCount
} from './bugs-page-state/bugs-page-state.selectors';
import {
  changeBugsType,
  changeMessageFilterValue,
  cleanState,
  loadBugs,
  loadUserRoles,
  updatePaginationData
} from './bugs-page-state/bugs-page-state.actions';
import { Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { BugTypeEnum } from 'src/app/enums/Bugs/BugTypeEnum';
import { AsyncPipe, DatePipe, NgClass, NgFor } from '@angular/common';
import { PaginatorComponent } from '../shared/paginator.component/paginator.component';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-bugs-page',
  templateUrl: './bugs-page.component.html',
  styleUrls: ['./bugs-page.component.scss'],
  standalone: true,
  imports: [
    PaginatorComponent,
    AsyncPipe,
    DatePipe,
    NgClass,
    ButtonModule,
    SelectModule,
    ReactiveFormsModule,
    TooltipModule,
    InputTextModule
  ]
})
export class BugsPageComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[];
  public ShowAddModal: boolean = false;
  public count: number = 0;

  public formFilter: FormGroup = new FormGroup({});

  public Bugs$ = this.store.select(selectBugs);
  public Filters$ = this.store.select(selectFilters);
  public Count$ = this.store.select(selectBugsCount);
  public UserRoles$ = this.store.select(selectUserRoles);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  public defaultBugsType: BugTypeEnum = BugTypeEnum.New;

  public bugsTypes = [
    { name: 'Moje błędy', value: BugTypeEnum.My },
    { name: 'Weryfikowane przeze mnie', value: BugTypeEnum.ImVerificator },
    { name: 'Zamknięte', value: BugTypeEnum.Closed },
    { name: 'Nowe', value: BugTypeEnum.New },
    { name: 'Wszystkie', value: BugTypeEnum.All }
  ];

  public bugStatuses = [
    { id: '0', name: 'Nowy' },
    { id: '1', name: 'W weryfikacji' },
    { id: '2', name: 'Odrzucony' },
    { id: '3', name: 'Zaakceptowany' },
    { id: '4', name: 'W naprawie' },
    { id: '5', name: 'Naprawiony' }
  ];

  private debounceTimer: any;

  constructor(
    public store: Store<AppState>,
    public translations: TranslationService,
    public router: Router,
    public errorHandler: MainUIErrorHandler
  ) {
    this.subscriptions = [];
    this.formFilter = new FormGroup({
      filter: new FormControl(this.bugsTypes[3].value)
    });
  }
  ngOnInit(): void {
    this.store.dispatch(loadUserRoles());

    this.subscriptions.push(this.Filters$.subscribe(() => this.store.dispatch(loadBugs())));

    this.subscriptions.push(this.Count$.subscribe((count) => (this.count = count)));

    this.subscriptions.push(
      this.ErrorMessage$.subscribe((error) => {
        this.errorHandler.HandleException(error);
      })
    );
  }

  public DisplayStatus = (status: number) => this.bugStatuses[status].name;

  public AddBug = () => this.router.navigate(['bug/0']);

  public ModifyBug = (bgid: string) => this.router.navigate([`bug/${bgid}`]);

  public ChangeBugsType = (BugType: SelectChangeEvent) =>
    this.store.dispatch(changeBugsType({ BugType: BugType.value }));

  public ChangeMessageFilterValue = (event: Event) => {
    const message = (event.target as HTMLInputElement).value;

    clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      this.store.dispatch(changeMessageFilterValue({ Message: message }));
    }, 1000);
  };

  public UpdatePaginationData = (PaginationData: any) =>
    this.store.dispatch(updatePaginationData({ PaginationData: PaginationData }));

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(cleanState());
  }
}
