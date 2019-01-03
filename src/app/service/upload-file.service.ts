import { Injectable } from '@angular/core';
import { Response} from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientCustom } from './httpclient.service';

@Injectable()
export class UploadFileService {

  constructor(private httpClient: HttpClientCustom) { }

  public uploadFile(url: any, file: any, params?): Observable<Response> {
    const input = new FormData();
    input.append('file', file);
    return this.httpClient.postImg(url, input, params).pipe(map((res: Response) => {
      return res.json();
    }));
  }

  public uploadMultiFile(url: any, file: any[], params?): Observable<Response> {
    const input = new FormData();
    for (let i = 0; i < file.length; i++) {
      input.append('file', file[i]);
    }
    return this.httpClient.postImg(url, input, params).pipe(map((res: Response) => {
      return res.json();
    }));
  }
}
