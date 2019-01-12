import { Component, OnInit } from '@angular/core';
import { CommonService } from './../../../service/common.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  public detailTour: any = {};
  public dateBook = '';
  public linkImage = '';
  public boatName = '';
  public location = '';
  public price = 0;

  public userInfo = {
    firstName: '',
    lastName: '',
    email: ''
  };

  public listType = ['Anh', 'Chị'];
  public type = '';

  constructor(public commonService: CommonService,
              private activatedRoute: ActivatedRoute,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.dateBook = this.activatedRoute.snapshot.queryParams.date;

    this.getInfoTourBoat();
    this.getUserInfo();
  }

  routerLinkDetail() {}

  getUserInfo() {
    this.userInfo.firstName = this.cookieService.get('firstName');
    this.userInfo.lastName = this.cookieService.get('lastName');
    this.userInfo.email = this.cookieService.get('email');
  }

  selectType(e) {}

  getInfoTourBoat() {
    const params = {
      tourId: this.activatedRoute.snapshot.queryParams.tourId,
      provinceId: this.activatedRoute.snapshot.queryParams.locationId,
      boatTypeid: this.activatedRoute.snapshot.queryParams.boatTypeId
    };
    this.commonService.getInfoTourByBoat(params).subscribe( res => {
      this.detailTour = (res && res['value']) ? res['value'] : {};
    });
  }
}
