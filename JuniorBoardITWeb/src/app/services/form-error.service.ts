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
    let invalidFields: any[] = [];

    Object.keys(form.controls).forEach((key) => {
      const control: AbstractControl | null = form.get(key);
      const controlPath = path ? `${path}.${key}` : key;

      if (control instanceof FormGroup || control instanceof FormArray) {
        invalidFields = invalidFields.concat(this.getAllInvalidControls(control, controlPath));
      } else if (control && control.invalid) {
        invalidFields.push(controlPath);
      }
    });

    let invalidFieldTitles: string[] = [];
    invalidFields.map((invalidField) => invalidFieldTitles.push(this.translations.Get(translationEnum[invalidField])));

    this.snackbarService.warn(
      'Uwaga!',
      `${invalidFieldTitles.length == 1 ? 'Pole' : 'Pola'}: ${invalidFieldTitles.join(', ')} nie ${invalidFieldTitles.length == 1 ? 'jest' : 'są'} poprawnie wypełnione!`
    );
  }
}
