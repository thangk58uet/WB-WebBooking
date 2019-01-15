import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from './user.service';

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
    this.userService.getHistoryTour().subscribe( res => {
      this.historyTourInfo = (res && res['value'] && res['value'].list) ? res['value'].list : {};
    });
  }
}
