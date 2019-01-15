import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-success',
  templateUrl: './book-success.component.html',
  styleUrls: ['./book-success.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BookSuccessComponent implements OnInit {

  @Output() closePopup = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  routerTour() {
    this.closePopup.emit();
    this.router.navigate(['/tour']);
  }

  routerMain() {
    this.closePopup.emit();
    this.router.navigate(['/trang-chu']);
  }

}
