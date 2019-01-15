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

  public getHistoryTour(): Observable<Response> {
    return this.httpClient.get(`/reservation/by-user/`).pipe(map((res: Response) => {
      return res.json();
    }));
  }

}
