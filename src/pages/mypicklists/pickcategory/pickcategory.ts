import { Component } from '@angular/core';

import { ViewController, NavParams } from 'ionic-angular';

// services
import { UserData } from '../../../providers/user-data';

@Component({
  templateUrl: 'pickcategory.html'
})

export class PickCategoryPage {
  
  items = [];  
  itemselected: string;
   
  constructor(
    public viewCtrl: ViewController, 
    public navParams: NavParams,
    public userData: UserData) {}

  ionViewDidLoad() {
    this.items.push(
      { text: 'Income', value: 'Income' },
      { text: 'Expense', value: 'Expense' },
      { text: 'Transfer', value: 'Transfer' }
    );
    this.itemselected = this.navParams.data.paramTransactionCategory;
  }
  
 pickPreference(itemselected) {
    this.viewCtrl.dismiss(itemselected);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}