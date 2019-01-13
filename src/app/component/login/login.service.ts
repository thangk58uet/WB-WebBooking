import { HttpClientCustom } from './../../service/httpclient.service';
import { Injectable } from '@angular/core';
import { Response} from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
const API_URL = environment.apiUrl;

@Injectable()
export class LoginService {

  public popupLogin = false;
  public popupRegister = false;
  public isLogin = false;
  public popupWellcome = false;

  constructor(private http: Http,
              private cookieService: CookieService,
              private httpClient: HttpClientCustom) {
  }

  login(loginInfo, successCallback = null, failCallback = null) {
    return new Promise((resolve, reject) => {
      this.doLogin(loginInfo).subscribe((data) => {
        this.isLogin = true;
        sessionStorage.setItem('token', data.json().value.accessToken);

        sessionStorage.setItem('firstName', data.json().value.firstName);
        sessionStorage.setItem('lastName', data.json().value.lastName);
        sessionStorage.setItem('email', data.json().value.email);
        sessionStorage.setItem('cardNumber', data.json().value.cardNumber);
        sessionStorage.setItem('phoneNumber', data.json().value.phoneNumber);
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
    return (sessionStorage.getItem('token'));
  }

  public register(params): Observable<Response> {
    return this.httpClient.post(`/account/register`, params).pipe(map((res: Response) => {
      return res.json();
    }));
  }

}

class LoginInfo {
  userName?: string;
  passWord?: string;
}
