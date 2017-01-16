import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

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
  selector: 'page-transaction-list-virtual',
  templateUrl: 'transaction-list-virtual.html'
})

export class TransactionsVirtualPage {

  title: string;
  account: IAccount;
  searchQuery: string = '';

  transactions = [];
  transObjects: any;
  totalTransactions = 0;
  totalClearedTransactions = 0;
  runningBal: string = '';
  clearedBal: string = '';
  todayBal: string = '';

  startTime;
  elapsedTime;

  constructor(
      public nav: NavController,
      public navParams: NavParams,
      public userData: UserData,
      public transactionData: TransactionData) {

        this.account = this.navParams.data.paramAccount;
        this.title = this.account.accountname;
        this.loadTransaction();

      }
  
  loadTransaction() {

    this.startTime = Date.now();

    var ref = this.userData.housedata.child(this.userData.user.houseid + '/transactions/' + this.account.$key);
    var query = ref.orderByChild('date');

    query.on('value', (trans) => {

      this.transObjects = trans;
      
      trans.forEach(snapshot => {

        this.transactions.push(snapshot.val());

      })
      this.transactions.reverse();

      this.refresh();

      this.userData.LoadingControllerDismiss();
      
      this.elapsedTime = Date.now() - this.startTime;
      console.log(this.elapsedTime);

    });

    return false;
  }

  refresh() {

    let clearedBalance = 0;
    let runningBalance = 0;
    let todayBalance = 0;

    this.transObjects.forEach( snapshot => {
      var transaction = snapshot.val();
      //
      // Handle Balances
      //
      this.totalTransactions++;
      if (transaction.iscleared === true) {
        this.totalClearedTransactions++;
        if (transaction.type === "Income") {
          if (!isNaN(transaction.amount)) {
            clearedBalance += parseFloat(transaction.amount);
          }
        } else if (transaction.type === "Expense") {
          if (!isNaN(transaction.amount)) {
            clearedBalance -= parseFloat(transaction.amount);
          }
        }
        transaction.clearedBal = clearedBalance.toFixed(2);
      }
      if (transaction.type === "Income") {
        if (!isNaN(transaction.amount)) {
          runningBalance += parseFloat(transaction.amount);
          transaction.runningbal = runningBalance.toFixed(2);
        }
      } else if (transaction.type === "Expense") {
        if (!isNaN(transaction.amount)) {
          runningBalance -= parseFloat(transaction.amount);
          transaction.runningbal = runningBalance.toFixed(2);
        }
      }
      //
      // Get today's balance
      // 
      var tranDate = moment(transaction.date)
      var now = moment();
      if (tranDate <= now) {
        todayBalance = runningBalance;
      }

    });
    this.clearedBal = clearedBalance.toFixed(2);
    this.runningBal = runningBalance.toFixed(2);
    this.todayBal = todayBalance.toFixed(2);
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
    //transaction.update({ 'iscleared': transaction.iscleared });
    this.refresh();
  }

  clearTransaction_ORIG(transaction) {
    
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
    }
    
    for (var i = this.transactions.length; i-- > 0; ) {

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