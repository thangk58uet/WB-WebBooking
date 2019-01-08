import { HttpClientCustom } from './../../service/httpclient.service';
import { Injectable } from '@angular/core';
import { Response} from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DetailsDuThuyenService {

  constructor(private httpClient: HttpClientCustom) { }

  public getAccessoryType(type): Observable<Response> {
    return this.httpClient.get(`/accessory-type/?type=${type}`).pipe(map((res: Response) => {
      return res.json();
    }));
  }

  public getComment(): Observable<Response> {
    return this.httpClient.get(`/comment/`).pipe(map((res: Response) => {
      return res.json();
    }));
  }

  public creatComment(params): Observable<Response> {
    return this.httpClient.post(`/comment/`, params).pipe(map((res: Response) => {
      return res.json();
    }));
  }
}
