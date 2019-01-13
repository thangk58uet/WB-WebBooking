import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-popup-tour-info',
  templateUrl: './popup-tour-info.component.html',
  styleUrls: ['./popup-tour-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopupTourInfoComponent implements OnInit {

  @Input() tourId = '';
  @Input() provinceId = '';
  @Input() boatTypeId = '';
  @Input() tourPrice = '';
  @Input() tourName = '';

  public detailTour: any = {};
  public linkImage = '';
  public listImages: any = [];
  public countImage = 0;
  public indexImage = null;


  constructor(public commonService: CommonService) { }

  ngOnInit() {
    this.getInfoTourBoat();
    console.log(screen.height);
  }

  getInfoTourBoat() {
    const params = {
      tourId: this.tourId,
      provinceId: this.provinceId,
      boatTypeId: this.boatTypeId
    };
    this.commonService.getInfoTourByBoat(params).subscribe( res => {
      this.detailTour = (res && res['value'][0]) ? res['value'][0] : {};
      this.listImages = this.detailTour.images;
      if (this.detailTour.images.length > 0) {
        this.linkImage = this.commonService.pathImage + this.detailTour.images[0].reference;
      } else {
        this.linkImage = this.commonService.pathImage + this.detailTour.boatTypeTour.boatType.image.reference;
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

  selectImage(index) {
    this.indexImage = index;
    this.linkImage = this.commonService.pathImage + this.listImages[index].reference;
  }


}
