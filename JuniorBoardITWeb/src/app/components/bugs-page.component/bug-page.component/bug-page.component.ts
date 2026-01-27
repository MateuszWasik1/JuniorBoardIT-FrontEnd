import { AsyncPipe, DatePipe, NgClass, NgFor } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { Subscription } from 'rxjs';

import { BugStatusEnum } from 'src/app/enums/Bugs/BugStatusEnum';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { PaginationDataModel } from 'src/app/models/general-models';
import { FormErrorsService } from 'src/app/services/form-error.service';
import { TranslationService } from 'src/app/services/translate.service';

import { AppState } from '../../../app.state';
import { PaginatorComponent } from '../../shared/paginator.component/paginator.component';
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
import {
  selectBug,
  selectBugNotes,
  selectBugsNotesCount,
  selectErrorMessage,
  selectFiltersBugNotes,
  selectUserRoles
} from '../bugs-page-state/bugs-page-state.selectors';
import { Bug, BugNote, BugNoteTranslations, BugStatus, BugTranslations } from '../bugs-page.models';

interface FormBugModel {
  BGID: FormControl<string>;
  BTitle: FormControl<string>;
  BText: FormControl<string>;
  BStatus: FormControl<BugStatusEnum>;
}

interface FormBugNoteModel {
  BugNote: FormControl<string>;
}

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
  public store = inject(Store<AppState>);
  public translations = inject(TranslationService);
  public route = inject(ActivatedRoute);
  public router = inject(Router);
  public errorHandler = inject(MainUIErrorHandler);
  private formErrorsService = inject(FormErrorsService);

  public subscriptions: Subscription[];
  public form: FormGroup<FormBugModel>;
  public formBugNote: FormGroup<FormBugNoteModel>;
  public bgid = '';
  public count = 0;
  public isNewBugView = true;
  public selectedBugStatus: string;
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

  constructor() {
    this.subscriptions = [];
    this.form = this.InitBugForm();
    this.formBugNote = this.InitBugNoteForm();
    this.selectedBugStatus = '';
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

    const statuses = [
      { status: BugStatusEnum.New, color: 'Status-New' },
      { status: BugStatusEnum.InVerification, color: 'Status-InVerification' },
      { status: BugStatusEnum.Rejected, color: 'Status-Rejected' },
      { status: BugStatusEnum.Accepted, color: 'Status-Accepted' },
      { status: BugStatusEnum.InDevelopment, color: 'Status-InDevelopment' },
      { status: BugStatusEnum.Fixed, color: 'Status-Fixed' }
    ];

    const color = statuses[statuses.findIndex((x) => x.status == status)].color;

    return color;
  };

  public SaveBug = (): void => {
    if (this.form.invalid) {
      return this.formErrorsService.getAllInvalidControls(this.form, '', BugTranslations);
    }

    this.store.dispatch(saveBug({ bug: this.form.value as Bug }));
  };

  public AddBugNote = (): void => {
    const model: BugNote = {
      BNBGID: this.form.controls.BGID?.value,
      BNText: this.formBugNote.controls.BugNote?.value
    };

    if (this.formBugNote.invalid) {
      return this.formErrorsService.getAllInvalidControls(this.form, '', BugNoteTranslations);
    }

    this.store.dispatch(saveBugNote({ BugNote: model }));
  };

  public ChangeBugStatus = (event: BugStatusEnum): void => {
    const model: BugStatus = {
      BGID: this.form.controls.BGID?.value,
      Status: event
    };

    this.store.dispatch(changeBugStatus({ model: model }));
  };

  public Cancel = (): Promise<boolean> => this.router.navigate(['/bugs']);

  public UpdatePaginationData = (PaginationData: PaginationDataModel): void =>
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
