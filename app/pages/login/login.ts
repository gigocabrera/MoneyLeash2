import {Component} from '@angular/core';
import {NavController, Alert} from 'ionic-angular';
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
    private db: FirebaseService) {}

  private LoginSuccess(): void {
    this.db.getMyPreferences();
    this.nav.setRoot(AccountListPage, {}, {animate: true, direction: 'forward'});
  }
  
  private LoginError(error): void {
    let alert = Alert.create({
      title: 'Login Failed',
      subTitle: 'Please check your email and/or password and try again',
      buttons: ['Ok']
    });
    this.nav.present(alert);
    console.log(error);
  }
  
  /*doLoginObservable(credentials, _event) {
    _event.preventDefault();
    this.userData.saveLocalStorage(credentials);
    this.submitted = true;
    this.db.loginObservable(credentials)
      .subscribe(
      (data: any) => {
        this.LoginSuccess();
      },
      (error) => {
        console.log(error);
        this.LoginError();
      }
    );
  }*/

  doLogin(credentials, _event) {
    _event.preventDefault();
    this.userData.saveLocalStorage(credentials);
    this.submitted = true;
    this.db.login(credentials).then(() => {
        this.LoginSuccess();
      }).catch(
      (error) => {
        this.LoginError(error);
      }
    );
  }

  doSignup() {
    this.nav.push(SignupPage);
  }
  
  doForgotPassword() {
    this.nav.push(ForgotPasswordPage);
  }
  
}
