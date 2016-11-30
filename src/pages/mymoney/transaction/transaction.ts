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
import { ITransaction } from '../../../models/transaction.model';

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

  constructor(
      public nav: NavController,
      public modalController: ModalController,
      public navParams: NavParams,
      public userData: UserData,
      public transactionData: TransactionData) {

    this.transaction = this.navParams.data.paramTransaction;
    if (this.transaction.mode === 'New') {
      this.title = 'Create Transaction';
      this.hasDataTransactionType = false;
      this.hasDataPayee = false;
      this.hasDataCategory = false;
      this.hasDataAmount = false;
      this.hasDataDate = false;
      this.hasDataNotes = false;
      this.hasDataPhoto = false;      
    } else {
      this.title = 'Edit Transaction';
      this.hasDataTransactionType = true;
      this.hasDataPayee = true;
      this.hasDataCategory = true;
      this.hasDataAmount = true;
      this.hasDataDate = true;
      this.hasDataNotes = true;
      this.hasDataPhoto = true;
    }
  }

  ionViewWillEnter() {

    let referrer = this.transactionData.getReferrer();
    switch (referrer) {
      case 'TransactionsPage': {
        this.transactionData.reset();
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
    if (this.transaction.mode === 'New') {
      //this.userData.addAccount(account);
      console.log('new');
    } else {
      //this.userData.updateAccount(account);
      console.log('old');
    }
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
    this.userData.showLoadingController();
    this.nav.push(PickPayeePage);
  }

  pickCategory() {
    if (!this.hasDataTransactionType) {
      // Make sure a transaction type has been selected
      this.showValidationMessage = true;
      this.validationMessage = "Please select Transaction Type";
      return;
    }
    this.userData.showLoadingController();
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