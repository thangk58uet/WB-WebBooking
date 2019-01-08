import { CommonService } from 'src/app/service/common.service';
import { Component, OnInit } from '@angular/core';
import { alert } from 'devextreme/ui/dialog';

@Component({
  selector: 'app-verify-information',
  templateUrl: './verify-information.component.html',
  styleUrls: ['./verify-information.component.scss']
})
export class VerifyInformationComponent implements OnInit {

  public popupBookSuccess = false;
  constructor(public commonService: CommonService) { }

  ngOnInit() {
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
