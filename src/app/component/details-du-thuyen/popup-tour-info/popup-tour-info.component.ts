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
  @Input() provinceName = '';

  @Input() detailTourInfo: any = {};
  @Input() linkImageInfo = '';
  public listImages: any = [];
  public countImage = 0;
  public indexImage = null;


  constructor(public commonService: CommonService) { }

  ngOnInit() {
  }

  prevImage() {
    this.countImage -= 1;
    this.indexImage = this.countImage;
    if (this.countImage >= 0) {
      this.linkImageInfo = this.commonService.pathImage + this.detailTourInfo.images[this.countImage].reference;
    }
  }

  nextImage() {
    this.countImage += 1;
    this.indexImage = this.countImage;
    if (this.countImage < this.detailTourInfo.images.length) {
      this.linkImageInfo = this.commonService.pathImage + this.detailTourInfo.images[this.countImage].reference;
    }
  }

  selectImage(index) {
    this.countImage = index;
    this.linkImageInfo = this.commonService.pathImage + this.detailTourInfo.images[index].reference;
  }
}
