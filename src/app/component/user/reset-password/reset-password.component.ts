import { Component, OnInit } from '@angular/core';
import { alert } from 'devextreme/ui/dialog';
import { getMessageCodeError } from 'src/app/common/common.constant';
import { UserService } from '../user.service';

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

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  confirmResetPassword() {
    if (!this.resetPasswordInfo.newPassword || !this.resetPasswordInfo.confirmNewPassword) {
      alert('Vui lòng nhập đủ thông tin để tạo mật khẩu mới', 'Yachttour.vn');
    } else {
      if (this.resetPasswordInfo.newPassword !== this.resetPasswordInfo.confirmNewPassword) {
        alert('Mật khẩu xác nhận không trùng khớp! Vui lòng nhập lại mật khẩu', 'Yachttour.vn');
      } else {
        this.userService.resetPassword(this.resetPasswordInfo).subscribe( res => {
          alert('Tạo lại mật khẩu thành công, có hiệu lực trong lần đăng nhập tiếp theo!', 'Yachttour.vn');
        }, err => {
          alert(getMessageCodeError(err), 'Yachttour.vn');
        });
      }
    }
  }

}
