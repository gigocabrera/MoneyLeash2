import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

// services
import { UserData } from '../../../providers/user-data';

@Component({
  templateUrl: 'changeemail.html'
})

export class ChangeEmailPage { 

  navbarcolor: string;
  dividercolor: string;
  newemail: string = '';

  constructor(
    public viewCtrl: ViewController,
    public userData: UserData) {

    this.navbarcolor = this.userData.user.navbarcolor;
    this.dividercolor = this.userData.user.dividercolor;

  }
  
  changeEmail(newemail) {
    this.viewCtrl.dismiss(newemail);
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
    
}