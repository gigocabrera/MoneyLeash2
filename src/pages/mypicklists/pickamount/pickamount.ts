import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

// services
import { UserData } from '../../../providers/user-data';
import { TransactionData } from '../../../providers/transaction-data';

@Component({
  selector: 'page-pickamount',
  templateUrl: 'pickamount.html'
})

export class PickAmountPage {
  
  transaction;
   
  constructor(
      public nav: NavController,
      public userData: UserData,
      public transactionData: TransactionData) {}

  ionViewDidLoad() {

  }

  selectPayee(payee) {
    this.transactionData.setReferrer('PickPayeePage');
    this.transactionData.setPayeeName(payee.payeename);
    this.transactionData.setPayeeID(payee.$key);
    this.goBack();
  }

  goBack() {
    this.nav.pop();
  }

}