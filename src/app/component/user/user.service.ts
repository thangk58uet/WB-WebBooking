import { Injectable } from '@angular/core';
import { Response} from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientCustom } from '../../service/httpclient.service';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClientCustom) { }

  public getAccountInfo(): Observable<Response> {
    return this.httpClient.get(`/account/`).pipe(map((res: Response) => {
      return res.json();
    }));
  }

  public getHistoryTour(params): Observable<Response> {
    return this.httpClient.get(`/reservation/by-user/`,params).pipe(map((res: Response) => {
      return res.json();
    }));
  }


  public changePassword(params): Observable<Response> {
    return this.httpClient.put(`/account/change-password`, params).pipe(map((res: Response) => {
      return res.json();
    }));
  }

  public modifyAccountInfo(params): Observable<Response> {
    return this.httpClient.put(`/account/`, params).pipe(map((res: Response) => {
      return res.json();
    }));
  }

  public forgotPassword(params): Observable<Response> {
    return this.httpClient.post(`/account/reset-password/init/`, params).pipe(map((res: Response) => {
      return res.json();
    }));
  }

  public resetPassword(params): Observable<Response> {
    return this.httpClient.post(`/account/reset-password/finish/`, params).pipe(map((res: Response) => {
      return res.json();
    }));
  }

}
