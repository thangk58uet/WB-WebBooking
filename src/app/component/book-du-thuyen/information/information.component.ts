import { Component, OnInit } from '@angular/core';
import { CommonService } from './../../../service/common.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  public listAccessoryId = [];
  public accessoryInfo: any = [];

  public listType = ['Anh', 'Chị'];
  public type = '';

  constructor(public commonService: CommonService,
              private activatedRoute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router) { }

  ngOnInit() {
    this.dateBook = this.activatedRoute.snapshot.queryParams.date;
    this.boatName = this.activatedRoute.snapshot.queryParams.name;

    this.initUserInfo();
    this.getInfoTourBoat();
    this.getUserInfo();
    this.getListAccessory();
  }

  routerLinkVerify(name, date) {
    const tourId = this.activatedRoute.snapshot.queryParams.tourId;
    const provinceId = this.activatedRoute.snapshot.queryParams.locationId;
    const boatTypeId = this.activatedRoute.snapshot.queryParams.boatTypeId;
    const boatId = this.activatedRoute.snapshot.queryParams.boatId;
    this.router.navigate(['/book/verify-information'], { queryParams: { boatTypeId, tourId, date, provinceId, name, boatId }});
  }

  initUserInfo() {
    this.userInfo.email = '';
    this.userInfo.firstName = '';
    this.userInfo.lastName = '';
  }

  getUserInfo() {
    this.userInfo.firstName = sessionStorage.getItem('firstName');
    this.userInfo.lastName = sessionStorage.getItem('lastName');
    this.userInfo.email = sessionStorage.getItem('email');
  }

  selectType(e) {}

  getInfoTourBoat() {
    const params = {
      tourId: this.activatedRoute.snapshot.queryParams.tourId,
      provinceId: this.activatedRoute.snapshot.queryParams.locationId,
      boatTypeid: this.activatedRoute.snapshot.queryParams.boatTypeId
    };
    this.commonService.getInfoTourByBoat(params).subscribe( res => {
      this.detailTour = (res && res['value'][0]) ? res['value'][0] : {};
      if (this.detailTour.images.length > 0) {
        this.detailTour.linkImage = this.commonService.pathImage + this.detailTour.images[0].reference;
      } else {
        this.detailTour.linkImage = this.commonService.pathImage + this.detailTour.boatTypeTour.boatType.image.reference;
      }
    });
  }

  getListAccessory() {
    this.accessoryInfo = [];
    this.listAccessoryId = JSON.parse(sessionStorage.getItem('listAccessoryId'));
    for (let index = 0; index < this.listAccessoryId.length; index++) {
      this.commonService.getAccessoryById(this.listAccessoryId[index]).subscribe( res => {
        this.accessoryInfo.push(res['value']);
      });
    }
  }

}
