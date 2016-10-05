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
    this.dismiss(newpassword);
  }
  
  dismiss(newpassword) {
    this.viewCtrl.dismiss(newpassword);
  }
    
}