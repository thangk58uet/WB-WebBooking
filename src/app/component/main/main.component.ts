import { MainService } from './main.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {

  public fromDate = new Date();
  public toDate = new Date();
  public boatType = [];
  public listLocation = ['Hà Nội', 'Tp. Hồ Chí Minh', 'Đà Nẵng'];
  public listTypeBoat = ['NC 14', 'LEADER 36'];
  public listPrice = ['< 5 triệu', '5 triệu - 10 triệu', '10 triệu - 20 triệu', '20 triệu - 30 triệu', '30 triệu - 50 triệu'];
  public linkImage = 'http://150.95.113.234:8080/boat-booking-api/api/image/';

  constructor(private commonService: CommonService,
              private router: Router) { }

  ngOnInit() {
    this.getBoatType();
  }

  getBoatType() {
    this.commonService.getBoatType().subscribe( res => {
      this.boatType = (res && res['value']) ? res['value'] : [];
      for (let index = 0; index < this.boatType.length; index++) {
        this.boatType[index].linkImage = this.linkImage + this.boatType[index].image.reference;
      }
    })
  }

  routerLink(name, id) {
    this.commonService.boatTypeId = id;
    this.router.navigate(['/wb/tour'], {queryParams: { name }});
  }
}
