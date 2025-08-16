import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { TranslationService } from './translate.service';
import { SnackBarService } from './snackbar.service';

@Injectable({ providedIn: 'root' })
export class FormErrorsService {
  constructor(
    private translations: TranslationService,
    private snackbarService: SnackBarService
  ) {}

  getAllInvalidControls(form: FormGroup | FormArray, path: string = '', translationEnum?: any): void {
    let invalid: any[] = [];

    Object.keys(form.controls).forEach((key) => {
      const control: AbstractControl | null = form.get(key);
      const controlPath = path ? `${path}.${key}` : key;

      if (control instanceof FormGroup || control instanceof FormArray) {
        invalid = invalid.concat(this.getAllInvalidControls(control, controlPath));
      } else if (control && control.invalid) {
        invalid.push(controlPath);
      }
    });

    let invalidFieldTitles: string[] = [];
    invalid.map((x) => invalidFieldTitles.push(this.translations.Get(translationEnum[x])));

    this.snackbarService.warn(
      'Uwaga!',
      `${invalidFieldTitles.length == 1 ? 'Pole' : 'Pola'}: ${invalidFieldTitles.join(', ')} nie ${invalidFieldTitles.length == 1 ? 'jest' : 'są'} poprawnie wypełnione!`
    );
  }
}
