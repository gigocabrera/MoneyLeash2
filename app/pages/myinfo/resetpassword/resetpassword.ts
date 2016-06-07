import {Component} from '@angular/core';
import {NavController, Alert, ViewController} from 'ionic-angular';
import {AuthService} from '../../../providers/auth-service';

@Component({
  templateUrl: 'build/pages/myinfo/resetpassword/resetpassword.html'
})

export class ResetPasswordPage { 
  user: {
    email?: string
  } = {};
        
  constructor(
      private nav: NavController,
      private viewCtrl: ViewController,
      private auth: AuthService) {}  
 
  resetPassword(user) {
    this.dismiss(user);
  }
  
  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
    
}