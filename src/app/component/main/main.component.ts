import { CommonService } from 'src/app/service/common.service';
import { MainService } from './main.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TourDuThuyenService } from '../tour-du-thuyen/tour-du-thuyen.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {

  public fromDate = new Date();
  public toDate = new Date();
  public boatType = [];
  public listTypeBoat: any = [];
  public listLocation: any = [];
  public typeBoat = undefined;
  public location = undefined;
  public price = '';
  public boatTypeId = null;
  public locationId = null;
  public listTourHighlights: any = [];
  public listNews: any = [];
  public listNewsDisplay: any = [];
  public currentDay = new Date();

  constructor(public commonService: CommonService,
              private router: Router,
              private tourDuThuyenService: TourDuThuyenService,
              private mainService: MainService) { }

  ngOnInit() {
    this.getListLocation();
    this.getListBoatType();
    this.getListTourHighlights();
    this.getNews();
  }

  selectLocation(e) {
    this.location = e.selectedItem;
    this.locationId = this.listLocation.indexOf(this.location) + 1;
  }

  selectTypeBoat(e) {
    this.typeBoat = e.selectedItem;
    this.boatTypeId = this.listTypeBoat.indexOf(this.typeBoat) + 1;
  }

  selectPrice(e) {
    this.price = e.selectedItem;
  }

  getListLocation() {
    this.commonService.getListProvince().subscribe( res => {
      if (res && res['value']) {
        for (let index = 0; index < res['value'].length; index++) {
          this.listLocation.push(res['value'][index].name);
        }
      }
    });
  }

  getListBoatType() {
    this.commonService.getListTypeBoat().subscribe( res => {
      this.boatType = (res && res['value']) ? res['value'] : [];
      for (let index = 0; index < this.boatType.length; index++) {
        this.boatType[index].linkImage = this.commonService.pathImage + this.boatType[index].image.reference;
        this.listTypeBoat.push(res['value'][index].name);
      }
    });
  }

  routerLink(item) {
    const boatTypeId = item.id;
    const typeBoat = item.name;
    this.router.navigate(['/tour'], {queryParams: { boatTypeId, typeBoat }});
  }

  searchListBoat() {
    const locationId = this.locationId;
    const boatTypeId = this.boatTypeId;
    const location = this.location;
    const typeBoat = this.typeBoat;
    // const fromDate = this.fromDate.toJSON().slice(0, 10);
    // const toDate = this.toDate.toJSON().slice(0, 10);

    const price = this.price;
    this.router.navigate(['/tour'], {queryParams: { locationId, boatTypeId, location, typeBoat }});
  }

  getListTourHighlights() {
    this.tourDuThuyenService.getListBoatByParams({}).subscribe( res => {
      this.listTourHighlights = (res && res['value'] && res['value']) ? res['value'] : [];
      if (this.listTourHighlights.list.length && this.listTourHighlights.list.length > 4) {
        this.listTourHighlights.list = this.listTourHighlights.list.slice(0, 5);
      }
      if (this.listTourHighlights.list) {
        for (let index = 0; index < this.listTourHighlights.list.length; index++) {
          if (this.listTourHighlights.list[index].images.length > 0) {
            this.listTourHighlights.list[index].linkImage = this.commonService.pathImage +
            this.listTourHighlights.list[index].images[0].reference;
          } else {
            this.listTourHighlights.list[index].linkImage = this.commonService.pathImage +
            this.listTourHighlights.list[index].type.image.reference;
          }
        }
      }
    });
  }

  detailsTourHighlights(item, id) {
    const typeBoat = item.type.name;
    this.router.navigate(['/details'], {queryParams: { id, typeBoat }} );
  }

  routerLinkDetail() {
    this.router.navigate(['/tour']);
  }

  getNews() {
    this.commonService.getNews().subscribe( res => {
      this.listNews = (res && res['value'] ? res['value'].list : []);
      this.listNewsDisplay = [];
      for ( let index = 0; index < this.listNews.length; index++) {
        if (this.listNews[index].isHighlight === true) {
          this.listNewsDisplay.push(this.listNews[index]);
        }
      }
      for (let index = 0; index < this.listNewsDisplay.length; index++) {
        this.listNewsDisplay[index].linkImage = this.commonService.pathImage + this.listNewsDisplay[index].image.reference;
        this.listNewsDisplay[index].description = this.listNewsDisplay[index].description.slice(0,100) + '...';
      }
    });
  }

  xemUuDai(id, categoryId) {
    this.router.navigate(['/tin-tuc/xem-tin'], { queryParams: { id, categoryId }});
  }
}
