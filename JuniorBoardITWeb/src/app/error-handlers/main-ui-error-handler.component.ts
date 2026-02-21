import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MainUIErrorHandler {
  private messageService = inject(MessageService);

  public HandleException(error: string) {
    if (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Błąd',
        detail: error
      });
    }
  }
}
