import {Component} from '@angular/core';
import {NavController, Alert, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/myinfo/changepassword/changepassword.html'
})

export class ChangePasswordPage { 
  
  newpassword: string = '';
        
  constructor(
      private nav: NavController,
      private viewCtrl: ViewController) { }  
 
  changePassword(newpassword) {
    this.dismiss(newpassword);
  }
  
  dismiss(newpassword) {
    this.viewCtrl.dismiss(newpassword);
  }
    
}