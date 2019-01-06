import { Component, OnInit } from '@angular/core';
import { CommonService } from './../../../service/common.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  constructor(public commonService: CommonService) { }

  ngOnInit() {
  }

  routerLinkDetail() {}
}
