import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FooterService } from './footer.service';
import { CommonService } from 'src/app/service/common.service';
import { alert } from 'devextreme/ui/dialog';



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {

  public lsPartnerLogo;
  public imageUrlAPI;
  public email: string;
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

  registerEmailNotification() {
    if(!this.validateEmail(this.email)){
      alert("Email không đúng định dạng!", 'Yachtour.vn');
      return;
    }
    this.footerService.registerEmailNotification(this.email).subscribe(res => {
      this.email = '';
      alert("Đăng ký nhận thông tin thành công!", 'Yachtour.vn');

    }, err => {
      const message = JSON.parse(err['_body']).message;
      alert(message, 'Yachtour.vn');
    });
    
  }

  private validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
