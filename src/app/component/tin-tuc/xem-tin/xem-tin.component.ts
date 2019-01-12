import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-xem-tin',
  templateUrl: './xem-tin.component.html',
  styleUrls: ['./xem-tin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class XemTinComponent implements OnInit {

  public newDetails: any = {};
  constructor(public commonService: CommonService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getNewsDetail();
  }

  getNewsDetail() {
    this.commonService.getNewsById(this.activatedRoute.snapshot.queryParams.id).subscribe(res => {
      this.newDetails = (res && res['value']) ? res['value'] : {};
      this.newDetails.linkImage = this.commonService.pathImage + this.newDetails.image.reference;
    });
  }

  getListNew() {
    // const categoryId = (this.isTinMoi) ? 1 : 2;
    // this.commonService.getNews().subscribe(res => {
    //   this.listNews = (res && res['value']) ? res['value'].list : [];
    // });
  }
}
