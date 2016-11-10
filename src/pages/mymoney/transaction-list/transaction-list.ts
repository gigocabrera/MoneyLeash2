import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

// services
import {UserData} from '../../../providers/user-data';

import * as moment from 'moment';

@Component({
  selector: 'page-transaction-list',
  templateUrl: 'transaction-list.html'
})

export class TransactionsPage {

  title: string;
  navbarcolor: string;
  groupedTransactions = [];
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
        //
        // Add grouping functionality
        //
        currentDate = new Date(transaction.date);
        if (!previousDay || currentDate.getDate() !== previousDay || currentDate.getFullYear() !== previousYear) {
          var dividerId = moment(transaction.date).format(format);
          if (dividerId !== groupValue) {
            groupValue = dividerId;
            var tday = moment(todaysDate).format(format);
            //console.log("tday: " + tday + ", " + dividerId);
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
            //console.log(newGroup);
          }
        }
        currentTransactions.push(tempTransaction);
        previousDay = currentDate.getDate();
        previousYear = currentDate.getFullYear();
        
        /*//
        // Handle Running Balance
        //
        total++;
        transaction.ClearedClass = '';
        if (transaction.iscleared === true) {
            transaction.ClearedClass = 'transactionIsCleared';
            cleared++;
            if (transaction.type === "Income") {
                if (!isNaN(transaction.amount)) {
                    clearedBal = clearedBal + parseFloat(transaction.amount);
                }
            } else if (transaction.type === "Expense") {
                if (!isNaN(transaction.amount)) {
                    clearedBal = clearedBal - parseFloat(transaction.amount);
                }
            }
            transaction.clearedBal = clearedBal.toFixed(2);
        }
        if (transaction.type === "Income") {
            if (!isNaN(transaction.amount)) {
                runningBal = runningBal + parseFloat(transaction.amount);
                transaction.runningbal = runningBal.toFixed(2);
            }
        } else if (transaction.type === "Expense") {
            if (!isNaN(transaction.amount)) {
                runningBal = runningBal - parseFloat(transaction.amount);
                transaction.runningbal = runningBal.toFixed(2);
            }
        }*/
        
      })

      that.groupedTransactions.reverse();

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