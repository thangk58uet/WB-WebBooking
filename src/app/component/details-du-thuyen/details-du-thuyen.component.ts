import { Component, OnInit } from '@angular/core';
import { TourDuThuyenService } from '../tour-du-thuyen/tour-du-thuyen.service';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-details-du-thuyen',
  templateUrl: './details-du-thuyen.component.html',
  styleUrls: ['./details-du-thuyen.component.scss']
})
export class DetailsDuThuyenComponent implements OnInit {

  public fromDate;
  public toDate;
  public listBoat: any = [];
  public detailBoat: any = {};
  public listImages = [];
  public pathImage = 'http://150.95.113.234:8080/boat-booking-api/api/image/';
  public linkImage = '';
  public listLocation = ['Hà Nội', 'Tp. Hồ Chí Minh', 'Đà Nẵng'];
  public listTypeBoat = ['NC 14', 'LEADER 36'];
  public listPrice = ['< 5 triệu', '5 triệu - 10 triệu', '10 triệu - 20 triệu', '20 triệu - 30 triệu', '30 triệu - 50 triệu'];

  constructor(private tourDuThuyenService: TourDuThuyenService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.getDetailBoat();
  }

  getDetailBoat() {
    this.detailBoat = this.commonService.detailBoat;
    this.listImages = this.detailBoat.images;
    this.linkImage = this.pathImage + this.listImages[0].reference;
  }
}
