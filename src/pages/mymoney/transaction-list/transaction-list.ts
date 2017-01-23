import { Component } from '@angular/core';

import { NavController, NavParams, AlertController, ItemSliding } from 'ionic-angular';

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
  balancetoday: string = '';
  balancerunning: string = '';
  balancecleared: string = '';

  startTime;
  elapsedTime;

  constructor(
      public nav: NavController,
      public navParams: NavParams,
      public alertController: AlertController,
      public userData: UserData,
      public transactionData: TransactionData) {

        this.account = this.navParams.data.paramAccount;
        this.title = this.account.accountname;

      }

  ionViewDidLoad() {

    this.startTime = Date.now();
    this.equalToSubject = new BehaviorSubject(null);
    this.orderByChild = new BehaviorSubject('date');
    this.trans = this.userData.getFilteredTransactions(this.account, this.orderByChild, this.equalToSubject);
    this.trans.first().subscribe(snapshots => {
      this.userData.syncAccountBalances(this.account);
      this.userData.LoadingControllerDismiss();
      this.elapsedTime = Date.now() - this.startTime;
      //console.log(this.elapsedTime);
    });
  }

  ionViewWillEnter() {
    let referrer = this.transactionData.getReferrer();
    switch (referrer) {
      case 'TransactionPage': {
        if (this.transactionData.ismodified) {
          this.userData.syncAccountBalances(this.account);
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
    this.transactionData.setReferrer('TransactionsPage');
    this.transactionData.ismodified = false;
    this.nav.push(TransactionPage, {paramTransaction: '', paramAccount: this.account, paramMode: 'New'});
  }

  edit(transaction) { 
    this.transactionData.setReferrer('TransactionsPage');
    this.nav.push(TransactionPage, { paramTransaction: transaction, paramAccount: this.account, paramMode: 'Edit' });
  }

  delete(transaction, slidingItem: ItemSliding) {
    let alert = this.alertController.create({
      title: 'Please Confirm',
      message: 'Are you sure you want to delete this transaction?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            slidingItem.close();
          }
        },
        {
          text: 'Delete',
          cssClass: 'alertDanger',
          handler: () => {
            this.trans.remove(transaction.$key);
            this.userData.syncAccountBalances(this.account);
          }
        }
      ]
    });
    alert.present();
  }

  clearTransaction(transaction) {
    this.trans.update(transaction.$key, { 'iscleared': transaction.iscleared });
    this.userData.syncAccountBalances(this.account);
  }

  myHeaderFn(transaction, recordIndex, transactions) {

    let format = 'dddd, MMMM DD, YYYY';    
    let dtdb = transaction.date / 1000;
    let thismoment = moment.unix(dtdb);
    let thisTransDate = thismoment.format(format);

    // Get previous transaction
    let prevTransaction = transactions[recordIndex - 1];
    if (prevTransaction === undefined) {
      return thisTransDate;
    }

    // Get date for previous transaction
    let dtprev = prevTransaction.date / 1000;
    let prevmoment = moment.unix(dtprev);
    let prevTransDate = prevmoment.format(format);

    // Compare dates between this transaction and the previous transaction
    if (prevTransDate === thisTransDate) {
      return null;
    } else {
      // If dates are different, add header and supress bottom border
      //prevTransaction.ionitemclass = "1";
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