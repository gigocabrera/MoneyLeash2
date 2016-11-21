import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

// services
import { UserData } from '../../../providers/user-data';

@Component({
  templateUrl: 'changeemail.html'
})

export class ChangeEmailPage { 

  newemail: string = '';

  constructor(
    public viewCtrl: ViewController,
    public userData: UserData) {}
  
  changeEmail(newemail) {
    this.viewCtrl.dismiss(newemail);
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
    
}