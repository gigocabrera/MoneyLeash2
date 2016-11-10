import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

// services
import {UserData} from '../../../providers/user-data';

@Component({
  selector: 'page-transaction-list',
  templateUrl: 'transaction-list.html'
})

export class TransactionsPage {

  title: string;
  navbarcolor: string;
  groupedAccounts = [];
  transactions = [];
  account: any;

  constructor(
      public nav: NavController,
      public navParams: NavParams,
      public userData: UserData) {

        this.navbarcolor = this.userData.colors.navbar;
        this.account = this.navParams.data.paramAccount;
        this.title = this.account.accountname;

      }

  ionViewDidLoad() {

    this.userData.getTransactionsByDate(this.account).on('value', (transactions) => {

      var that = this;
      this.groupedAccounts = [];
      let currenttype = false;
      let currentAccounts = [];
      let clearedBal = 0;
      let netWorth = 0;

      transactions.forEach( spanshot => {

        var transaction = spanshot.val();

        let tempTransaction = ({
          $key: spanshot.key,
          payee: transaction.payee,
          amount: transaction.amount,
          category: transaction.category,
          notes: transaction.notes,
          recurring: transaction.isrecurring,
          photo: transaction.isphoto,
          transfer: transaction.istransfer,
          clearedclass: transaction.ClearedClass,
          runningbal: transaction.runningbal,
          type: transaction.type,
          iscleared: transaction.iscleared,
          checked: ''
        });
        if (transaction.iscleared) {
          tempTransaction.checked = 'checked';
        }        

        that.transactions.push(tempTransaction);
      })

      this.transactions.reverse();
    });

  }

  newTransaction() {
    //this.nav.push(TransactionPage, {paramTransaction: 'New'});
  }

  edit(transaction) {
    console.log('edit');
    console.log(transaction);
  }

  delete(transaction) {
    console.log('delete');
    console.log(transaction);
  }

  clearTransaction(transaction) {
    console.log('clear');
    console.log(transaction);
  }
  
}