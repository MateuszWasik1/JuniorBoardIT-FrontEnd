import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UIErrorHandler } from './ui-error-handler/ui-error-handler.component';

@Injectable({
  providedIn: 'root'
})
export class MainUIErrorHandler {
  private dialog = inject(MatDialog);

  public HandleException(error: string) {
    if (error) {
      this.dialog.open(UIErrorHandler, {
        minWidth: '658px',
        minHeight: '140px',
        data: {
          error: error
        },
        panelClass: 'ui-error-handler-modal'
      });
    }
  }
}
