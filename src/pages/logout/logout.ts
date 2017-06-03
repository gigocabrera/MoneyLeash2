import { Component } from '@angular/core';

import { NavController, MenuController } from 'ionic-angular';

// app pages
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage {
  constructor(
    public nav: NavController, 
    public menu: MenuController) {}
  
  doLogin(form) {
    this.nav.push(LoginPage, {}, {animate: true, direction: 'reverse'});
  }

  doSignup() {
    this.nav.push(SignupPage, {}, {animate: true, direction: 'reverse'});
  }
  
  ionViewDidEnter() {
    //this.menu.enable(false);
    //this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    //this.menu.enable(true);
    //this.menu.swipeEnable(true);
  }
  
}