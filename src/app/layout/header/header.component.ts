import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public popupLogin = false;
  constructor() { }

  ngOnInit() {
  }

  login() {
    this.popupLogin = true;
  }

  register() {
    alert('b');
  }
}
