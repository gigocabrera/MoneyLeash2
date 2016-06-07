import {Component} from '@angular/core';
import {NavController, MenuController, Alert} from 'ionic-angular';
import {UserData} from '../../providers/user-data';
import {SignupPage} from '../signup/signup';
import {ForgotPasswordPage} from '../forgot-password/forgot-password';
import {AccountListPage} from '../mymoney/account-list/account-list';
import {AuthService} from '../../providers/auth-service';

@Component({
  templateUrl: 'build/pages/login/login.html'
})

export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(
      private nav: NavController,
      private userData: UserData,
      private menu: MenuController,
      public auth: AuthService) {
        
        //Test data - delete before going to production
        this.login = {'username': 'guni@test.com', 'password': '111'};
        
      }

  private LoginSuccess(): void {
    this.nav.setRoot(AccountListPage, {}, {animate: true, direction: 'forward'});
  }
  
  private LoginError(): void {
    let alert = Alert.create({
      title: 'Login Failed',
      subTitle: 'Please check your email and/or password and try again',
      buttons: ['Ok']
    });
    this.nav.present(alert);
  }
  
  doLogin(form) {
    this.submitted = true;
    if (form.valid) {
      // 1) Save in localStorage
      this.userData.login(this.login.username);
      // 2) Sign in with credentials provided
      this.auth.signInWithEmailPassword(form.controls.username.value, form.controls.password.value)
      .then(() => this.LoginSuccess())
      .catch(() => this.LoginError());
    }
  }

  doSignup() {
    this.nav.push(SignupPage);
  }
  
  doForgotPassword() {
    this.nav.push(ForgotPasswordPage);
  }
  
  ionViewDidEnter() {
    this.menu.enable(false);
    this.menu.swipeEnable(false);
  }
  
  ionViewDidLeave() {
    this.menu.enable(this.submitted);
    this.menu.swipeEnable(this.submitted);
  }
  
}
