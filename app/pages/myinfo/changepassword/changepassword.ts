import {Component} from '@angular/core';
import {NavController, Alert, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/myinfo/changepassword/changepassword.html'
})

export class ChangePasswordPage { 
  user: {
    email?: string,
    oldpassword?: string,
    newpassword?: string
  } = {};
        
  constructor(
      private nav: NavController,
      private viewCtrl: ViewController) { }  
 
  changePassword(user) {
    this.dismiss(user);
  }
  
  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
    
}