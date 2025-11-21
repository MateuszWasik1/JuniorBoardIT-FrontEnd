import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  public translate = inject(TranslateService);

  public Get = (translation: string) => this.translate.instant(translation);
}
