import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';

import { TranslationService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  standalone: true,
  imports: [MatPaginatorModule]
})
export class PaginatorComponent {
  @Input() length = 50;
  @Output() paginationData = new EventEmitter<object>();

  public translations = inject(TranslationService);

  public pageSizeOptions: number[] = [1, 3, 5, 10, 15, 20, 25, 50, 100];
  public pageSize = 10;
  public pageIndex = 0;

  HandlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.paginationData.emit({
      Skip: this.pageIndex * this.pageSize,
      Take: this.pageSize
    });
  }
}
