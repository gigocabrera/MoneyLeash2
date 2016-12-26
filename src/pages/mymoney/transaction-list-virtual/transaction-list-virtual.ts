import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

// app pages
import { TransactionPage } from '../transaction/transaction';

// services
import { UserData } from '../../../providers/user-data';
import { TransactionData } from '../../../providers/transaction-data';

// models
import { Account, IAccount } from '../../../models/account.model';
import { Transaction, ITransaction } from '../../../models/transaction.model';

import * as moment from 'moment';

@Component({
  selector: 'page-transaction-list-virtual',
  templateUrl: 'transaction-list-virtual.html'
})

export class TransactionsVirtualPage {

  title: string;
  transactions = [];
  account: IAccount;
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
      let count: number = 0;
      let totalTransactions = 0;
      let totalClearedTransactions = 0;

      transactions.forEach( spanshot => {
        
        let transaction = spanshot.val();
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
          transaction.categoryid,
          transaction.clearedBal,
          transaction.date,
          transaction.displaydate,
          transaction.displaytime,
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
          '',
          count,
          transaction.ionitemclass
        );
        let dt = moment(parseInt(transaction.date)).format();
        tempTransaction.displaydate = moment(dt).format('MMMM D, YYYY');

        // Determine if there is a date change to apply CSS
        // Removes the bottom border for the last ion-item in the group
        // This is necessary due to the shortcomings on the virtualScroll not supporting ion-item-group
        if (count > 0) {
          let prevTransaction: ITransaction;
          let prevTransDate;
          let thisTransDate;

          // Get the date for the previous transaction
          prevTransaction = rawList[count - 1];
          prevTransDate = prevTransaction.displaydate;

          // Get the date for the current transaction
          thisTransDate = tempTransaction.displaydate;

          // Compare the dates. If there is a difference, flag the transaction property to apply CSS class
          if (prevTransDate === thisTransDate) {
            tempTransaction.ionitemclass = "";
          } else {
            tempTransaction.ionitemclass = "1";
          }

        }
        //
        // Track totals
        //
        totalTransactions++;
        if (transaction.iscleared === true) {
          totalClearedTransactions++;
        }

        rawList.push(tempTransaction);
        
        count++;

      });
      this.transactions = rawList;
      this.transactions.reverse();

      //
      // Update balances and totals
      //
      let pendingTransactions = totalTransactions - totalClearedTransactions;
      this.account.totaltransactions = totalTransactions.toString();
      this.account.totalclearedtransactions = totalClearedTransactions.toString();
      this.account.totalpendingtransactions = pendingTransactions.toString();
      this.userData.updateAccountWithTotals(this.account);

      // Disable loading controller when the promise is complete
      this.userData.LoadingControllerDismiss();
    });

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
    
    //this.transactionData.setReferrer('TransactionsPage');
    //this.nav.push(TransactionPage, {paramTransaction: transaction, paramAccount: this.account});
  }

  delete(transaction) {
    
  }

  clearTransaction(transaction) {
    
    var clearedbal = 0;
    var runningbal = 0;

    //Get the index position for this transaction
    let pos = this.transactions.findIndex(x => x.recordindex === transaction.recordindex);

    // Get previous transaction
    let prevTransaction: ITransaction;
    prevTransaction = this.transactions[pos + 1];

    // Get the cleared and running balance from previous transaction
    if (prevTransaction != undefined) {
      clearedbal = parseFloat(prevTransaction.clearedBal);
      runningbal = parseFloat(prevTransaction.runningbal);
      //console.log(clearedbal,runningbal);
    }
    
    for (var i = this.transactions.length; i-- > 0; ) {

      console.log(i, pos);

      if (i <= pos) {
        //
        // Handle Balances
        //
        let thisTransaction: ITransaction = this.transactions[i];
        thisTransaction.ClearedClass = '';
        if (thisTransaction.iscleared === true) {
          thisTransaction.ClearedClass = 'transactionIsCleared';
          if (thisTransaction.type === "Income") {
            if (!isNaN(parseFloat(thisTransaction.amount))) {
              clearedbal = clearedbal + parseFloat(thisTransaction.amount);
            }
          } else if (thisTransaction.type === "Expense") {
            if (!isNaN(parseFloat(thisTransaction.amount))) {
              clearedbal = clearedbal - parseFloat(thisTransaction.amount);
            }
          }
          thisTransaction.clearedBal = clearedbal.toFixed(2);
        } else {
          thisTransaction.ClearedClass = '';
          thisTransaction.clearedBal = clearedbal.toFixed(2);
        }
        if (thisTransaction.type === "Income") {
          if (!isNaN(parseFloat(thisTransaction.amount))) {
            runningbal = runningbal + parseFloat(thisTransaction.amount);
            thisTransaction.runningbal = runningbal.toFixed(2);
          }
        } else if (thisTransaction.type === "Expense") {
          if (!isNaN(parseFloat(thisTransaction.amount))) {
            runningbal = runningbal - parseFloat(thisTransaction.amount);
            thisTransaction.runningbal = runningbal.toFixed(2);
          }
        }
        //
        // Update running and cleared balances for this transaction
        //
        this.userData.updateTransactionAndBalances(this.account, thisTransaction);
        //console.log(thisTransaction);
      }
    }
    //
    // Update balances and totals
    //
    this.account.balancecleared = clearedbal.toFixed(2);
    //console.log(this.account);
    this.userData.updateAccountWithTotals(this.account);
  }

  myHeaderFn(transaction: ITransaction, recordIndex, transactions) {

    let prevTransaction: ITransaction;
    let prevTransDate;
    let thisTransDate;

    // Get this transaction's date
    thisTransDate = transaction.displaydate;

    // Get previous transaction
    prevTransaction = transactions[recordIndex - 1];

    if (prevTransaction === undefined) {
      return thisTransDate;
    }

    // Compate dates between this transaction and the previous transaction
    prevTransDate = prevTransaction.displaydate;
    if (prevTransDate === thisTransDate) {
      return null;
    } else {
      // If dates are different, add header
      return thisTransDate;
    }

  }
  
}