import { Component, OnInit } from '@angular/core';
import { TourDuThuyenService } from '../tour-du-thuyen/tour-du-thuyen.service';
import { CommonService } from '../../service/common.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
@Component({
  selector: 'app-details-du-thuyen',
  templateUrl: './details-du-thuyen.component.html',
  styleUrls: ['./details-du-thuyen.component.scss']
})
export class DetailsDuThuyenComponent implements OnInit {

  public fromDate = new Date();
  public toDate = new Date();
  public listBoat: any = [];
  public detailBoat: any = {};
  public listImages: any = [];
  public pathImage = 'http://150.95.113.234:8080/boat-booking-api/api/image/';
  public linkImage = '';
  public dateBookBoat = new Date();
  public listLocation = ['Hà Nội', 'Tp. Hồ Chí Minh', 'Đà Nẵng'];
  public listTypeBoat = ['NC 14', 'LEADER 36'];
  public listPrice = ['< 5 triệu', '5 triệu - 10 triệu', '10 triệu - 20 triệu', '20 triệu - 30 triệu', '30 triệu - 50 triệu'];
  public boatTour: any = [];
  public countImage = 0;
  constructor(private tourDuThuyenService: TourDuThuyenService,
              public commonService: CommonService,
              private router: Router) { }

  ngOnInit() {
    this.getDetailBoat();
    this.getBoatTour();
    this.getAccessory();
    this.getAccesssoryType();
  }

  getDetailBoat() {
    this.detailBoat = this.commonService.detailBoat;
    this.listImages = this.detailBoat.images;
    if (this.listImages && this.listImages.length > 0) {
      this.linkImage = this.pathImage + this.listImages[0].reference;
    }
  }

  getBoatTour() {
    const dateParams = this.dateBookBoat.toJSON().slice(0, 10);
    this.commonService.getBoatTour(this.detailBoat.id, { date: dateParams }).subscribe( res => {
      this.boatTour = (res && res['value']) ? res['value'] : [];
    });
  }

  prevImage() {
    this.countImage -= 1;
    if (this.countImage >= 0) {
      $('img[src="' + this.linkImage + '"]').attr('src', this.pathImage + this.listImages[this.countImage].reference);
    }
  }

  nextImage() {
    this.countImage += 1;
    if (this.countImage < this.listImages.length) {
      $('img[src="' + this.linkImage + '"]').attr('src', this.pathImage + this.listImages[this.countImage].reference);
    }
  }

  selectLocation(e) {}

  selectTypeBoat(e) {}

  selectPrice(e) {}

  search() {}

  getAccessory() {
    this.commonService.getAccessory().subscribe( res => {

    })
  }

  getAccesssoryType() {
    this.commonService.getAccessoryType().subscribe ( res => {

    })
  }

  bookTour(item, id) {
    this.commonService.detailsBook = item;
    this.commonService.boatTourId = id;
    for (let index = 0; index < this.commonService.detailsBook.length; index++) {
      this.commonService.detailsBook[index].endHour = this.commonService.detailsBook[index].startHour +
      this.commonService.detailsBook[index].duration;
    }
    this.router.navigate(['/wb/book/information']);
  }
}
