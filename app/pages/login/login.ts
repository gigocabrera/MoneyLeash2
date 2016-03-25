import {CanActivate, Router} from 'angular2/router';
import {Page, NavController, MenuController, Alert} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {SignupPage} from '../signup/signup';
import {UserData} from '../../providers/user-data';
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
      private auth: AuthService,
      private router: Router) {}
  
  signInWithGithub(): void {
    this.auth.signInWithGithub()
      .then(() => this.SignInSuccess());
  }

  signInWithGoogle(): void {
    this.auth.signInWithGoogle()
      .then(() => this.SignInSuccess());
  }

  signInWithTwitter(): void {
    this.auth.signInWithTwitter()
      .then(() => this.SignInSuccess());
  }

  private SignInSuccess(): void {
    this.nav.push(TabsPage);
  }
  
  private SignInError(): void {
    // will be called if login fails
    let alert = Alert.create({
      title: 'Login Failed',
      subTitle: 'Please check your username and/or password and try again',
      buttons: ['Ok']
    });
    this.nav.present(alert);
  }
  
  onLogin(form) {
    this.submitted = true;
    if (form.valid) {
      this.auth.signInWithEmailPassword(form.controls.username.value, form.controls.password.value)
      .then(() => this.SignInSuccess())
      .catch(() => this.SignInError());
    }
  }

  onSignup() {
    this.nav.push(SignupPage);
  }
  
  onPageDidEnter() {
    this.menu.enable(false);
    this.menu.swipeEnable(false);
  }
  
  onPageDidLeave() {
    this.menu.enable(true);
    this.menu.swipeEnable(true);
  }
  
}
