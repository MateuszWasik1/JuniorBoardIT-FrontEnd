import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private messageService: MessageService) {}

  show(severity: 'success' | 'info' | 'warn' | 'error', summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  success(summary: string, detail: string) {
    this.show('success', summary, detail);
  }

  info(summary: string, detail: string) {
    this.show('info', summary, detail);
  }

  warn(summary: string, detail: string) {
    this.show('warn', summary, detail);
  }

  error(summary: string, detail: string) {
    this.show('error', summary, detail);
  }
}
