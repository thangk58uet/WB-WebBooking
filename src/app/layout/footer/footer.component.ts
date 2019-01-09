import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FooterService } from './footer.service';
import { CommonService } from 'src/app/service/common.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {

  public lsPartnerLogo;
  public imageUrlAPI;
  constructor(
    public footerService : FooterService,
    public commonService : CommonService) { }

  ngOnInit() {
    this.imageUrlAPI = this.commonService.pathImage;
    this.getPartnerLogo();
  }

  getPartnerLogo() {
    this.footerService.getPartnerLogo().subscribe(res => {
      if (res && res['value']) {
          this.lsPartnerLogo = res['value'];
      }
    });
    
  }
}
