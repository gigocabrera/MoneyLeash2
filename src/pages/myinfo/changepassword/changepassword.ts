import {Component} from '@angular/core';

import { ViewController } from 'ionic-angular';

// services
import { UserData } from '../../../providers/user-data';

@Component({
  templateUrl: 'changepassword.html'
})

export class ChangePasswordPage { 
  
  navbarcolor: string;
  dividercolor: string;
  newpassword: string = '';
        
  constructor(
      public viewCtrl: ViewController,
      public userData: UserData) {

      this.navbarcolor = this.userData.user.navbarcolor;
      this.dividercolor = this.userData.user.dividercolor;

    }  
 
  changePassword(newpassword) {
    this.viewCtrl.dismiss(newpassword);
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
    
}