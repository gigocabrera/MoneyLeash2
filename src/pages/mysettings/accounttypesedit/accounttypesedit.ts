import { Component } from '@angular/core';

import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'accounttypesedit.html'
})

export class AccountTypesEditPage {

  item: {name?: string, icon?: string, $key?: string} = {};
  title: string;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {

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