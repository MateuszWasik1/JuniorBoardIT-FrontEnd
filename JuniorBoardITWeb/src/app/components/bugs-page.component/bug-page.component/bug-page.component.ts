import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  selectBug,
  selectBugNotes,
  selectBugsNotesCount,
  selectErrorMessage,
  selectFiltersBugNotes,
  selectUserRoles
} from '../bugs-page-state/bugs-page-state.selectors';
import {
  changeBugStatus,
  cleanState,
  loadBug,
  loadBugNotes,
  loadUserRoles,
  saveBug,
  saveBugNote,
  updateBugNotesPaginationData
} from '../bugs-page-state/bugs-page-state.actions';
import { TranslationService } from 'src/app/services/translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BugStatusEnum } from 'src/app/enums/Bugs/BugStatusEnum';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { MatFormField } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { PaginatorComponent } from '../../shared/paginator.component/paginator.component';
import { AsyncPipe, DatePipe, NgClass, NgFor } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';

type FormBugModel = {
  BGID: FormControl<string>;
  BTitle: FormControl<string>;
  BText: FormControl<string>;
  BStatus: FormControl<BugStatusEnum>;
};

type FormBugNoteModel = {
  BugNote: FormControl<string>;
};

@Component({
  selector: 'app-bug-page',
  templateUrl: './bug-page.component.html',
  styleUrls: ['./bug-page.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PaginatorComponent,
    AsyncPipe,
    DatePipe,
    NgClass,
    MatFormField,
    MatSelect,
    MatOption,
    NgFor,
    ButtonModule,
    TextareaModule
  ]
})
export class BugPageComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[];
  public form: FormGroup<FormBugModel>;
  public formBugNote: FormGroup<FormBugNoteModel>;
  public bgid: string = '';
  public count: number = 0;
  public isNewBugView: boolean = true;
  public selectedBugStatus: any;
  public bugStatusAdmin = [
    { id: '0', name: 'Nowy' },
    { id: '1', name: 'W weryfikacji' },
    { id: '2', name: 'Odrzucony' },
    { id: '3', name: 'Zaakceptowany' },
    { id: '4', name: 'W naprawie' },
    { id: '5', name: 'Naprawiony' }
  ];
  public bugStatusUser = [{ id: '0', name: 'Nowy' }];

  public Bug$ = this.store.select(selectBug);
  public BugNotes$ = this.store.select(selectBugNotes);
  public Filters$ = this.store.select(selectFiltersBugNotes);
  public Count$ = this.store.select(selectBugsNotesCount);
  public UserRoles$ = this.store.select(selectUserRoles);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(
    public store: Store<AppState>,
    public translations: TranslationService,
    public route: ActivatedRoute,
    public router: Router,
    public errorHandler: MainUIErrorHandler
  ) {
    this.subscriptions = [];
    this.form = this.InitBugForm();
    this.formBugNote = this.InitBugNoteForm();
  }
  ngOnInit(): void {
    this.bgid = this.route.snapshot.paramMap.get('bgid') ?? '';
    this.isNewBugView = this.bgid == '' || this.bgid == '0';

    if (!this.isNewBugView) {
      this.store.dispatch(loadBug({ bgid: this.bgid }));
      this.store.dispatch(loadBugNotes({ bgid: this.bgid }));
    }

    this.store.dispatch(loadUserRoles());

    this.subscriptions.push(
      this.Bug$.subscribe((bug) => {
        this.form.patchValue(bug);

        this.selectedBugStatus = this.bugStatusAdmin[bug.BStatus].id;
      })
    );

    this.subscriptions.push(
      this.ErrorMessage$.subscribe((error) => {
        this.errorHandler.HandleException(error);
      })
    );

    this.subscriptions.push(this.Count$.subscribe((count) => (this.count = count)));

    this.subscriptions.push(this.Filters$.subscribe(() => this.store.dispatch(loadBugNotes({ bgid: this.bgid }))));
  }

  public ChangeColor = (IsStatusChange: boolean, status: number): string => {
    if (!IsStatusChange) return '';

    let statuses = [
      { status: BugStatusEnum.New, color: 'Status-New' },
      { status: BugStatusEnum.InVerification, color: 'Status-InVerification' },
      { status: BugStatusEnum.Rejected, color: 'Status-Rejected' },
      { status: BugStatusEnum.Accepted, color: 'Status-Accepted' },
      { status: BugStatusEnum.InDevelopment, color: 'Status-InDevelopment' },
      { status: BugStatusEnum.Fixed, color: 'Status-Fixed' }
    ];

    let color = statuses[statuses.findIndex((x) => x.status == status)].color;

    return color;
  };

  public SaveBug = (): void => this.store.dispatch(saveBug({ bug: this.form.value }));

  public AddBugNote = (): void => {
    let model = {
      BNBGID: this.form.controls.BGID?.value,
      BNText: this.formBugNote.controls.BugNote?.value
    };
    this.store.dispatch(saveBugNote({ BugNote: model }));
  };

  public ChangeBugStatus = (event: any): void => {
    let model = {
      BGID: this.form.controls.BGID?.value,
      Status: event.value
    };

    this.store.dispatch(changeBugStatus({ model: model }));
  };

  public Cancel = (): Promise<boolean> => this.router.navigate(['/bugs']);

  public UpdatePaginationData = (PaginationData: any): void =>
    this.store.dispatch(updateBugNotesPaginationData({ PaginationData: PaginationData }));

  private InitBugForm = (): FormGroup<FormBugModel> => {
    return new FormGroup<FormBugModel>({
      BGID: new FormControl('', { validators: [], nonNullable: true }),
      BTitle: new FormControl(
        { value: '', disabled: !this.isNewBugView },
        { validators: [Validators.required, Validators.maxLength(200)], nonNullable: true }
      ),
      BText: new FormControl(
        { value: '', disabled: !this.isNewBugView },
        { validators: [Validators.required, Validators.maxLength(4000)], nonNullable: true }
      ),
      BStatus: new FormControl(BugStatusEnum.New, { validators: [], nonNullable: true })
    });
  };

  private InitBugNoteForm = (): FormGroup<FormBugNoteModel> => {
    return new FormGroup<FormBugNoteModel>({
      BugNote: new FormControl('', { validators: [Validators.required, Validators.maxLength(4000)], nonNullable: true })
    });
  };

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(cleanState());
  }
}
