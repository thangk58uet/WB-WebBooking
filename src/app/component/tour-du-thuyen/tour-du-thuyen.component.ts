import { CommonService } from '../../service/common.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TourDuThuyenService } from './tour-du-thuyen.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

declare const $: any;
@Component({
  selector: 'app-tour-du-thuyen',
  templateUrl: './tour-du-thuyen.component.html',
  styleUrls: ['./tour-du-thuyen.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TourDuThuyenComponent implements OnInit {

  public typeBoat;
  public location;
  public fromDate = new Date();
  public toDate = new Date();
  public price;
  public listBoat: any = [];
  public totalCount;
  public listLocation: any = [];
  public listTypeBoat: any = [];
  public locationId = null;
  public boatTypeId = null;

  public totalElements: number;
  public totalPages = 0;
  public currentPage = 1;
  public pagination = {
    pageNum: 0,
    pageSize: 6
  };
  public sortType = '';
  public sortDirection = '';
  public minPrice = 0;
  public maxPrice = 100000000000000;

  constructor(private tourDuThuyenService: TourDuThuyenService,
              public commonService: CommonService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.router.events.subscribe(e => {
        if (e instanceof NavigationEnd) {
          if (e.url === '/tour') {
            location.reload();
          }
        }
      });
    this.getListBoatType();
    this.getListLocation();
    this.search();
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
    if (this.price) {
      this.minPrice = this.commonService.listPriceId[this.commonService.listPrice.indexOf(this.price)].min;
      this.maxPrice = this.commonService.listPriceId[this.commonService.listPrice.indexOf(this.price)].max;
    }
  }

  getListLocation() {
    this.locationId = this.activatedRoute.snapshot.queryParams.locationId;
    this.location = this.activatedRoute.snapshot.queryParams.location;
    this.price = this.activatedRoute.snapshot.queryParams.price;
    this.commonService.getListProvince().subscribe( res => {
      if (res && res['value']) {
        for (let index = 0; index < res['value'].length; index++) {
          this.listLocation.push(res['value'][index].name);
        }
      }
    });
  }

  getListBoatType() {
    this.boatTypeId = this.activatedRoute.snapshot.queryParams.boatTypeId;
    this.typeBoat = this.activatedRoute.snapshot.queryParams.typeBoat;
    this.commonService.getListTypeBoat().subscribe( res => {
      if (res && res['value']) {
        for (let index = 0; index < res['value'].length; index++) {
          this.listTypeBoat.push(res['value'][index].name);
        }
      }
    });
  }

  search() {
    const params = {
      boatTypeId: this.boatTypeId,
      locationId: this.locationId,
      fromDate: this.activatedRoute.snapshot.queryParams.fromDate,
      toDate: this.activatedRoute.snapshot.queryParams.fromDate,
      pageNum: this.pagination.pageNum,
      pageSize: this.pagination.pageSize,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      sortBy: this.sortType,
      sortDirection: this.sortDirection
    };
    if (params.sortBy === '') {
      delete params.sortBy;
    }
    if (params.sortDirection === '') {
      delete params.sortDirection;
    }
    if (!params.boatTypeId) {
      delete params.boatTypeId;
    }
    if (!params.locationId) {
      delete params.locationId;
    }
    if (!this.price) {
      delete params.minPrice;
      delete params.maxPrice;
    }
    this.tourDuThuyenService.getListBoatByParams(params).subscribe(res => {
      this.listBoat = (res && res['value']) ? res['value'] : [];
      this.totalCount = this.listBoat['totalCount'];
      this.totalPages = Math.ceil(this.totalCount / this.pagination.pageSize);
      if (this.listBoat.list) {
        for (let index = 0; index < this.listBoat.list.length; index++) {
          if (this.listBoat.list[index].images.length > 0) {
            this.listBoat.list[index].linkImage = this.commonService.pathImage + this.listBoat.list[index].images[0].reference;
          } else {
            this.listBoat.list[index].linkImage = this.commonService.pathImage + this.listBoat.list[index].type.image.reference;
          }
        }
      }
    });
  }

  routerLinkDetail(item, id) {
    const typeBoat = item.type.name;
    this.router.navigate(['/details'], {queryParams: { id, typeBoat }} );
  }

  goToPage(e) {
    this.currentPage = e;
    this.pagination.pageNum = e - 1;
    this.search();
  }

  selectOptions(e, option) {
    if (option === 1) {
      this.sortType = '';
      this.sortDirection = '';
    } else if (option === 2) {
      this.sortType = 'minPrice';
      this.sortDirection = 'ASC';
    } else if (option === 3) {
      this.sortType = 'minPrice';
      this.sortDirection = 'DESC';
    } else {
      this.sortType = 'averageRate';
      this.sortDirection = 'ASC';
    }
    this.search();
    $('.click-btn-tour').removeClass('click-btn-tour-selected');
    $(e.target).addClass('click-btn-tour-selected');
  }
}
