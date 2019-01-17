import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, Input, ViewChild, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { LoginService } from './login.service';
import { Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { alert } from 'devextreme/ui/dialog';
import { getMessageCodeError } from 'src/app/common/common.constant';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  public loginInfo: LoginInfo;
  authenticationError = false;

  public userName: string;
  public passWord: string;
  public popupForgotPassword = false;
  public email = '';
  public popupCheckEmail = false;
  public isLogged = false;

  @Output() routerMain = new EventEmitter();

  @ViewChild(HeaderComponent) headerComponent: HeaderComponent;

  constructor(private loginService: LoginService,
              private router: Router,
              private userService: UserService,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.loginInfo = new LoginInfo();
    this.authenticationError = false;
  }

  login() {
    this.loginInfo.userName = this.userName;
    this.loginInfo.passWord = this.passWord;
    this.loginService.login(this.loginInfo, this.loginSuccess.bind(this), this.loginError.bind(this));
  }

  loginSuccess(response = null) {
    if (response && response.accessToken) {
      this.cookieService.set('token', response.accessToken);
      this.isLogged = response.isLogged;
      if (!this.isLogged) {
        this.loginService.popupWellcome = true;
      } else {
        location.reload();
      }
      setTimeout(() => {
        this.loginService.popupLogin = false;
      }, 1000);
    } else {
      this.loginError();
    }
  }

  loginError(err = null) {
    this.authenticationError = true;
    sessionStorage.clear();
  }

  forgotPassword() {
    this.popupForgotPassword = true;
  }

  confirmForgotPassword() {
    if (!this.email) {
      alert('Vui lòng nhập email!', 'Yachttour');
    } else {
      this.userService.forgotPassword(this.email).subscribe( res => {
        this.popupCheckEmail = true;
        this.popupForgotPassword = false;
      }, err => {
        this.popupCheckEmail = true;
        alert(getMessageCodeError(err), 'Yachttour');
      });
    }
  }

}

class LoginInfo {
  userName?: string;
  passWord?: string;
}
