import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { alert } from 'devextreme/ui/dialog';
import { getMessageCodeError } from 'src/app/common/common.constant';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public popupResetPassword = true;
  public resetPasswordInfo = {
    newPassword: '',
    confirmNewPassword: ''
  };
  public token = '';

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router) { }

  ngOnInit() {
    this.token = this.cookieService.get('token');
    if(!this.token) {
      this.router.navigate(['/trang-chu']);
    }
  }

  confirmResetPassword() {
    if (!this.resetPasswordInfo.newPassword || !this.resetPasswordInfo.confirmNewPassword) {
      alert('Vui lòng nhập đủ thông tin để tạo mật khẩu mới', 'Yachttour');
    } else {
      if (this.resetPasswordInfo.newPassword !== this.resetPasswordInfo.confirmNewPassword) {
        alert('Mật khẩu xác nhận không trùng khớp! Vui lòng nhập lại mật khẩu', 'Yachttour');
      } else {
        let params = {
          key : this.activatedRoute.snapshot.queryParams.key,
          newPassword: this.resetPasswordInfo.newPassword
        }
        this.userService.resetPassword(params).subscribe( res => {
          alert('Tạo lại mật khẩu thành công, có hiệu lực trong lần đăng nhập tiếp theo!', 'Yachttour');
          this.router.navigate['/trang-chu'];
        }, err => {
          alert(getMessageCodeError(err), 'Yachttour');
        });
      }
    }
  }

}
