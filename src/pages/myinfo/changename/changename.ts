import { Component } from '@angular/core';

import { ViewController, NavParams } from 'ionic-angular';

// services
import { UserData } from '../../../providers/user-data';

@Component({
  templateUrl: 'changename.html'
})

export class ChangeNamePage { 

  navbarcolor: string;
  dividercolor: string;
  newname: string = '';

  constructor(
    public viewCtrl: ViewController, 
    public navParams: NavParams,
    public userData: UserData) {
    
    this.navbarcolor = this.userData.user.navbarcolor;
    this.dividercolor = this.userData.user.dividercolor;
    this.newname = this.navParams.data.paramFullName;

  }
  
  changeName(newname) {
    this.viewCtrl.dismiss(newname);
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
    
}