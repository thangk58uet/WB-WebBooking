import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Response} from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientCustom } from './httpclient.service';

@Injectable()
export class CommonService {

  public boatId = '';
  public boatTourId = '';
  public detailsBook: any = [];
  public dateBook = '';
  public listImages: any = [];
  public listPrice = ['Dưới 5 triệu', '5 triệu - 10 triệu', '10 triệu - 20 triệu', '20 triệu - 30 triệu',
  '30 triệu - 50 triệu', 'Trên 50 triệu'];
  public listPriceId = [
    { min: 0, max: 5000000},
    { min: 5000000, max: 10000000},
    { min: 10000000, max: 20000000},
    { min: 20000000, max: 30000000},
    { min: 30000000, max: 50000000},
    { min: 50000000, max: 1000000000000},
  ];
  public url = environment.apiUrl;
  public pathImage = environment.apiUrl + '/image/';

  constructor(private httpClient: HttpClientCustom) { }

  public getTourBoatType(boatTypeId, params): Observable<Response> {
    return this.httpClient.get(`boat-type-tour/${boatTypeId}`, params).pipe(map((res: Response) => {
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

  public getListTypeBoat(): Observable<Response> {
    return this.httpClient.get('/boat-type/').pipe(map((res: Response) => {
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

  public activeAccount(params): Observable<Response> {
    return this.httpClient.post('/account/activate/', params).pipe(map((res: Response) => {
      return res.json();
    }));
  }

  public getDetailBoatById(id): Observable<Response> {
    return this.httpClient.get(`/boat/${id}`, id).pipe(map((res: Response) => {
      return res.json();
    }));
  }

  public getNewsById(categoryId): Observable<Response> {
    return this.httpClient.get(`/news/${categoryId}`).pipe(map((res: Response) => {
      return res.json();
    }));
  }

  public getNews(params?): Observable<Response> {
    return this.httpClient.get('/news/', params).pipe(map((res: Response) => {
      return res.json();
    }));
  }

  public getTourById(id): Observable<Response> {
    return this.httpClient.get(`/tour/${id}`).pipe(map((res: Response) => {
      return res.json();
    }));
  }

  public getInfoTourByBoat(params): Observable<Response> {
    return this.httpClient.get(`/tour-info/`, params).pipe(map((res: Response) => {
      return res.json();
    }));
  }

  public getAccessoryById(id): Observable<Response> {
    return this.httpClient.get(`/accessory/${id}`).pipe(map((res: Response) => {
      return res.json();
    }));
  }
}
