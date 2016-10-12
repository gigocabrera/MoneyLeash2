import {Component} from '@angular/core';

import { ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'changepassword.html'
})

export class ChangePasswordPage { 
  
  newpassword: string = '';
        
  constructor(
      public viewCtrl: ViewController) { }  
 
  changePassword(newpassword) {
    this.viewCtrl.dismiss(newpassword);
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
    
}