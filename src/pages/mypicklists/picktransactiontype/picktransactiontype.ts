import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

// services
import { UserData } from '../../../providers/user-data';
import { TransactionData } from '../../../providers/transaction-data';

@Component({
  selector: 'page-picktransactiontype',
  templateUrl: 'picktransactiontype.html'
})

export class PickTransactionTypePage {
  
  items = [];  
  itemselected: string;
   
  constructor(
      public nav: NavController,
      public navParams: NavParams,
      public userData: UserData,
      public transactionData: TransactionData) {}

  ionViewDidLoad() {
    this.items.push(
      { text: 'Income', value: 'Income'},
      { text: 'Expense', value: 'Expense'},
      { text: 'Transfer', value: 'Transfer'}
    );
    this.itemselected = this.transactionData.getTransactionType();
  }
  
  pickPreference(itemselected) {
    this.transactionData.setReferrer('PickTransactionTypePage');
    this.transactionData.setTransactionType(itemselected.value);
    this.goBack();
  }

  goBack() {
    this.nav.pop();
  }
}