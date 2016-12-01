import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

// app pages
import { TransactionPage } from '../transaction/transaction';

// services
import { UserData } from '../../../providers/user-data';
import { TransactionData } from '../../../providers/transaction-data';

// models
import { Transaction } from '../../../models/transaction.model';

import * as moment from 'moment';

@Component({
  selector: 'page-transaction-list-virtual',
  templateUrl: 'transaction-list-virtual.html'
})

export class TransactionsVirtualPage {

  title: string;
  transactions = [];
  account: any;
  searchQuery: string = '';

  constructor(
      public nav: NavController,
      public navParams: NavParams,
      public userData: UserData,
      public transactionData: TransactionData) {

        this.account = this.navParams.data.paramAccount;
        this.title = this.account.accountname;

      }

  ionViewDidLoad() {

    this.userData.getAllTransactionsByDate(this.account).on('value', (transactions) => {

      let rawList= [];
      transactions.forEach( spanshot => {
        
        var transaction = spanshot.val();
        let tempTransaction = new Transaction(
          spanshot.key,
          transaction.ClearedClass,
          transaction.accountFrom,
          transaction.accountFromId,
          transaction.accountTo,
          transaction.accountToId,
          transaction.addedby,
          transaction.amount,
          transaction.category,
          transaction.categorid,
          transaction.clearedBal,
          transaction.date,
          transaction.iscleared,
          transaction.isphoto,
          transaction.isrecurring,
          transaction.istransfer,
          transaction.notes,
          transaction.payee,
          transaction.payeeid,
          transaction.photo,
          transaction.runningbal,
          transaction.type,
          transaction.typedisplay,
          '',
          ''
        );
        tempTransaction.date = moment(transaction.date).format('MMMM D, YYYY hh:mm a');

        rawList.push(tempTransaction);

      });
      this.transactions = rawList;
      this.transactions.reverse();

      // Disable loading controller when the promise is complete
      this.userData.dismissLoadingController();
    });

  }

  newTransaction() {
    let tempTransaction = new Transaction(null,null,null,null,null,null,null,null,null,null,null,null,false,false,false,false,null,null,null,null,null,null,null,"New",null);
    this.transactionData.setReferrer('TransactionsPage');
    this.nav.push(TransactionPage, {paramTransaction: tempTransaction});
  }

  edit(transaction) {
    this.transactionData.setReferrer('TransactionsPage');
    this.nav.push(TransactionPage, {paramTransaction: transaction});
  }

  delete(transaction) {
    console.log('delete');
    console.log(transaction);
  }

  clearTransaction(transaction) {
    console.log('clear');
    console.log(transaction);
  }

  myHeaderFn(transaction, recordIndex, records) {
    //
    // Add grouping functionality
    //
    let currentDate;
    let previousDay = '';
    let previousYear = '';
    let format = 'MMMM DD, YYYY';
    let groupValue = '';
    let todaysDate = new Date();
    let todayFlag = false;

    currentDate = moment(transaction.date).format(format);
    
    if (!previousDay || currentDate.getDate() !== previousDay || currentDate.getFullYear() !== previousYear) {
      var dividerId = moment(transaction.date).format(format);
      if (dividerId !== groupValue) {
        groupValue = dividerId;
        var tday = moment(todaysDate).format(format);
        if (tday === dividerId) {
            todayFlag = true;
        } else {
            todayFlag = false;
        }
        let newGroup = {
            label: groupValue,
            transactions: [],
            isToday: todayFlag
        };
        return dividerId;
      }
    }
    /*if (recordIndex % 20 === 0) {
      return 'Header ' + recordIndex;
    }*/
    return null;
  }
  
}