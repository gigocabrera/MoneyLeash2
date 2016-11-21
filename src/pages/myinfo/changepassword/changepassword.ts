import {Component} from '@angular/core';

import { ViewController } from 'ionic-angular';

// services
import { UserData } from '../../../providers/user-data';

@Component({
  templateUrl: 'changepassword.html'
})

export class ChangePasswordPage { 
  
  newpassword: string = '';
        
  constructor(
      public viewCtrl: ViewController,
      public userData: UserData) {}  
 
  changePassword(newpassword) {
    this.viewCtrl.dismiss(newpassword);
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
    
}