import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { FirebaseListObservable } from 'angularfire2';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// app pages
import { TransactionPage } from '../transaction/transaction';

// services
import { UserData } from '../../../providers/user-data';
import { TransactionData } from '../../../providers/transaction-data';

// models
import { IAccount } from '../../../models/account.model';
import { Transaction, ITransaction } from '../../../models/transaction.model';

import * as moment from 'moment';

@Component({
  selector: 'page-transaction-list',
  templateUrl: 'transaction-list.html'
})

export class TransactionsPage {

  title: string;
  trans: FirebaseListObservable<any>;
  account: IAccount;
  searchTerm: string = '';
  equalToSubject: Subject<any>;
  orderByChild: Subject<any>;

  constructor(
      public nav: NavController,
      public navParams: NavParams,
      public userData: UserData,
      public transactionData: TransactionData) {

        this.account = this.navParams.data.paramAccount;
        this.title = this.account.accountname;

      }

  ionViewDidLoad() {
    //this.trans = this.userData.getTransactionsByDate(this.account);

    this.equalToSubject = new BehaviorSubject(null);
    this.orderByChild = new BehaviorSubject('date');
    this.trans = this.userData.getFilteredTransactions(this.account, this.orderByChild, this.equalToSubject);
  }

  ionViewWillEnter() {

    let referrer = this.transactionData.getReferrer();
    switch (referrer) {
      case 'TransactionPage': {
        if (this.transactionData.ismodified) {
          this.userData.syncAccountData(this.account);
        }
        break;
      }
    }
  }

  search() {
    console.log('search here');
  }

  filterBy(size: string) {
    //this.orderByChild.next('payeelower');
    //this.equalToSubject.next('starbucks');
  }

  newTransaction() {
    let tempTransaction = new Transaction(null,null,null,null,null,null,null,null,null,null,null,null,null,null,false,false,false,false,null,null,null,null,null,null,null,"New",null,0,null);
    this.transactionData.setReferrer('TransactionsPage');
    this.transactionData.ismodified = false;
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
    this.trans.update(transaction.$key, { 'iscleared': transaction.iscleared, 'ClearedClass' : transaction.ClearedClass });
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

  getItems(searchbar) {
    var q = searchbar.srcElement.value;
    if (!q) {
      this.doFilterList(null);
    } else {
      this.doFilterList(q);
    }
  }

  doFilterList (q) {
    console.log(q);
    this.orderByChild.next('payeelower');
    this.equalToSubject.next(q);
  }
  
}