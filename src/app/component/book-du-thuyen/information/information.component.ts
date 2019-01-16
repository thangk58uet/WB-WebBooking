import { UserService } from './../../user/user.service';
import { Component, OnInit } from '@angular/core';
import { CommonService } from './../../../service/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { alert } from 'devextreme/ui/dialog';
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
    email: '',
    confirmEmail: '',
    message: ''
  };
  public userInfoTotal: any = {};
  public listAccessoryId = [];
  public accessoryInfo: any = [];

  public listType = ['Anh', 'Chị'];
  public type = '';
  public tourInfo: any = {};
  public boatInfo: any = {};
  public totalPriceAccessory = 0;

  constructor(public commonService: CommonService,
              private activatedRoute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.dateBook = this.activatedRoute.snapshot.queryParams.date;
    this.price = +this.activatedRoute.snapshot.queryParams.price;

    this.initUserInfo();
    this.getUserInfo();
    this.getListAccessory();
    this.getTourInfo();
    this.getBoatInfo();
  }

  routerLinkVerify(name, date) {
    if (!this.userInfo.firstName || !this.userInfo.lastName || !this.userInfo.email || !this.userInfo.confirmEmail) {
      alert('Vui lòng nhập đầy đủ thông tin của bạn!', 'Yachttour.vn');
    } else {
      if (this.userInfo.email !== this.userInfo.confirmEmail) {
        alert('Email xác nhận không trùng khớp!', 'Yachttour.vn');
      } else {
        const tourId = this.activatedRoute.snapshot.queryParams.tourId;
        const boatTypeId = this.activatedRoute.snapshot.queryParams.boatTypeId;
        const boatId = this.activatedRoute.snapshot.queryParams.boatId;
        const price = this.price;
        sessionStorage.setItem('InputFirstName', this.userInfo.firstName);
        sessionStorage.setItem('InputLastName', this.userInfo.lastName);
        sessionStorage.setItem('InputEmail', this.userInfo.email);
        sessionStorage.setItem('message', this.userInfo.message);
        this.router.navigate(['/book/verify-information'], { queryParams: { boatTypeId, tourId, date, boatId, price }});
      }
    }

  }

  initUserInfo() {
    this.userInfo.email = '';
    this.userInfo.firstName = '';
    this.userInfo.lastName = '';
  }

  getUserInfo() {
    this.userService.getAccountInfo().subscribe( res => {
      this.userInfoTotal =(res && res['value'])? res['value'] : {};
      this.userInfo.firstName = this.userInfoTotal.firstName;
      this.userInfo.lastName = this.userInfoTotal.lastName;
      this.userInfo.email = this.userInfoTotal.email;
      this.userInfo.confirmEmail = this.userInfoTotal.email;
    })
  }

  selectType(e) {}

  getListAccessory() {
    this.accessoryInfo = [];
    this.totalPriceAccessory = 0;
    this.listAccessoryId = JSON.parse(sessionStorage.getItem('listAccessoryId'));
    for (let index = 0; index < this.listAccessoryId.length; index++) {
      this.commonService.getAccessoryById(this.listAccessoryId[index]).subscribe( res => {
        if (res && res['value']) {
          setTimeout(() => {
            this.accessoryInfo.push(res['value']);
            this.totalPriceAccessory += res['value'].price;
          }, 1000);
        }
      });
    }
  }

  getTourInfo() {
    this.commonService.getTourById(this.activatedRoute.snapshot.queryParams.tourId).subscribe( res => {
      this.tourInfo = (res && res['value']) ? res['value'] : {};
    });
  }

  getBoatInfo() {
    this.commonService.getDetailBoatById(this.activatedRoute.snapshot.queryParams.boatId).subscribe( res => {
      this.boatInfo = (res && res['value']) ? res['value'] : {};
      if (this.boatInfo.images) {
        this.boatInfo.linkImage = this.commonService.pathImage + this.boatInfo.images[0].reference;
      } else {
        this.boatInfo.linkImage = this.commonService.pathImage + this.boatInfo.type.images.reference;
      }
    });
  }

}
