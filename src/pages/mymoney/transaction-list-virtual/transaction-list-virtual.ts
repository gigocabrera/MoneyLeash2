import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

// app pages
import { TransactionPage } from '../transaction/transaction';

// services
import { UserData } from '../../../providers/user-data';
import { TransactionData } from '../../../providers/transaction-data';

// models
import { Transaction, ITransaction } from '../../../models/transaction.model';

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
      let count: number = 0;

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

        rawList.push(tempTransaction);
        
        count++;

      });
      this.transactions = rawList;
      this.transactions.reverse();

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
    console.log('delete');
    console.log(transaction);
  }

  clearTransaction(transaction) {
    
    //Get the index position for this transaction
    let pos = this.transactions.findIndex(x => x.recordindex === transaction.recordindex);
    let index = transaction.recordindex;

    var clearedBal = parseFloat(transaction.clearedBal);
    var runningBal = parseFloat(transaction.runningbal);
    
    for (var i = this.transactions.length; i-- > 0; ) {
      if (i <= pos) {

        //this.handleClearedBalances(this.transactions[i], index, pos);
        //
        // Handle Balances
        //

        let thisTransaction = this.transactions[i];
        
        transaction.ClearedClass = '';
        if (transaction.iscleared === true) {
          transaction.ClearedClass = 'transactionIsCleared';
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
        }

      }

      console.log('Balance cleared: ' + clearedBal.toFixed(2));
      this.account.balancecleared = clearedBal.toFixed(2);

    }

  }

  handleClearedBalances(transaction, index, pos) {
    //
    // Handle Balances
    //
    var clearedBal = parseFloat(transaction.clearedBal);

    //console.log(pos, index, transaction.recordindex);
    //console.log(clearedBal);
    //console.log(transaction.iscleared);

    if (index === transaction.recordindex) {

      if (transaction.iscleared === true) {

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

      } else {

        console.log('here');

        if (transaction.type === "Income") {
          if (!isNaN(transaction.amount)) {
            clearedBal = clearedBal - parseFloat(transaction.amount);
          }
        } else if (transaction.type === "Expense") {
          if (!isNaN(transaction.amount)) {
            clearedBal = clearedBal + parseFloat(transaction.amount);
          }
        }
        transaction.clearedBal = clearedBal.toFixed(2);
      }

    } else {

      //console.log('just update cleared bal');
      //console.log(transaction);
      transaction.clearedBal = clearedBal;

    }

    console.log('Balance cleared: ' + clearedBal.toFixed(2));
    this.account.balancecleared = clearedBal.toFixed(2);

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