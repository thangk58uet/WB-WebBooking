import { CommonService } from './../../../service/common.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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

  constructor(public commonService: CommonService) { }

  ngOnInit() {
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
}
