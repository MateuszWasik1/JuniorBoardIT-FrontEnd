import { inject, Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

import { SnackBarService } from './snackbar.service';
import { TranslationService } from './translate.service';

@Injectable({ providedIn: 'root' })
export class FormErrorsService {
  private translations = inject(TranslationService);
  private snackbarService = inject(SnackBarService);

  getAllInvalidControls(form: FormGroup | FormArray, path = '', translationEnum?: any): void {
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

    const invalidFieldTitles: string[] = [];
    invalidFields.map((invalidField) => invalidFieldTitles.push(this.translations.Get(translationEnum[invalidField])));

    this.snackbarService.warn(
      'Uwaga!',
      `${invalidFieldTitles.length == 1 ? 'Pole' : 'Pola'}: ${invalidFieldTitles.join(', ')} nie ${invalidFieldTitles.length == 1 ? 'jest' : 'są'} poprawnie wypełnione!`
    );
  }
}
