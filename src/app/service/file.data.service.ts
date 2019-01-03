import { Injectable } from '@angular/core';
import { CommonHttpService } from './common.http.service';
@Injectable()
export class FileDataService {
  constructor(private http: CommonHttpService) {

  }

  public getFile(id: string, successCallback = null, failCallback = null) {
    const url = '/file-data/get/' + id;
    this.http.getBinary(url, successCallback, failCallback);
  }

  public getThumbnail(id: string, width: number, height: number, successCallback = null, failCallback = null) {
    const url = '/file-data/get/' + id + '/thumbnail?width=' + width + '&height=' + height;
    this.http.getBinary(url, successCallback, failCallback);
  }
}
