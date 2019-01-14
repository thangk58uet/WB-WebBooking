import { CommonService } from 'src/app/service/common.service';
import { Component, OnInit } from '@angular/core';
import { alert } from 'devextreme/ui/dialog';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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
    passport: '',
    address: ''
  };
  public message = '';

  public listAccessoryId = [];
  public accessoryInfo = [];
  public tourInfo: any = {};
  public boatInfo: any = {};
  public totalPriceAccessory = 0;

  constructor(public commonService: CommonService,
              private activatedRoute: ActivatedRoute,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.dateBook = this.activatedRoute.snapshot.queryParams.date;
    this.price = +this.activatedRoute.snapshot.queryParams.price;

    //this.userInfo.phoneNumber = sessionStorage.getItem('phoneNumber');
    this.getListAccessory();
    this.getTourInfo();
    this.getBoatInfo();
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
    })
  }

  getBoatInfo() {
    this.commonService.getDetailBoatById(this.activatedRoute.snapshot.queryParams.boatId).subscribe( res => {
      this.boatInfo = (res && res['value']) ? res['value'] : {};
      if(this.boatInfo.images) {
        this.boatInfo.linkImage = this.commonService.pathImage + this.boatInfo.images[0].reference;
      } else {
        this.boatInfo.linkImage = this.commonService.pathImage + this.boatInfo.type.images.reference;
      }
    })
  }

  bookSuccess() {
    const params = {
        boatId: this.activatedRoute.snapshot.queryParams.boatId,
        bookingDate: this.dateBook,
        contact: {
          email: this.userInfo.email,
          firstName: this.userInfo.firstName,
          gender: 'MALE',
          lastName: this.userInfo.phoneNumber,
          phoneNumber: this.userInfo.phoneNumber,
          address: this.userInfo.address,
          passport: this.userInfo.passport
        },
        listAccessoryId: JSON.parse(sessionStorage.getItem('listAccessoryId')),
        message: this.message,
        tourId: this.activatedRoute.snapshot.queryParams.tourId
    };
    if (!params.contact.phoneNumber) {
      delete params.contact.phoneNumber;
    }
    this.commonService.bookReservation(params).subscribe( res => {
      this.popupBookSuccess = true;
    }, err => {
      this.popupBookSuccess = true;
      // if (JSON.parse(err['_body']).resultCode === '400.202') {
      //   alert('Bạn không đủ tiền. Vui lòng nạp tiền vào tài khoản', 'Yachttour.vn');
      // }
      // const message = JSON.parse(err['_body']).message;
      // alert(message, 'Yachtour.vn');
    });
  }
}
