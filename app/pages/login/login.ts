import {Page, NavController, MenuController, Alert} from 'ionic-angular';
import {UserData} from '../../providers/user-data';
import {AuthService} from '../../providers/auth-service';
import {SignupPage} from '../signup/signup';
import {ForgotPasswordPage} from '../forgot-password/forgot-password';
import {AccountListPage} from '../mymoney/account-list/account-list';

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
      private auth: AuthService) {}

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
      this.auth.signInWithEmailPassword(form.controls.username.value, form.controls.password.value)
      .then(() => this.LoginSuccess())
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
