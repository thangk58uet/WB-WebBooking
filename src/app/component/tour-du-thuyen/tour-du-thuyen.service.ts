import { Injectable } from '@angular/core';
import { Response} from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientCustom } from '../../service/httpclient.service';

@Injectable()
export class TourDuThuyenService {

  constructor(private httpClient: HttpClientCustom) { }

  public getListBoatByParams(params): Observable<Response> {
    return this.httpClient.get(`/boat/`, params).pipe(map((res: Response) => {
      return res.json();
    }));
  }

}
