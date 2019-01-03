import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
const API_URL = environment.apiUrl;

@Injectable()
export class LoginService {

  public popupLogin = false;
  public isLogin = false;
  constructor(private http: Http,
              private cookieService: CookieService) {
  }

  login(loginInfo, successCallback = null, failCallback = null) {
    return new Promise((resolve, reject) => {
      this.doLogin(loginInfo).subscribe((data) => {
        this.isLogin = true;
        sessionStorage.setItem('token', data.json().value.accessToken);
        // tslint:disable-next-line:no-unused-expression
        successCallback && successCallback(data.json().value);
      }, (err) => {
        reject(err);
        this.isLogin = false;
        // tslint:disable-next-line:no-unused-expression
        failCallback && failCallback(err.json());
      });
    });
  }

  private doLogin(loginInfo: LoginInfo): Observable<any> {
    const data = {
      username: loginInfo.userName,
      password: loginInfo.passWord
    };
    return this.http.post(API_URL + '/authentication/login', data);
  }

  getToken() {
    return (this.cookieService.get('token'));
  }

}

class LoginInfo {
  userName?: string;
  passWord?: string;
}
