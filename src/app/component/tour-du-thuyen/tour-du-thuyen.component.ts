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

  constructor(private tourDuThuyenService: TourDuThuyenService,
              public commonService: CommonService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.search();
    this.getListBoatType();
    this.getListLocation();
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
    this.tourDuThuyenService.getListBoat(this.activatedRoute.snapshot.queryParams.id).subscribe(res => {
      this.listBoat = (res && res['value']) ? res['value'] : [];
      this.totalCount = this.listBoat['totalCount'];
      console.log(this.listBoat.province);
      if (this.listBoat.list) {
        for (let index = 0; index < this.listBoat.list.length; index++) {
          this.listBoat.list[index].linkImage = this.commonService.pathImage + this.listBoat.list[index].images[0].reference;
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
