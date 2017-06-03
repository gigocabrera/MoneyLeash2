import { Component } from '@angular/core';

import { NavController, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {
  
  forgotpassword: {email?: string} = {};
  submitted = false;

  constructor(
    public nav: NavController,
    public menu: MenuController) {}

  public onForgotPassword(credentials) {
    this.submitted = true;
    console.log('forgot password');
  }
    
}
