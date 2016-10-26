import { Component } from '@angular/core';

import { NavController, ModalController, NavParams } from 'ionic-angular';

// app pages
//import { PickAccountTypePage } from '../../mypicklists/pickaccounttype/pickaccounttype';

// services
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html'
})

export class TransactionPage {

  title: string;
  listheader: string;
  account: {accname?: string, date?: string, type?: string} = {};
  item: any;

  constructor(
      public nav: NavController,
      public modalController: ModalController,
      public navParams: NavParams,
      public userData: UserData) {

      this.item = this.navParams.data.paramAccount;
        if (this.item === 'New') {
          this.title = 'New Transaction';
          this.listheader = 'Enter Transaction Details';
        } else {
          this.title = 'Edit Transaction';
          this.listheader = 'Edit Transaction Details';
        }
      }

  save(transaction) {
    //this.userData.addAccount(transaction);
    //this.nav.pop();
  }

  pickTransactionType() {

  }
  
}