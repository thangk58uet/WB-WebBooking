import { CommonService } from './../../service/common.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-active-account',
  templateUrl: './active-account.component.html',
  styleUrls: ['./active-account.component.scss']
})
export class ActiveAccountComponent implements OnInit {

  public keyActive = '';
  constructor(private activatedRoute: ActivatedRoute,
              private commonService: CommonService) { }

  ngOnInit() {
    this.activeAccount();
  }

  activeAccount() {
    this.commonService.activeAccount(this.keyActive = this.activatedRoute.snapshot.queryParams.key).subscribe( res => {

    });
  }
}
