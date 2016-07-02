import {Component} from '@angular/core';
import {NavController, Alert, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/myinfo/resetpassword/resetpassword.html'
})

export class ResetPasswordPage { 
  user: {
    email?: string
  } = {};
        
  constructor(
      private nav: NavController,
      private viewCtrl: ViewController) {}  
 
  resetPassword(user) {
    this.dismiss(user);
  }
  
  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
    
}