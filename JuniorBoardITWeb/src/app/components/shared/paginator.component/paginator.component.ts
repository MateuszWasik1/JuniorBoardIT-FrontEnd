import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { PaginatorState } from 'primeng/paginator';

import { PaginationDataModel } from 'src/app/models/general-models';
import { TranslationService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  standalone: true,
  imports: [PaginatorModule]
})
export class PaginatorComponent {
  @Input() length = 50;
  @Output() paginationData = new EventEmitter<PaginationDataModel>();

  public translations = inject(TranslationService);

  public pageSizeOptions: number[] = [1, 3, 5, 10, 15, 20, 25, 50, 100];
  public pageSize = 10;
  public pageIndex = 0;

  HandlePageEvent(e: PaginatorState) {
    this.pageSize = e.rows ?? this.pageSize;
    this.pageIndex = Math.floor((e.first ?? 0) / this.pageSize);

    this.paginationData.emit({
      Skip: this.pageIndex * this.pageSize,
      Take: this.pageSize
    });
  }
}
