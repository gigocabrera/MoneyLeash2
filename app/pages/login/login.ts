import {Page, NavController, MenuController, Alert} from 'ionic-angular';
import {UserData} from '../../providers/user-data';
import {SignupPage} from '../signup/signup';
import {ForgotPasswordPage} from '../forgot-password/forgot-password';
import {AccountListPage} from '../mymoney/account-list/account-list';

/* Firebase imports */
import {AngularFire} from 'angularfire2';
import {FirebaseAuth, AuthProviders, AuthMethods } from 'angularfire2';

@Page({
  templateUrl: 'build/pages/login/login.html'
})

export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(
      private nav: NavController,
      private userData: UserData,
      private menu: MenuController,
      public af: AngularFire,
      public auth: FirebaseAuth) {}

  private LoginSuccess(): void {
    this.nav.setRoot(AccountListPage);
  }
  
  private LoginError(): void {
    // Will be called if login fails
    let alert = Alert.create({
      title: 'Login Failed',
      subTitle: 'Please check your email and/or password and try again',
      buttons: ['Ok']
    });
    this.nav.present(alert);
  }
  
  onLogin(form) {
    this.submitted = true;
    if (form.valid) {      
      let credentials = {
        email: form.controls.username.value,
        password: form.controls.password.value
      }
      this.auth.login(credentials, {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }).then(() => this.LoginSuccess())
      .catch(() => this.LoginError());
    }
  }

  onSignup() {
    // go to the sign up page
    this.nav.push(SignupPage);
  }
  
  onForgotPassword() {
    // go to the forgot password page
    this.nav.push(ForgotPasswordPage);
  }
  
  onPageDidEnter() {
    this.menu.enable(false);
    this.menu.swipeEnable(false);
  }
  
  onPageDidLeave() {
    this.menu.enable(this.submitted);
    this.menu.swipeEnable(this.submitted);
  }
  
}
