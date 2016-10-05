import { Component } from '@angular/core';

import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'accounttypesedit.html'
})

export class AccountTypesEditPage {

  item: {name?: string, icon?: string} = {};
  thisname: string;
  thisicon: string;
  title: string;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
      this.item = this.navParams.data.paramItem;
      if (this.item === undefined) {
        this.title = 'Add Account Type';
        this.thisname = '';
        this.thisicon = 'ios-cash-outline';
      } else {
        this.title = 'Edit Account Type';
        this.thisname = this.item.name;
        this.thisicon = this.item.icon;        
      }      
  }

  save(newtype) {
    //this.item.name = newtype;
    //this.dismiss(this.item);
  }
  
  dismiss(item) {
    this.viewCtrl.dismiss(item);
  }
    
}