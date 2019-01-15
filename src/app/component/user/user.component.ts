import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from './user.service';
import { alert } from 'devextreme/ui/dialog';
import { getMessageCodeError } from 'src/app/common/common.constant';
declare const $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public isProfile = true;
  public popupChangePassword = false;
  public oldPassword = '';
  public newPassword = '';
  public confirmPassword = '';
  public accountInfo: any = {};
  public historyTourInfo: any = [];
  public userInfo = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    passport: '',
    address: '',
    login: '',
    rank: '',
    level: '',
    cardType: '',
    moneyAmount: null,
    fullName: ''
  };
  public popupForgotPassword = false;
  public popupResetPassword = false;
  public popupCheckEmail = false;
  public resetPasswordInfo = {
    key: '',
    newPassword: '',
    confirmNewPassword: ''
  };

  public totalElements: number;
  public totalPages = 0;
  public currentPage = 1;
  public pagination = {
    pageNum: 0,
    pageSize: 3
  };
  public totalCount = 0;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAccountInfo();
    this.getHistoryTourInfo();
  }

  profile(e) {
    this.isProfile = true;
    $('.list-group-item-action').removeClass('active');
    $(e.target).addClass('active');
  }

  historyTour(e) {
    this.isProfile = false;
    $('.list-group-item-action').removeClass('active');
    $(e.target).addClass('active');
  }

  changePassword() {
    this.popupChangePassword = true;
  }

  getAccountInfo() {
    this.userService.getAccountInfo().subscribe( res => {
      this.accountInfo = (res && res['value']) ? res['value'] : {};
      this.userInfo.firstName = this.accountInfo.firstName;
      this.userInfo.lastName = this.accountInfo.lastName;
      this.userInfo.login = this.accountInfo.login;
      this.userInfo.email = this.accountInfo.email;
      this.userInfo.phoneNumber = this.accountInfo.phoneNumber;
      this.userInfo.passport = this.accountInfo.passport;
      this.userInfo.address = this.accountInfo.address;
      this.userInfo.rank = this.accountInfo.rank;
      this.userInfo.level = this.accountInfo.level;
      this.userInfo.cardType = this.accountInfo.cardType;
      this.userInfo.moneyAmount = this.accountInfo.moneyAmount;
      this.userInfo.fullName = this.userInfo.firstName + ' ' + this.userInfo.lastName;
    });
  }

  getHistoryTourInfo() {
    let params = {
      pageNum: this.pagination.pageNum,
      pageSize: this.pagination.pageSize,
    }
    this.userService.getHistoryTour(params).subscribe( res => {
      this.historyTourInfo = (res && res['value'] && res['value'].list) ? res['value'].list : {};
      this.totalCount = this.historyTourInfo['totalCount'];
      this.totalPages = Math.ceil(this.totalCount / this.pagination.pageSize);
    });
  }

  modifyAccountInfo() {
    this.userService.modifyAccountInfo(this.userInfo).subscribe( res => {
      alert('Cập nhật thành công!','Yachttour.vn');
      this.getAccountInfo();
    })
  }

  confirmChangePassword() {
    if(!this.oldPassword || !this.newPassword || !this.confirmPassword) {
      alert('Vui lòng nhập đủ thông tin đổi mật khẩu!','Yachttour.vn');
    } else {
      if (this.newPassword !== this.confirmPassword) {
        alert('Xác nhận mật khẩu không trùng khớp!','Yachttour.vn');
      } else {
        let params = {
          currentPassword : this.oldPassword,
          newPassword: this.newPassword
        }
        this.userService.changePassword(params).subscribe( res => {
          alert('Đổi mật khẩu thành công, có hiệu lực trong lần đăng nhập tiếp theo!','Yachttour.vn');
          this.popupChangePassword = false;
        }, err => {
          alert(getMessageCodeError(err),'Yachttour.vn');
        })
      }
    }
  }

  forgotPassword() {
    this.popupChangePassword = false;
    this.popupForgotPassword = true;
  }

  confirmForgotPassword() {
    if (!this.userInfo.email) {
      alert('Vui lòng nhập email!','Yachttour.vn');
    } else {
      this.userService.forgotPassword(this.userInfo.email).subscribe( res => {
        this.popupCheckEmail = true;
        this.popupForgotPassword = false;
      }, err => {
        this.popupCheckEmail = true;
        alert(getMessageCodeError(err),'Yachttour.vn');
      })
    }
  }

  confirmResetPassword() {
    if (!this.resetPasswordInfo.newPassword || !this.resetPasswordInfo.confirmNewPassword) {
      alert('Vui lòng nhập đủ thông tin để tạo mật khẩu mới','Yachttour.vn');
    } else {
      if (this.resetPasswordInfo.newPassword !== this.resetPasswordInfo.confirmNewPassword) {
        alert('Mật khẩu xác nhận không trùng khớp! Vui lòng nhập lại mật khẩu', 'Yachttour.vn');
      } else {
        this.userService.resetPassword(this.resetPasswordInfo).subscribe( res => {
          alert('Tạo lại mật khẩu thành công, có hiệu lực trong lần đăng nhập tiếp theo!','Yachttour.vn');
        }, err => {
          alert(getMessageCodeError(err),'Yachttour.vn');
        })
      }
    }
  }

  checkEmailResetPassword() {
    window.open('https://mail.google.com');
  }

  goToPage(e) {
    this.currentPage = e;
    this.pagination.pageNum = e - 1;
    this.getHistoryTourInfo();
  }
}
