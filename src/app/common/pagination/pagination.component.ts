import { Component, OnInit, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaginationComponent implements OnInit {
  @Output() goPage = new EventEmitter<number>();
  @Input() totalPages: number;
  @Input() pagesToShow: number;
  @Input() currentPage: number;

  constructor() {}

  ngOnInit() {
    this.currentPage = 1;
    this.goToPage(1);
  }

  goToPage(n: number): void {
    if (n !== this.currentPage) {
      this.currentPage = n;
      this.goPage.emit(n);
    }
  }

  isDisabledPreviousBtn() {
    return this.currentPage <= 1 || this.totalPages === 0 ;
  }

  isDisabledNextBtn() {
    return this.currentPage >= this.totalPages || this.totalPages === 0 ;
  }

  previous(isGoFirst = false) {
    if (this.isDisabledPreviousBtn()) {
      return;
    }
    if (isGoFirst) {
      this.goToPage(1);
    } else {
      this.goToPage(this.currentPage - 1);
    }
  }

  next(isGoLast = false) {
    if (this.isDisabledNextBtn()) {
      return;
    }
    if (isGoLast) {
      this.goToPage(this.totalPages);
    } else {
      this.goToPage(this.currentPage + 1);
    }
  }

  getPages(): number[] {
    const p = this.currentPage || 1;
    const pagesToShow = this.pagesToShow || 9;
    const pages: number[] = [];
    pages.push(p);
    const times = pagesToShow - 1;
    for (let i = 0; i < times; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
      }
      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < this.totalPages) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }

    pages.sort((a, b) => a - b);
    return pages;
  }

}

