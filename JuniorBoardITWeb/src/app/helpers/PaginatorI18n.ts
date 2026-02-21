import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

export class PaginatorI18n extends MatPaginatorIntl {
  public translate!: TranslateService;

  GetPaginatorIntl(translate: TranslateService) {
    this.translate = translate;

    const paginatorIntl = new MatPaginatorIntl();

    this.translate.onLangChange.subscribe(() => {
      this.TranslateLabels(paginatorIntl);
    });

    this.TranslateLabels(paginatorIntl);

    return paginatorIntl;
  }

  TranslateLabels(paginatorIntl: MatPaginatorIntl) {
    paginatorIntl.nextPageLabel = this.translate.instant('Paginator_NextPage');
    paginatorIntl.previousPageLabel = this.translate.instant('Paginator_PreviousPage');
    paginatorIntl.firstPageLabel = this.translate.instant('Paginator_FirstPage');
    paginatorIntl.lastPageLabel = this.translate.instant('Paginator_LastPage');
    this.changes.next();
  }
}
