import { Component, OnInit, Input, ViewChild, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { LoginService } from './login.service';
import { Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from 'src/app/layout/header/header.component';

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
  @Output() routerMain = new EventEmitter();

  @ViewChild(HeaderComponent) headerComponent: HeaderComponent;

  constructor(private loginService: LoginService,
              private router: Router) { }

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
      this.loginService.popupWellcome = true;
      sessionStorage.setItem('token', response.accessToken);
      // location.reload();
      this.routerMain.emit();
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
}

class LoginInfo {
  userName?: string;
  passWord?: string;
}
