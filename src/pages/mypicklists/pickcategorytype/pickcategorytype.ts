import { Component } from '@angular/core';

import { ViewController, NavParams } from 'ionic-angular';

// services
import { UserData } from '../../../providers/user-data';

@Component({
  templateUrl: 'pickcategorytype.html'
})

export class PickCategoryTypePage {
  
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
    );
    this.itemselected = this.navParams.data.paramCategoryType;
    console.log(this.itemselected);
  }
  
 pickPreference(itemselected) {
    this.viewCtrl.dismiss(itemselected);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}