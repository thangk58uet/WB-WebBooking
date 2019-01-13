import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers } from '@angular/http';

import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class CommonHttpService {
  private API_URL: string = environment.apiUrl;

  constructor(
    private router: Router,
    private http: Http,
    private cookieService: CookieService) {}

  private  getAccessToken() {
    return sessionStorage.getItem('token');
  }

  private setAuthorization(headers: Headers) {
    headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
  }

  public post(url, data = null, successCallback = null, failCallback = null) {
    const headers = new Headers();
    this.setAuthorization(headers);
    this.http.post(this.API_URL + url, data, {headers: headers})
      .toPromise()
      .then(response => {
        const res = response.json();
        // tslint:disable-next-line:no-unused-expression
        successCallback && successCallback(res);
      })
      .catch(error => {
        this.logout(error);
        // tslint:disable-next-line:no-unused-expression
        failCallback && failCallback(error);
      });
  }

  public get(url, params, successCallback = null, failCallback = null) {
    const headers = new Headers();
    this.setAuthorization(headers);
    const accessToken = this.getAccessToken();
    if (!sessionStorage.getItem('userName')) {
      this.router.navigate(['/login/']);
    } else {
      this.http.get(this.API_URL + url, {headers: headers, search: params}).toPromise()
        .then(response => {
          const res = response.json();
          // tslint:disable-next-line:no-unused-expression
          successCallback && successCallback(res);
        })
        .catch(error => {
          this.logout(error);
          // tslint:disable-next-line:no-unused-expression
          failCallback && failCallback(error);
        });

    }
  }

  public getBinary(url, successCallback = null, failCallback = null) {
    const xhr = new XMLHttpRequest();
    xhr.open('get', this.API_URL + url, true);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
    if (sessionStorage.getItem('token')) {
      xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    }
    xhr.responseType = 'arraybuffer';
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // tslint:disable-next-line:no-unused-expression
          successCallback && successCallback(xhr.response);
        } else {
          // tslint:disable-next-line:no-unused-expression
          failCallback && failCallback('Error');
        }
      }
    };
    xhr.send();
  }

  logout(e) {
    if (e.status === 401) {
      this.router.navigate(['/login/']);
    }
  }
}
