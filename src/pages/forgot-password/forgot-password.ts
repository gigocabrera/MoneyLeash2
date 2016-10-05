import { Component } from '@angular/core';

import { NavController, MenuController } from 'ionic-angular';

// services
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {
  
  forgotpassword = {'username': ''};
  submitted = false;

  constructor(
    public nav: NavController, 
    public userData: UserData, 
    public menu: MenuController) {}

  public onForgotPassword(credentials) {
    this.submitted = true;
    console.log('forgot password');
  }
    
}
