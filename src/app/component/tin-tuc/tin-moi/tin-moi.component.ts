import { CommonService } from './../../../service/common.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-tin-moi',
  templateUrl: './tin-moi.component.html',
  styleUrls: ['./tin-moi.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TinMoiComponent implements OnInit {

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
  public isTinMoi: boolean;
  public listTinTuc: any = [];
  public listKhuyenMai: any = [];

  constructor(public commonService: CommonService,
              private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        if (e.url === '/tin-tuc/tin-moi') {
          this.isTinMoi = true;
        } else {
          this.isTinMoi = false;
        }
      }
    });
    if(this.router.url === '/tin-tuc/tin-moi'){
      this.isTinMoi = true;
    }else{
      this.isTinMoi = false;
    }
    this.getListNew();
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

  searchListBoat() {}

  getListNew() {
    const newsCategoryId = (this.isTinMoi) ? 1 : 2;
    this.commonService.getNews({newsCategoryId}).subscribe(res => {
      this.listNews = (res && res['value']) ? res['value'].list : [];
      for (let index = 0; index < this.listNews.length; index++) {
        this.listNews[index].linkImage = this.commonService.pathImage + this.listNews[index].image.reference;
      }
    });
  }

  viewDetailNews(id) {
    this.router.navigate(['/tin-tuc/xem-tin'], { queryParams: { id }});
  }
}
