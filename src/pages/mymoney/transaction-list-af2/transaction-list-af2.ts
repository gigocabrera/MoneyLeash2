import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

// app pages
import { TransactionPage } from '../transaction/transaction';

// services
import { UserData } from '../../../providers/user-data';
import { TransactionData } from '../../../providers/transaction-data';

// models
import { Account, IAccount } from '../../../models/account.model';
import { Transaction, ITransaction } from '../../../models/transaction.model';

import * as moment from 'moment';
import "rxjs/add/operator/map";

@Component({
  selector: 'page-transaction-list-af2',
  templateUrl: 'transaction-list-af2.html'
})

export class TransactionsAF2Page {

  title: string;
  transactions = [];
  trans: FirebaseListObservable<any>;
  //account: FirebaseObjectObservable<any>;
  account: IAccount;
  searchQuery: string = '';

  constructor(
      public nav: NavController,
      public navParams: NavParams,
      public userData: UserData,
      public transactionData: TransactionData) {

        //this.account = this.userData.getAccountAF2(this.navParams.data.paramAccount)
        this.account = this.navParams.data.paramAccount;
        this.title = this.account.accountname;

      }

  ionViewDidLoad() {

    this.trans = this.userData.getTransactionsByDateAF2(this.account);
    //this.userData.syncAccountData(this.account);
    //this.userData.LoadingControllerDismiss();

  }

  newTransaction() {
    let tempTransaction = new Transaction(null,null,null,null,null,null,null,null,null,null,null,null,null,null,false,false,false,false,null,null,null,null,null,null,null,"New",null,0,null);
    this.transactionData.setReferrer('TransactionsPage');
    this.nav.push(TransactionPage, {paramTransaction: tempTransaction, paramAccount: this.account});
  }

  edit(transaction) {
    
    let pos = this.transactions.findIndex(x => x.recordindex === transaction.recordindex);
    console.log(pos);

    let prevTransaction = this.transactions[pos + 1];
    console.log(transaction);
    console.log(prevTransaction);
    
    this.transactionData.setReferrer('TransactionsPage');
    this.nav.push(TransactionPage, { paramTransaction: transaction, paramAccount: this.account });
  }

  delete(transaction) {
    
  }

  clearTransaction(transaction) {
    
    if (transaction.iscleared) {
      transaction.ClearedClass = 'transactionIsCleared';
    } else {
      transaction.ClearedClass = '';
    }
    this.trans.update(transaction.$key, { 'iscleared': transaction.iscleared });
    this.userData.syncAccountData(this.account);

  }

  myHeaderFn(transaction: ITransaction, recordIndex, transactions) {

    let prevTransaction: ITransaction;
    let prevTransDate;
    let thisTransDate;
    let format = 'MMMM DD, YYYY';

    thisTransDate = moment(transaction.date).format(format);

    // Get previous transaction
    prevTransaction = transactions[recordIndex - 1];

    if (prevTransaction === undefined) {
      return thisTransDate;
    }

    // Compate dates between this transaction and the previous transaction
    prevTransDate = moment(prevTransaction.date).format(format);

    if (prevTransDate === thisTransDate) {
      return null;
    } else {
      // If dates are different, add header
      return thisTransDate;
    }

  }
  
}