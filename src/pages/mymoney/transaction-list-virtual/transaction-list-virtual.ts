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

        //testing
        tempTransaction.ionitemclass = "1";

        rawList.push(tempTransaction);
        
        count++;

      });
      this.transactions = rawList;
      this.transactions.reverse();

      // Disable loading controller when the promise is complete
      this.userData.dismissLoadingController();
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
    
    let pos = this.transactions.findIndex(x => x.recordindex === transaction.recordindex);
    
    console.log(pos);

    for (var i = this.transactions.length; i-- > 0; ) {
      if (i <= pos) {
        console.log(this.transactions[i]);
      }
    }
  }

  myHeaderFn(transaction: ITransaction, recordIndex, transactions) {

    let prevTransaction: ITransaction;
    let prevTransDate;
    let thisTransDate;

    prevTransaction = transactions[recordIndex - 1];
    thisTransDate = transaction.displaydate;

    if (prevTransaction === undefined) {
      return thisTransDate;
    }

    prevTransDate = prevTransaction.displaydate;
    if (prevTransDate === thisTransDate) {
      return null;
    } else {
      return thisTransDate;
    }

  }
  
}