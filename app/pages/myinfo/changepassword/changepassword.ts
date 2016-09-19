// angular
import {Component} from '@angular/core';

// ionic
import {Alert, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/myinfo/changepassword/changepassword.html'
})

export class ChangePasswordPage { 
  
  newpassword: string = '';
        
  constructor(
      public viewCtrl: ViewController) { }  
 
  changePassword(newpassword) {
    this.dismiss(newpassword);
  }
  
  dismiss(newpassword) {
    this.viewCtrl.dismiss(newpassword);
  }
    
}