import {Component} from '@angular/core';
import {NavController, MenuController} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {SignupPage} from '../signup/signup';

@Component({
  templateUrl: 'build/pages/logout/logout.html'
})
export class LogoutPage {
  constructor(private nav: NavController, private menu: MenuController) {}
  
  doLogin(form) {
    this.nav.push(LoginPage, {}, {animate: true, direction: 'reverse'});
  }

  doSignup() {
    this.nav.push(SignupPage, {}, {animate: true, direction: 'reverse'});
  }
  
  ionViewDidEnter() {
    this.menu.enable(false, "loggedInMenu");
    this.menu.enable(false, "loggedOutMenu");
    this.menu.swipeEnable(false, "loggedOutMenu");
  }
  
}
