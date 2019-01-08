import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShowImageComponent implements OnInit {

  @Input() linkImage = '';
  @Input() listImages = [];
  @Input() countImage = null;
  public name = '';
  constructor(public commonService: CommonService) { }

  ngOnInit() {
  }

  prevImage() {
    if (this.countImage >= 1) {
      this.countImage -= 1;
    }
    if (this.countImage >= 0) {
      this.linkImage = this.commonService.pathImage + this.listImages[this.countImage].reference;
    }
  }

  nextImage() {
    if (this.countImage < this.listImages.length - 1) {
      this.countImage += 1;
    }
    if (this.countImage < this.listImages.length) {
      this.linkImage = this.commonService.pathImage + this.listImages[this.countImage].reference;
    }
  }
}
