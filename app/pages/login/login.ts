import {Page, NavController, MenuController, Alert} from 'ionic-angular';
import {UserData} from '../../providers/user-data';
import {SignupPage} from '../signup/signup';
import {ForgotPasswordPage} from '../forgot-password/forgot-password';
import {AccountListPage} from '../mymoney/account-list/account-list';
import {AuthService} from '../../providers/auth-service';

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
      public auth: AuthService) {}

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
  
  onLogin(form) {
    this.submitted = true;
    if (form.valid) {
      this.auth.signInWithEmailPassword(form.controls.username.value, form.controls.password.value)
      .then(() => this.LoginSuccess())
      .catch(() => this.LoginError());
    }
  }

  onSignup() {
    this.nav.push(SignupPage);
  }
  
  onForgotPassword() {
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
