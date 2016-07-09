import {Component} from '@angular/core';
import {NavController, MenuController} from 'ionic-angular';
import {UserData} from '../../providers/user-data';

@Component({
  templateUrl: 'build/pages/forgot-password/forgot-password.html'
})
export class ForgotPasswordPage {
  forgotPassword: {username?: string} = {};
  submitted = false;

  constructor(private nav: NavController, private userData: UserData, private menu: MenuController) {}

  onSignup(form) {
    this.submitted = true;
    if (form.valid) {
      //this.userData.signup();
      //this.nav.push(TabsPage);
    }
  }
  
  ionViewDidEnter() {
    this.menu.enable(false);
    this.menu.swipeEnable(false);
  }
    
}
