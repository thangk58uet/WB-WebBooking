import { CommonService } from './../../service/common.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-active-account',
  templateUrl: './active-account.component.html',
  styleUrls: ['./active-account.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActiveAccountComponent implements OnInit {

  public popupActive = true;
  public popupLogin = false;

  constructor(private activatedRoute: ActivatedRoute,
              private commonService: CommonService,
              private router: Router) { }

  ngOnInit() {
    this.activeAccount();
  }

  activeAccount() {
    this.commonService.activeAccount({key: this.activatedRoute.snapshot.queryParams.key}).subscribe( res => {
    });
  }

  login() {
    this.popupActive = false;
    this.popupLogin = true;
  }

  routerMain() {
    this.router.navigate(['/trang-chu']);
  }
}
