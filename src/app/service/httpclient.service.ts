import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

const API_URL = environment.apiUrl;

@Injectable()
export class HttpClientCustom {

  constructor(private router: Router,
              private http: Http,
              private cookieService: CookieService) {
  }

  createAuthorizationHeader(headers: Headers) {
    if (this.cookieService.get('token')) {
      headers.append('Authorization', 'Bearer ' + this.cookieService.get('token'));
    }
  }

  get(url, params?) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(API_URL + url, {
      headers: headers,
      params: params
    });
  }

  logout(e) {
    if (e.status === 401) {
      this.router.navigate(['/login/']);
    }
  }

  post(url, data, params?) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(API_URL + url, data, {
      headers: headers,
      params: params
    });
  }

  postImg(url, data, params?) {

    const headers = new Headers();
    headers.append('Accept', '*/*');
    this.createAuthorizationHeader(headers);
    return this.http.post(API_URL + url, data, {
      headers: headers,
      params: params
    });
  }

  put(url, body: any, params?) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(API_URL + url, body, {
      headers: headers,
      params: params
    });
  }

  delete(url, params?) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(API_URL + url, {
      headers: headers,
      params: params
    });
  }
}
