import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { FirebaseListObservable } from 'angularfire2';

// app pages
import { TransactionPage } from '../transaction/transaction';

// services
import { UserData } from '../../../providers/user-data';
import { TransactionData } from '../../../providers/transaction-data';

// models
import { IAccount } from '../../../models/account.model';
import { Transaction, ITransaction } from '../../../models/transaction.model';

import * as moment from 'moment';
import "rxjs/add/operator/map";

@Component({
  selector: 'page-transaction-list',
  templateUrl: 'transaction-list.html'
})

export class TransactionsPage {

  title: string;
  trans: FirebaseListObservable<any>;
  account: IAccount;
  searchTerm: string = '';

  constructor(
      public nav: NavController,
      public navParams: NavParams,
      public userData: UserData,
      public transactionData: TransactionData) {

        this.account = this.navParams.data.paramAccount;
        this.title = this.account.accountname;

      }

  ionViewDidLoad() {
    this.trans = this.userData.getTransactionsByDate(this.account);
  }

  newTransaction() {
    let tempTransaction = new Transaction(null,null,null,null,null,null,null,null,null,null,null,null,null,null,false,false,false,false,null,null,null,null,null,null,null,"New",null,0,null);
    this.transactionData.setReferrer('TransactionsPage');
    this.nav.push(TransactionPage, {paramTransaction: tempTransaction, paramAccount: this.account});
  }

  edit(transaction) { 
    transaction.mode = 'Edit';
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

    let format = 'MMMM DD, YYYY';
    let thisTransDate = moment(transaction.date).format(format);

    // Get previous transaction
    let prevTransaction: ITransaction = transactions[recordIndex - 1];
    if (prevTransaction === undefined) {
      return thisTransDate;
    }

    // Get date for previous transaction
    let prevTransDate = moment(prevTransaction.date).format(format);

    // Compare dates between this transaction and the previous transaction
    if (prevTransDate === thisTransDate) {
      return null;
    } else {
      // If dates are different, add header and supress bottom border
      prevTransaction.ionitemclass = "1";
      return thisTransDate;
    }

  }

  initializeItems(){
    //this.trans = this.transactions;
  }

  getItems(searchbar) {
    
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;

    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.doFilterList(q);
  }

  doFilterList (q) {
    //this.trans = this.userData.getFilteredTransactions(this.account, '');
  }
  
}