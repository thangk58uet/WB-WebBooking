import { CommonService } from 'src/app/service/common.service';
import { Component, OnInit } from '@angular/core';
import { alert } from 'devextreme/ui/dialog';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../user/user.service';
import { getMessageCodeError } from 'src/app/common/common.constant';

@Component({
  selector: 'app-verify-information',
  templateUrl: './verify-information.component.html',
  styleUrls: ['./verify-information.component.scss']
})
export class VerifyInformationComponent implements OnInit {

  public popupBookSuccess = false;
  public detailTour: any = {};
  public dateBook = '';
  public linkImage = '';
  public boatName = '';
  public location = '';
  public price = 0;

  public userInfo = {
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    passpost: '',
    address: '',
    message: ''
  };
  public userInfoTotal: any = {};

  public listAccessoryId = [];
  public accessoryInfo = [];
  public tourInfo: any = {};
  public boatInfo: any = {};
  public totalPriceAccessory = 0;

  constructor(public commonService: CommonService,
              private activatedRoute: ActivatedRoute,
              private cookieService: CookieService,
              private userService: UserService) { }

  ngOnInit() {
    this.dateBook = this.activatedRoute.snapshot.queryParams.date;
    this.price = +this.activatedRoute.snapshot.queryParams.price;

    //this.userInfo.phoneNumber = sessionStorage.getItem('phoneNumber');
    this.getListAccessory();
    this.getTourInfo();
    this.getBoatInfo();
    this.getUserInfo();
  }

  getUserInfo() {
    this.userInfo.firstName = sessionStorage.getItem('InputFirstName');
    this.userInfo.lastName = sessionStorage.getItem('InputLastName');
    this.userInfo.email = sessionStorage.getItem('InputEmail');
    this.userInfo.message = sessionStorage.getItem('message');

    this.userService.getAccountInfo().subscribe( res => {
      this.userInfoTotal =(res && res['value'])? res['value'] : {};
      this.userInfo.phoneNumber = this.userInfoTotal.phoneNumber;
      this.userInfo.address = this.userInfoTotal.address;
      this.userInfo.passpost = this.userInfoTotal.passpost;
    })
  }

  getListAccessory() {
    this.accessoryInfo = [];
    this.totalPriceAccessory = 0;
    this.listAccessoryId = JSON.parse(sessionStorage.getItem('listAccessoryId'));
    for (let index = 0; index < this.listAccessoryId.length; index++) {
      this.commonService.getAccessoryById(this.listAccessoryId[index]).subscribe( res => {
        if(res && res['value']) {
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

  bookSuccess() {
    if (!this.userInfo.address || ! this.userInfo.phoneNumber || !this.userInfo.passpost) {
      alert('Vui lòng nhập đầy đủ thông tin khi đặt tour!', 'Yachttour');
    } else {
      const params = {
        boatId: this.activatedRoute.snapshot.queryParams.boatId,
        bookingDate: this.dateBook,
        contact: {
          email: this.userInfo.email,
          firstName: this.userInfo.firstName,
          gender: 'MALE',
          lastName: this.userInfo.lastName,
          phoneNumber: this.userInfo.phoneNumber,
          address: this.userInfo.address,
          passpost: this.userInfo.passpost
        },
        listAccessoryId: JSON.parse(sessionStorage.getItem('listAccessoryId')),
        message: this.userInfo.message,
        tourId: this.activatedRoute.snapshot.queryParams.tourId
      };
      if (!params.contact.phoneNumber) {
        delete params.contact.phoneNumber;
      }
      this.commonService.bookReservation(params).subscribe( res => {
        this.popupBookSuccess = true;
      }, err => {
        this.popupBookSuccess = false;
        alert(getMessageCodeError(err), 'Yachttour');
      });
    }
  }

  closePopup() {
    this.popupBookSuccess = false;
  }
}
