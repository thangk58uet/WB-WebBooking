import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from '../login/login.service';
import { alert } from 'devextreme/ui/dialog';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  public userName = '';
  public passWord = '';
  public email = '';
  public popupVerifyEmail = false;
  public firstName = '';
  public lastName = '';
  public phoneNumber = '';

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  register() {
    const params = {
      login: this.userName,
      password: this.passWord,
      email: this.email,
      userType: 'EMAIL',
      langKey: 'abc',
      fisrtName : this.firstName,
      lastname: this.lastName,
      phoneNumber: this.phoneNumber
    };
    this.loginService.register(params).subscribe(res => {
      this.popupVerifyEmail = true;
      this.loginService.popupRegister = false;
    }, err => {
      const message = JSON.parse(err['_body']).message;
      alert(message, 'Yachtour.com');
    });
  }
}
