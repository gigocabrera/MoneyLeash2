import {Component} from '@angular/core';
import {NavController, Alert} from 'ionic-angular';
import {UserData} from '../../providers/user-data';
import {SignupPage} from '../signup/signup';
import {ForgotPasswordPage} from '../forgot-password/forgot-password';
import {AccountListPage} from '../mymoney/account-list/account-list';

// Firebase
import {AngularFire, AuthProviders, AuthMethods} from 'angularfire2';
import {FirebaseService} from '../../providers/firebaseService'

@Component({
  templateUrl: 'build/pages/login/login.html'
})

export class LoginPage {

  submitted = false;

  constructor(
    private nav: NavController,
    private userData: UserData,
    private db: FirebaseService,
    private af: AngularFire) {}

  private LoginSuccess(): void {
    this.db.getMyPreferences();
    this.db.getMyHouse();
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

  // Login usig the email/password auth provider
  doLogin(credentials, _event) {
    _event.preventDefault();
    this.userData.saveLocalStorage(credentials);
    this.submitted = true;
    this.af.auth.login(credentials, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }).then((authData) => {
      //console.log(authData);
      this.LoginSuccess();
    }).catch((error) => {
      //console.log(error)
      this.LoginError(error);
    });
  }

  doSignup() {
    this.nav.push(SignupPage);
  }
  
  doForgotPassword() {
    this.nav.push(ForgotPasswordPage);
  }
  
}
