import {Page, NavController, MenuController} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {SignupPage} from '../signup/signup';

@Page({
  templateUrl: 'build/pages/logout/logout.html'
})
export class LogoutPage {
  constructor(private nav: NavController, private menu: MenuController) {}
  
  onLogin(form) {
    this.nav.setRoot(LoginPage);
  }

  onSignup() {
    this.nav.setRoot(SignupPage);
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
