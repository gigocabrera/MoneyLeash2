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
  selector: 'page-transaction-list',
  templateUrl: 'transaction-list.html'
})

export class TransactionsPage {

  title: string;
  groupedTransactions = [];
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

    this.userData.getTransactionsByDate(this.account).on('value', (transactions) => {

      let that = this;
      this.groupedTransactions = [];
      let currentTransactions = [];
      let currentDate;
      let previousDay = '';
      let previousYear = '';
      let format = 'MMMM DD, YYYY';
      let groupValue = '';
      let todaysDate = new Date();
      let todayFlag = false;

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

        if (transaction.iscleared) {
          tempTransaction.checked = 'checked';
        }
        //
        // Add grouping functionality
        //
        currentDate = new Date(transaction.date);
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
            currentTransactions.reverse();
            currentTransactions = newGroup.transactions;
            that.groupedTransactions.push(newGroup);
          }
        }
        currentTransactions.push(tempTransaction);
        previousDay = currentDate.getDate();
        previousYear = currentDate.getFullYear();
      })
      that.groupedTransactions.reverse();

      // Disable loading controller when the promise is complete
      this.userData.dismissLoadingController();
    });

  }

  getTransactions(ev: any) {
    // Reset items back to all of the items
    //this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.groupedTransactions = this.groupedTransactions.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
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
  
}