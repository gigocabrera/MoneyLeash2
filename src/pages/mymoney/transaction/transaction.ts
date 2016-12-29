import { Component } from '@angular/core';

import { NavController, ModalController, NavParams } from 'ionic-angular';

// app pages
import { PickTransactionTypePage } from '../../mypicklists/picktransactiontype/picktransactiontype';
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
import { ITransaction } from '../../../models/transaction.model';

import * as moment from 'moment';

@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html'
})

export class TransactionPage {

  validationMessage: string;
  showValidationMessage: boolean = false;
  hasDataTransactionType: boolean = false;
  hasDataPayee: boolean = false;
  hasDataCategory: boolean = false;
  hasDataAmount: boolean = false;
  hasDataDate: boolean = false;
  hasDataNotes: boolean = false;
  hasDataPhoto: boolean = false;
  title: string;
  transaction: ITransaction;
  account: IAccount;

  constructor(
      public nav: NavController,
      public modalController: ModalController,
      public navParams: NavParams,
      public userData: UserData,
      public transactionData: TransactionData) {

    this.transaction = this.navParams.data.paramTransaction;
    this.account = this.navParams.data.paramAccount;

    console.log(this.transaction);

    if (this.transaction.mode === 'New') {
      this.title = 'Create Transaction';
      this.hasDataTransactionType = false;
      this.hasDataPayee = false;
      this.hasDataCategory = false;
      this.hasDataAmount = false;
      this.hasDataDate = false;
      this.hasDataNotes = false;
      this.hasDataPhoto = false;
      this.transactionData.reset();
    } else {
      //this.title = 'Edit Transaction';
      this.title = this.transaction.payee;
      this.hasDataTransactionType = true;
      this.hasDataPayee = true;
      this.hasDataCategory = true;
      this.hasDataAmount = true;
      this.hasDataDate = true;
      this.hasDataNotes = true;
      this.hasDataPhoto = true;

      // Format date
      this.transaction.displaydate = moment(this.transaction.date).format();
      this.transaction.displaytime = moment(this.transaction.date).format();

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
        this.transaction.type = this.transactionData.getTransactionType();
        if (this.transaction.type != '') {
          this.hasDataTransactionType = true;
        }
        break;
      }
      case 'PickPayeePage': {
        // Payee
        this.transaction.payee = this.transactionData.getPayeeName();
        this.transaction.payeeid = this.transactionData.getPayeeID();
        if (this.transaction.payee != '') {
          this.hasDataPayee = true;
        }
        break;
      }
      case 'PickCategoryPage': {
        // Payee
        this.transaction.category = this.transactionData.getCategoryName();
        this.transaction.categoryid = this.transactionData.getCategoryID();
        if (this.transaction.category != '') {
          this.hasDataCategory = true;
        }
        break;
      }
      case 'PickAmountPage': {
        // Payee
        this.transaction.amount = this.transactionData.getAmount();
        if (this.transaction.amount != '') {
          this.hasDataAmount = true;
        }
        break;
      }
      case 'PickNotesPage': {
        // Payee
        this.transaction.notes = this.transactionData.getNotes();
        if (this.transaction.notes != '') {
          this.hasDataNotes = true;
        }
        break;
      }
      case 'PickPhotoPage': {
        // Payee
        this.transaction.notes = this.transactionData.getPhoto();
        if (this.transaction.photo != '') {
          this.hasDataPhoto = true;
        }
        break;
      }
    }
  }

  save() {

    // Format date
    let dt = moment(this.transaction.displaydate, moment.ISO_8601).valueOf();
    this.transaction.date = dt;
    this.transaction.mode = null;

    // Handle Who
    this.transaction.addedby = this.userData.user.fullname;

    if (this.transaction.mode === 'New') {
      this.userData.addTransaction(this.transaction, this.account);
    } else {
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