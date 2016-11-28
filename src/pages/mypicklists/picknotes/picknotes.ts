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
    this.msg = this.transactionData.getNotes();
  }

  goBack() {
    this.nav.pop();
  }

  save() {
    this.transactionData.setReferrer('PickNotesPage');
    this.transactionData.setNotes(this.msg);
    this.goBack();
  }

}