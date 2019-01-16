import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from './user.service';
import { alert } from 'devextreme/ui/dialog';
import { getMessageCodeError } from 'src/app/common/common.constant';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
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
    passpost: '',
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

  public totalElements: number;
  public totalPages = 0;
  public currentPage = 1;
  public pagination = {
    pageNum: 0,
    pageSize: 3
  };
  public totalCount = 0;
  public token = '';

  constructor(private userService: UserService,
              private cookieService: CookieService,
              private router: Router) { }

  ngOnInit() {
    this.token = this.cookieService.get('token');
    if(this.token) {
      this.getAccountInfo();
      this.getHistoryTourInfo();
    } else {
      this.router.navigate(['/trang-chu']);
    }
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
      this.userInfo.passpost = this.accountInfo.passpost;
      this.userInfo.address = this.accountInfo.address;
      this.userInfo.rank = this.accountInfo.rank;
      this.userInfo.level = this.accountInfo.level;
      this.userInfo.cardType = this.accountInfo.cardType;
      this.userInfo.moneyAmount = this.accountInfo.moneyAmount;
      this.userInfo.fullName = this.userInfo.firstName + ' ' + this.userInfo.lastName;
    });
  }

  getHistoryTourInfo() {
    const params = {
      pageNum: this.pagination.pageNum,
      pageSize: this.pagination.pageSize,
    };
    this.userService.getHistoryTour(params).subscribe( res => {
      this.historyTourInfo = (res && res['value'] && res['value'].list) ? res['value'].list : {};
      for(let index = 0; index < this.historyTourInfo.length;index++) {
        this.historyTourInfo[index].fromDate = this.convertMonth(this.historyTourInfo[index].fromDate);
        this.historyTourInfo[index].toDate = this.convertMonth(this.historyTourInfo[index].toDate);
      }
      this.totalCount = this.historyTourInfo['totalCount'];
      this.totalPages = Math.ceil(this.totalCount / this.pagination.pageSize);
    });
  }

  modifyAccountInfo() {
    this.userService.modifyAccountInfo(this.userInfo).subscribe( res => {
      alert('Cập nhật thành công!', 'Yachttour');
      this.getAccountInfo();
    });
  }

  confirmChangePassword() {
    if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
      alert('Vui lòng nhập đủ thông tin đổi mật khẩu!', 'Yachttour');
    } else {
      if (this.newPassword !== this.confirmPassword) {
        alert('Xác nhận mật khẩu không trùng khớp!', 'Yachttour');
      } else {
        const params = {
          currentPassword : this.oldPassword,
          newPassword: this.newPassword
        };
        this.userService.changePassword(params).subscribe( res => {
          alert('Đổi mật khẩu thành công, có hiệu lực trong lần đăng nhập tiếp theo!', 'Yachttour');
          this.popupChangePassword = false;
        }, err => {
          alert(getMessageCodeError(err), 'Yachttour');
        });
      }
    }
  }

  forgotPassword() {
    this.popupChangePassword = false;
    this.popupForgotPassword = true;
  }

  confirmForgotPassword() {
    if (!this.userInfo.email) {
      alert('Vui lòng nhập email!', 'Yachttour');
    } else {
      this.userService.forgotPassword(this.userInfo.email).subscribe( res => {
        this.popupCheckEmail = true;
        this.popupForgotPassword = false;
      }, err => {
        this.popupCheckEmail = true;
        alert(getMessageCodeError(err), 'Yachttour');
      });
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

  convertMonth(milisecond) {
    if (!milisecond) {
      return '-';
    }

    const dateTime = new Date(milisecond);
    let strDateTime = dateTime.getHours() + 'h' + ' ';
    if (dateTime.getMonth() < 9) {
      strDateTime += dateTime.getFullYear() + '-' +  '0' + (dateTime.getMonth() + 1);
    } else {
      strDateTime += dateTime.getFullYear() + '-' + (dateTime.getMonth() + 1);
    }

    if(dateTime.getDate() < 9) {
      strDateTime += '-' + '0' + dateTime.getDate();
    } else {
      strDateTime += '-' + dateTime.getDate();
    }
    return strDateTime;
  }
}
