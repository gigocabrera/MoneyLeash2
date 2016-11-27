import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

// services
import { UserData } from '../../../providers/user-data';
import { TransactionData } from '../../../providers/transaction-data';

@Component({
  selector: 'page-picknotes',
  templateUrl: 'picknotes.html'
})

export class PickNotesPage {
  
  transaction;
  msg;
   
  constructor(
      public nav: NavController,
      public userData: UserData,
      public transactionData: TransactionData) {}

  ionViewDidLoad() {
    //let amtDisplay = this.transactionData.getNotes();
  }

  goBack() {
    this.nav.pop();
  }

  digitClicked(digit) {
    console.log(this.msg);
    /*this.transactionData.setReferrer('PickNotesPage');
    this.transactionData.setNotes('notes here');
    this.goBack();*/
  }

}