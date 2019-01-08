import { CommonService } from '../../service/common.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TourDuThuyenService } from './tour-du-thuyen.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private tourDuThuyenService: TourDuThuyenService,
              public commonService: CommonService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
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
    if (this.activatedRoute.snapshot.queryParams.boatTypeId) {
      this.searchbyId();
    } else { this.searchbyParams(); }
  }

  searchbyId() {
    this.tourDuThuyenService.getListBoatById(this.boatTypeId).subscribe(res => {
      this.listBoat = (res && res['value']) ? res['value'] : [];
      this.totalCount = this.listBoat['totalCount'];
      if (this.listBoat.list) {
        for (let index = 0; index < this.listBoat.list.length; index++) {
          this.listBoat.list[index].linkImage = this.commonService.pathImage + this.listBoat.list[index].type.image.reference;
        }
      }
    });
  }

  searchbyParams() {
    const params = {
      boatTypeId: this.boatTypeId,
      locationId: this.locationId,
      fromDate: this.activatedRoute.snapshot.queryParams.fromDate,
      toDate: this.activatedRoute.snapshot.queryParams.fromDate,
    };
    this.tourDuThuyenService.getListBoatByParams(params).subscribe(res => {
      this.listBoat = (res && res['value']) ? res['value'] : [];
      this.totalCount = this.listBoat['totalCount'];
      if (this.listBoat.list) {
        for (let index = 0; index < this.listBoat.list.length; index++) {
          if (this.listBoat.list[index].images > 0) {
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
    this.router.navigate(['/wb/details'], {queryParams: { id, typeBoat }} );
  }

  goToPage(e) {

  }
}
