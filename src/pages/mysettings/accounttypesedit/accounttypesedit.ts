import { Component } from '@angular/core';

import { NavController, ViewController, NavParams } from 'ionic-angular';

// services
import { UserData } from '../../../providers/user-data';

@Component({
  templateUrl: 'accounttypesedit.html'
})

export class AccountTypesEditPage {

  navbarcolor: string;
  dividercolor: string;
  item: {name?: string, icon?: string, $key?: string} = {};
  title: string;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public userData: UserData) {
      
    this.navbarcolor = this.userData.user.navbarcolor;
    this.dividercolor = this.userData.user.dividercolor;

    this.item = this.navParams.data.paramItem;
    if (this.item.name === undefined) {
      this.title = 'Add Account Type';
      this.item.icon = 'ios-cash-outline';
    } else {
      this.title = 'Edit Account Type';
    }
  }

  save() {
    this.viewCtrl.dismiss(this.item);
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
    
}