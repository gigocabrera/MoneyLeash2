import {Component} from '@angular/core';
import {NavController, MenuController} from 'ionic-angular';
import {UserData} from '../../providers/user-data';

@Component({
  templateUrl: 'build/pages/forgot-password/forgot-password.html'
})
export class ForgotPasswordPage {
  
  user = {'email': ''};
  submitted = false;

  constructor(public nav: NavController, public userData: UserData, public menu: MenuController) {}

  public doForgotPassword(credentials) {
    
  }
    
}
