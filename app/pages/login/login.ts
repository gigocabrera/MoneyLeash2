import {Component} from '@angular/core';
import {NavController, MenuController, Alert} from 'ionic-angular';
import {UserData} from '../../providers/user-data';
import {SignupPage} from '../signup/signup';
import {ForgotPasswordPage} from '../forgot-password/forgot-password';
import {AccountListPage} from '../mymoney/account-list/account-list';

// Firebase service
import {FirebaseService} from '../../providers/firebaseService'

@Component({
  templateUrl: 'build/pages/login/login.html'
})

export class LoginPage {

  submitted = false;

  constructor(
    private nav: NavController,
    private userData: UserData,
    private menu: MenuController,
    private fbservice: FirebaseService) {}

  private LoginSuccess(): void {
    this.fbservice.loadGlobalData();
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
  
  doLogin(credentials, _event) {

    _event.preventDefault();
    this.userData.handleLogin(credentials);
    this.submitted = true;

    // Firebase login usig the email/password auth provider
    this.fbservice.login(credentials)
      .subscribe(
      (data: any) => {
        this.LoginSuccess();
      },
      (error) => {
        console.log(error);
        this.LoginError();
      });
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
