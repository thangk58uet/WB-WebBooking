import { LoginService } from './../../component/login/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public popupLogin = false;
  public toDate;
  public fromDate;
  constructor(public loginService: LoginService) { }

  ngOnInit() {
    if (sessionStorage.getItem('token')) {
      this.loginService.isLogin = true;
    } else {
      this.loginService.isLogin = false;
    }
  }

  login() {
    this.loginService.popupLogin = true;
  }

  register() {
    this.loginService.popupRegister = true;
  }

  logout() {
    this.loginService.isLogin = false;
    sessionStorage.clear();
  }
}
