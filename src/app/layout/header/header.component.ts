import { LoginService } from './../../component/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public lsMenu;

  constructor(public loginService: LoginService,
    private router: Router,
    public headerService: HeaderService) { }

  ngOnInit() {
    this.getMenu();
    if (sessionStorage.getItem('token')) {
      this.loginService.isLogin = true;
    } else {
      this.loginService.isLogin = false;
    }
  }

  getMenu() {
    this.headerService.getMenu().subscribe(res => {
      if (res && res['value']) {
          this.lsMenu = res['value'];
      }
    });
    
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

  routerLinkTour() {
    this.router.navigate(['/tour']);
  }
}
