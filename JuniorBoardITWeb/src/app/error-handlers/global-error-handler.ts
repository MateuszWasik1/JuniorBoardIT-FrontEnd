import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public handleError(): void {}
}
