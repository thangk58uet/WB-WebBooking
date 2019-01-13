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
    phoneNumber: 0
  };

  public listAccessoryId = [];
  public accessoryInfo = [];
  constructor(public commonService: CommonService,
              private activatedRoute: ActivatedRoute,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.dateBook = this.activatedRoute.snapshot.queryParams.date;
    this.boatName = this.activatedRoute.snapshot.queryParams.name;
    this.accessoryInfo = JSON.parse(sessionStorage.getItem('accessoryInfo'));
    console.log(this.accessoryInfo);
    //this.userInfo.phoneNumber = sessionStorage.getItem('phoneNumber');
    this.getInfoTourBoat();
    this.getListAccessory();
  }

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

  bookSuccess() {
    const params = {
        boatId: this.activatedRoute.snapshot.queryParams.boatId,
        bookingDate: this.dateBook,
        contact: {
          email: sessionStorage.getItem('email'),
          firstName: sessionStorage.getItem('firstName'),
          gender: 'MALE',
          lastName: sessionStorage.getItem('lastName'),
          phoneNumber: this.userInfo.phoneNumber,
        },
        listAccessoryId: JSON.parse(sessionStorage.getItem('listAccessoryId')),
        message: 'string',
        status: 'PENDING',
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
      // alert(message, 'Yachtour.com');
    });
  }
}
