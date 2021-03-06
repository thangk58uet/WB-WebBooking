import { HttpClientCustom } from './../../service/httpclient.service';
import { Injectable } from '@angular/core';
import { Response} from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
const API_URL = environment.apiUrl;


@Injectable()
export class StaticPageService {

  constructor(private http: Http,
              private httpClient: HttpClientCustom) {
  }
  public getStaticPage(link): Observable<any> {
    return this.httpClient.get('/setting-content/by-link/' + link).pipe(map((res: Response) => {
      return res.json();
    }));
  }

}