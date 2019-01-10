import { Injectable } from '@angular/core';
import { Response} from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientCustom } from '../../service/httpclient.service';

@Injectable()
export class MainService {

  constructor(private httpClient: HttpClientCustom) { }

  public getNews(): Observable<Response> {
    return this.httpClient.get('/news').pipe(map((res: Response) => {
      return res.json();
    }));
  }
}
