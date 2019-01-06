import { Injectable } from '@angular/core';
import { Response} from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientCustom } from './httpclient.service';

@Injectable()
export class CommonService {

  public boatTypeId = '';
  public detailBoat = {};
  public location = '';
  public boatType = '';
  public boatId = '';
  public boatTourId = '';
  public listLocation = [];
  public detailsBook: any = [];
  constructor(private httpClient: HttpClientCustom) { }

  public getBoatType(): Observable<Response> {
    return this.httpClient.get('/boat-type/').pipe(map((res: Response) => {
      return res.json();
    }));
  }

  public getTourBoatType(boatTypeId, params): Observable<Response> {
    return this.httpClient.get(`tour/check-available/${boatTypeId}`, params).pipe(map((res: Response) => {
      return res.json();
    }));
  }

  public getBoatTour(boatTypeId, params): Observable<Response> {
    return this.httpClient.get(`/tour/check-available/${boatTypeId}`, params).pipe(map((res: Response) => {
      return res.json();
    }));
  }

  public getListProvince(): Observable<Response> {
    return this.httpClient.get('/province/').pipe(map((res: Response) => {
      return res.json();
    }));
  }

  public getAccessoryType(): Observable<Response> {
    return this.httpClient.get('/accessory-type/').pipe(map((res: Response) => {
      return res.json();
    }));
  }

  public getAccessory(): Observable<Response> {
    return this.httpClient.get('/accessory/').pipe(map((res: Response) => {
      return res.json();
    }));
  }

  public bookReservation(params): Observable<Response> {
    return this.httpClient.post('/reservation/', params).pipe(map((res: Response) => {
      return res.json();
    }));
  }
}
