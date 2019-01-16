import { LoginService } from './../../component/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
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
  public lastName = '';

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
    this.lastName = sessionStorage.getItem('lastName');
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
    const result = confirm('Bạn muốn đăng xuất?', 'Yachttour');
    result['done']((dialogResult) => {
      if (dialogResult) {
        this.router.events.subscribe(e => {
          if (e instanceof NavigationEnd) {
            if (e.url === '/user-profile') {
              this.router.navigate(['/trang-chu']);
              return;
            }
          }
        });
        this.clearCookie();
        this.loginService.isLogin = false;
        sessionStorage.clear();
        location.reload();
      }
    });
  }

  clearCookie() {
    return this.cookieService.deleteAll();
  }
  routerLinkTour() {
    this.router.navigate(['/tour']);
  }

  routerLinkMain() {
    this.lastName = sessionStorage.getItem('lastName');
    this.loginService.popupWellcome = false;
    this.router.navigate(['/trang-chu']);
  }

  openUserProfile() {
    this.router.navigate(['/user-profile']);
  }

  routerTour() {
    this.lastName = sessionStorage.getItem('lastName');
    this.router.navigate(['/tour']);
    this.loginService.popupWellcome = false;
  }

  routerThe() {
    this.lastName = sessionStorage.getItem('lastName');
    this.router.navigate(['/noi-dung/huong-dan-su-dung-the']);
    this.loginService.popupWellcome = false;
  }
}
