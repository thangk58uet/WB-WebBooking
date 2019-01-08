import { Component, OnInit } from '@angular/core';
import { TourDuThuyenService } from '../tour-du-thuyen/tour-du-thuyen.service';
import { CommonService } from '../../service/common.service';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
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
  public linkImage = '';
  public dateBookBoat = new Date();
  public boatTour: any = [];
  public countImage = 0;
  public popupShowImage = false;
  public indexImage = null;
  public typeBoat;
  public location;
  public listLocation: any = [];
  public listTypeBoat: any = [];

  constructor(private tourDuThuyenService: TourDuThuyenService,
              public commonService: CommonService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getDetailBoat();
    this.getBoatTour();
    this.getAccessory();
    this.getAccesssoryType();
    this.getListBoatType();
    this.getListLocation();
  }

  getBoatTour() {
    const dateParams = this.dateBookBoat.toJSON().slice(0, 10);
    this.commonService.dateBook = dateParams;
    this.commonService.getBoatTour(this.activatedRoute.snapshot.queryParams.id, { date: dateParams }).subscribe( res => {
      this.boatTour = (res && res['value']) ? res['value'] : [];
    });
  }

  getListLocation() {
    this.commonService.getListProvince().subscribe( res => {
      if (res && res['value']) {
        for (let index = 0; index < res['value'].length; index++) {
          this.listLocation.push(res['value'][index].name);
        }
      }
    });
  }

  getListBoatType() {
    this.typeBoat = this.activatedRoute.snapshot.queryParams.typeBoat;
    this.commonService.getListTypeBoat().subscribe( res => {
      if (res && res['value']) {
        for (let index = 0; index < res['value'].length; index++) {
          this.listTypeBoat.push(res['value'][index].name);
        }
      }
    });
  }

  prevImage() {
    this.countImage -= 1;
    this.indexImage = this.countImage;
    if (this.countImage >= 0) {
      this.linkImage = this.commonService.pathImage + this.listImages[this.countImage].reference;
    }
  }

  nextImage() {
    this.countImage += 1;
    this.indexImage = this.countImage;
    if (this.countImage < this.listImages.length) {
      this.linkImage = this.commonService.pathImage + this.listImages[this.countImage].reference;
    }
  }

  getDetailBoat() {
    this.commonService.getDetailBoatById(this.activatedRoute.snapshot.queryParams.id).subscribe( res => {
      this.detailBoat = (res && res['value']) ? res['value'] : [];
      this.location = this.detailBoat.province.name;
      this.listImages = this.detailBoat.images;
      if (this.listImages && this.listImages.length > 0) {
        this.linkImage = this.commonService.pathImage + this.listImages[0].reference;
      }
    });
  }

  viewImage(linkImage) {
    this.popupShowImage = true;
  }

  selectImage(index) {
    this.indexImage = index;
    this.linkImage = this.commonService.pathImage + this.listImages[index].reference;
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
