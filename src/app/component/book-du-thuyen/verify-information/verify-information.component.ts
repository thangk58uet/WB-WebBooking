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
    phoneNumber: ''
  };
  constructor(public commonService: CommonService,
              private activatedRoute: ActivatedRoute,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.dateBook = this.activatedRoute.snapshot.queryParams.date;
    this.boatName = this.activatedRoute.snapshot.queryParams.name;
    this.userInfo.phoneNumber = this.cookieService.get('phoneNumber');
    this.getInfoTourBoat();
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

  bookSuccess() {
    const params = {
        boatId: this.commonService.boatId,
        bookingDate: this.commonService.dateBook,
        contact: {
          email: 'email@gmail.com',
          firstName: 'Nguyễn',
          gender: 'MALE',
          lastName: 'Văn A',
          phoneNumber: '0123456789'
        },
        message: 'string',
        status: 'PENDING',
        tourId: this.commonService.boatTourId
    };
    this.commonService.bookReservation(params).subscribe( res => {
      this.popupBookSuccess = true;
    }, err => {
      const message = JSON.parse(err['_body']).message;
      alert(message, 'Yachtour.com');
    });
  }
}
