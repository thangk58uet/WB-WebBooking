import { LoginService } from './../../component/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';
import { alert, confirm } from 'devextreme/ui/dialog';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public lsMenu;
  public fullName = '';

  constructor(public loginService: LoginService,
    private router: Router,
    public headerService: HeaderService,
    private cookieService: CookieService) { }

  ngOnInit() {
    this.getMenu();
    if (sessionStorage.getItem('token')) {
      this.loginService.isLogin = true;
    } else {
      this.loginService.isLogin = false;
    }
    this.fullName = this.cookieService.get('fullName');
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
    const result = confirm('Bạn muốn đăng xuất?', 'Yachttour.vn');
    result['done']((dialogResult) => {
      if (dialogResult) {
        this.loginService.isLogin = false;
        this.cookieService.deleteAll();
        sessionStorage.clear();
        location.reload();
      }
    });
  }

  routerLinkTour() {
    this.router.navigate(['/tour']);
  }
}
