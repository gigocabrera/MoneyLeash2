import { Component } from '@angular/core';

import { NavController, ModalController, NavParams } from 'ionic-angular';

// app pages
import { PickTransactionTypePage } from '../../mypicklists/picktransactiontype/picktransactiontype';
import { PickAccountFromPage } from '../../mypicklists/pickaccountfrom/pickaccountfrom';
import { PickAccountToPage } from '../../mypicklists/pickaccountto/pickaccountto';
import { PickPayeePage } from '../../mypicklists/pickpayee/pickpayee';
import { PickCategoryPage } from '../../mypicklists/pickcategory/pickcategory';
import { PickAmountPage } from '../../mypicklists/pickamount/pickamount';
import { PickNotesPage } from '../../mypicklists/picknotes/picknotes';
import { PickPhotoPage } from '../../mypicklists/pickphoto/pickphoto';

// services
import { UserData } from '../../../providers/user-data';
import { TransactionData } from '../../../providers/transaction-data';

// models
import { IAccount } from '../../../models/account.model';
import { Transaction } from '../../../models/transaction.model';

import * as moment from 'moment';

@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html'
})

export class TransactionPage {

  validationMessage: string;
  showValidationMessage: boolean = false;
  hasDataTransactionType: boolean = false;
  hasDataAccountFrom: boolean = false;
  hasDataAccountTo: boolean = false;
  hasDataPayee: boolean = false;
  hasDataCategory: boolean = false;
  hasDataAmount: boolean = false;
  hasDataDate: boolean = false;
  hasDataNotes: boolean = false;
  hasDataPhoto: boolean = false;
  title: string;
  transaction: Transaction;
  account: IAccount;
  displaydate;
  displaytime;
  mode;

  constructor(
      public nav: NavController,
      public modalController: ModalController,
      public navParams: NavParams,
      public userData: UserData,
      public transactionData: TransactionData) {

    this.account = this.navParams.data.paramAccount;
    this.mode = this.navParams.data.paramMode;

    if (this.mode === 'New') {
      this.transaction = new Transaction();
      this.title = 'Create Transaction';
      this.hasDataTransactionType = false;
      this.hasDataAccountFrom = false;
      this.hasDataAccountTo = false;
      this.hasDataPayee = false;
      this.hasDataCategory = false;
      this.hasDataAmount = false;
      this.hasDataDate = false;
      this.hasDataNotes = false;
      this.hasDataPhoto = false;
      this.transactionData.reset();
    } else {
      this.transaction = new Transaction();
      this.transaction.fromData(this.navParams.data.paramTransaction);
      this.title = this.transaction.payee;
      this.hasDataTransactionType = true;
      this.hasDataAccountFrom = (this.transaction.accountFrom !== "") ? true : false;
      this.hasDataAccountTo = (this.transaction.accountTo !== "") ? true : false;
      this.hasDataPayee = true;
      this.hasDataCategory = true;
      this.hasDataAmount = true;
      this.hasDataDate = true;
      this.hasDataNotes = true;
      this.hasDataPhoto = true;

      // Format date
      let dtDB = this.transaction.date / 1000;
      this.displaydate = moment.unix(dtDB).format();
      this.displaytime = moment.unix(dtDB).format();

      // Determine typedisplay if missing: Income / Expense
      if (this.transaction.typedisplay === '') {
        this.transaction.typedisplay = this.transaction.type
      }

      // Prepare services
      this.transactionData.setTransactionType(this.transaction.type);
      this.transactionData.setPayeeName(this.transaction.payee);
      this.transactionData.setPayeeID(this.transaction.payeeid);
      this.transactionData.setCategoryName(this.transaction.category);
      this.transactionData.setCategoryID(this.transaction.categoryid);
      this.transactionData.setAmount(this.transaction.amount);
      this.transactionData.setNotes(this.transaction.notes);
    }
  }

  ionViewWillEnter() {

    let referrer = this.transactionData.getReferrer();
    switch (referrer) {
      case 'TransactionsPage': {
        break;
      }
      case 'PickTransactionTypePage': {
        // Transaction Type
        this.transaction.typedisplay = this.transactionData.getTransactionType();
        this.transaction.istransfer = (this.transaction.typedisplay === "Transfer") ? true : false;
        this.hasDataTransactionType = (this.transaction.typedisplay !== "") ? true : false;
        break;
      }
      case 'PickAccountFromPage': {
        // Account to transfer from
        this.transaction.accountFrom = this.transactionData.getAccountFrom();
        this.transaction.accountFromId = this.transactionData.getAccountFromId();
        this.hasDataAccountFrom = (this.transaction.accountFrom !== "") ? true : false;
        break;
      }
      case 'PickAccountToPage': {
        // Account to transfer to
        this.transaction.accountTo = this.transactionData.getAccountTo();
        this.transaction.accountToId = this.transactionData.getAccountToId();
        this.hasDataAccountTo = (this.transaction.accountTo !== "") ? true : false;
        break;
      }
      case 'PickPayeePage': {
        // Payee
        this.transaction.payee = this.transactionData.getPayeeName();
        this.transaction.payeeid = this.transactionData.getPayeeID();
        this.hasDataPayee = (this.transaction.payee !== "") ? true : false;
        break;
      }
      case 'PickCategoryPage': {
        // Payee
        this.transaction.category = this.transactionData.getCategoryName();
        this.transaction.categoryid = this.transactionData.getCategoryID();
        this.hasDataCategory = (this.transaction.category !== "") ? true : false;
        break;
      }
      case 'PickAmountPage': {
        // Payee
        this.transaction.amount = this.transactionData.getAmount();
        this.hasDataAmount = (this.transaction.amount !== "") ? true : false;
        break;
      }
      case 'PickNotesPage': {
        // Payee
        this.transaction.notes = this.transactionData.getNotes();
        if (this.transaction.notes !== '') {
          this.hasDataNotes = true;
        }
        break;
      }
      case 'PickPhotoPage': {
        // Payee
        this.transaction.notes = this.transactionData.getPhoto();
        this.hasDataPhoto = (this.transaction.photo !== "") ? true : false;
        break;
      }
    }
  }

  save() {

    // Validate form data
    if (this.transaction.typedisplay === 'undefined' || this.transaction.typedisplay === '') {
      this.showValidationMessage = true;
      this.validationMessage = "Please select Transaction Type"
      return;
    }
    if (this.transaction.category === 'undefined' || this.transaction.category === '') {
      this.showValidationMessage = false;
      this.validationMessage = "Please select a Category"
      return;
    }
    if (this.transaction.payee === 'undefined' || this.transaction.payee === '') {
      this.showValidationMessage = false;
      this.validationMessage = "Please select a Payee"
      return;
    }
    if (this.transaction.amount === 'undefined' || this.transaction.amount === '') {
      this.showValidationMessage = false;
      this.validationMessage = "Please enter an amount for this transaction"
      return;
    }

    // Format date and time in epoch time
    let dtDateISO = moment(this.displaydate, moment.ISO_8601);
    let dtHour;
    let dtMinutes;
    if (this.mode === 'New') {
      dtHour = moment(this.displaytime, 'HH:mm').format("HH");
      dtMinutes = moment(this.displaytime, 'HH:mm').format("mm");
    } else {
      dtHour = moment(this.displaytime, moment.ISO_8601).format("HH");
      dtMinutes = moment(this.displaytime, moment.ISO_8601).format("mm");
    }
    let iHour = parseInt(dtHour);
    let iMinute = parseInt(dtMinutes);
    let dt = dtDateISO.hour(iHour).minutes(iMinute);
    let dtTran = moment(dt, 'MMMM D, YYYY hh:mm a').valueOf();
    this.transaction.date = dtTran;
    
    //console.log(this.displaydate);
    //console.log(this.displaytime);
    //console.log(dtDateISO);
    //console.log(dtHour, dtMinutes);
    //console.log(dtTran);

    // Handle Who
    this.transaction.addedby = this.userData.user.nickname;

    //
    // Handle transaction type for Transfers
    //
    if (this.transaction.typedisplay === "Transfer" && this.account.$key === this.transaction.accountToId) {
      this.transaction.type = 'Income';
      this.transaction.istransfer = true;
    } else if (this.transaction.typedisplay === "Transfer" && this.account.$key !== this.transaction.accountToId) {
      this.transaction.type = 'Expense';
      this.transaction.istransfer = true;
    } else {
      this.transaction.accountFrom = '';
      this.transaction.accountFromId = '';
      this.transaction.accountTo = '';
      this.transaction.accountToId = '';
      this.transaction.type = this.transaction.typedisplay;
      this.transaction.istransfer = false;
    }

    if (this.mode === 'New') {
      //
      // Create New Transaction
      //
      this.userData.addTransaction(this.transaction, this.account);
    } else {
      //
      // Update Existing Transaction
      //
      this.userData.updateTransaction(this.transaction, this.account);
    }
    this.transactionData.setReferrer('TransactionPage');
    this.transactionData.ismodified = true;
    this.nav.pop();
  }

  pickTransactionType() {
    this.showValidationMessage = false;
    this.nav.push(PickTransactionTypePage);
  }

  pickTransactionAccountFrom() {
    this.showValidationMessage = false;
    this.nav.push(PickAccountFromPage);
  }

  pickTransactionAccountTo() {
    this.showValidationMessage = false;
    this.nav.push(PickAccountToPage);
  }

  pickPayee() {
    if (!this.hasDataTransactionType) {
      // Make sure a transaction type has been selected
      this.showValidationMessage = true;
      this.validationMessage = "Please select Transaction Type";
      return;
    }
    this.userData.LoadingControllerShow();
    this.nav.push(PickPayeePage);
  }

  pickCategory() {
    if (!this.hasDataTransactionType) {
      // Make sure a transaction type has been selected
      this.showValidationMessage = true;
      this.validationMessage = "Please select Transaction Type";
      return;
    }
    this.userData.LoadingControllerShow();
    this.nav.push(PickCategoryPage);
  }
  
  pickAmount() {
    if (!this.hasDataTransactionType) {
      // Make sure a transaction type has been selected
      this.showValidationMessage = true;
      this.validationMessage = "Please select Transaction Type";
      return;
    }
    this.nav.push(PickAmountPage);
  }

  pickNotes() {
    if (!this.hasDataTransactionType) {
      // Make sure a transaction type has been selected
      this.showValidationMessage = true;
      this.validationMessage = "Please select Transaction Type";
      return;
    }
    this.nav.push(PickNotesPage);
  }

  pickPhoto() {
    if (!this.hasDataTransactionType) {
      // Make sure a transaction type has been selected
      this.showValidationMessage = true;
      this.validationMessage = "Please select Transaction Type";
      return;
    }
    this.nav.push(PickPhotoPage);
  }
}