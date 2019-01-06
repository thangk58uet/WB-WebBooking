import { CommonService } from '../../service/common.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TourDuThuyenService } from './tour-du-thuyen.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tour-du-thuyen',
  templateUrl: './tour-du-thuyen.component.html',
  styleUrls: ['./tour-du-thuyen.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TourDuThuyenComponent implements OnInit {

  public listLocation = ['Hà Nội', 'Tp. Hồ Chí Minh', 'Đà Nẵng'];
  public listTypeBoat = ['NC 14', 'LEADER 36', 'Cap Camarat 6.5 WA', 'Cap Camarat 7.5 DC'];
  public listPrice = ['< 5 triệu', '5 triệu - 10 triệu', '10 triệu - 20 triệu', '20 triệu - 30 triệu', '30 triệu - 50 triệu'];

  public typeBoat;
  public location;
  public fromDate = new Date();
  public toDate = new Date();
  public price;
  public listBoat: any = [];
  public totalCount;
  public linkImage = 'http://150.95.113.234:8080/boat-booking-api/api/image/';

  constructor(private tourDuThuyenService: TourDuThuyenService,
              public commonService: CommonService,
              private router: Router) { }

  ngOnInit() {
    this.search();
  }

  selectLocation(e) {
    this.location = e.selectedItem;
  }

  selectTypeBoat(e) {
    this.typeBoat = e.selectedItem;
  }

  selectPrice(e) {
    this.price = e.selectedItem;
  }

  search() {
    this.tourDuThuyenService.getListBoat(this.commonService.boatTypeId).subscribe(res => {
      this.listBoat = (res && res['value']) ? res['value'] : [];
      this.totalCount = this.listBoat['totalCount'];
      if (this.listBoat.list) {
        for (let index = 0; index < this.listBoat.list.length; index++) {
          this.listBoat.list[index].linkImage = this.linkImage + this.listBoat.list[index].images[0].reference;
        }
      }
    });
  }

  routerLinkDetail(item, id) {
    this.commonService.detailBoat = item;
    this.commonService.boatId = id;
    this.router.navigate(['/wb/details'], {queryParams: { item }} );
  }

  goToPage(e) {

  }
}
