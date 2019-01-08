import { CommonService } from 'src/app/service/common.service';
import { MainService } from './main.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

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
  public listTypeBoat = [];
  public listLocation = [];

  constructor(public commonService: CommonService,
              private router: Router) { }

  ngOnInit() {
    this.getListLocation();
    this.getListBoatType();
  }

  getListLocation() {
    this.commonService.getListProvince().subscribe( res => {
      if (res && res['value']) {
        for(let index = 0; index < res['value'].length; index++) {
          this.listLocation.push(res['value'][index].name)
        }
      }
    });
    console.log(this.listLocation);
  }

  getListBoatType() {
    this.commonService.getListTypeBoat().subscribe( res => {
      this.boatType = (res && res['value']) ? res['value'] : [];
      for (let index = 0; index < this.boatType.length; index++) {
        this.boatType[index].linkImage = this.commonService.pathImage + this.boatType[index].image.reference;
        this.listTypeBoat.push(res['value'][index].name)
      }
    });
  }

  routerLink(item) {
    const id = item.id;
    const typeBoat = item.name;
    this.router.navigate(['/wb/tour'], {queryParams: { id, typeBoat }});
  }
}
