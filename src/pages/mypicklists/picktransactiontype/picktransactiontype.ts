import { Component } from '@angular/core';

import { ViewController, NavParams } from 'ionic-angular';

// services
import { UserData } from '../../../providers/user-data';

@Component({
  templateUrl: 'picktransactiontype.html'
})

export class PickTransactionTypePage {
  
  items = [];  
  itemselected: string;
   
  constructor(
    public viewCtrl: ViewController, 
    public navParams: NavParams,
    public userData: UserData) {}

  ionViewDidLoad() {
    this.items.push(
      { text: 'Income', value: 'Income', icon: 'md-add', color: 'mlgreen' },
      { text: 'Expense', value: 'Expense', icon: 'md-remove', color: 'mlred' },
      { text: 'Transfer', value: 'Transfer', icon: 'ios-redo', color: 'mlpurple' }
    );
    this.itemselected = this.navParams.data.paramTransactionType;
  }
  
  pickPreference(itemselected) {
    this.viewCtrl.dismiss(itemselected);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}