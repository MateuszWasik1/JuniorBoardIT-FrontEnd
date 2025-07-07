import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TranslationService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-ui-error-handler',
  templateUrl: './ui-error-handler.component.html',
  styleUrls: ['./ui-error-handler.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class UIErrorHandler {
  constructor(
    public translations: TranslationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
