import { Component } from '@angular/core';

import { NavController, ModalController, NavParams } from 'ionic-angular';

// app pages
import { PickTransactionTypePage } from '../../mypicklists/picktransactiontype/picktransactiontype';
import { PickPayeePage } from '../../mypicklists/pickpayee/pickpayee';
import { PickCategoryPage } from '../../mypicklists/pickcategory/pickcategory';

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
      this.hasDataNotes = false;
      this.hasDataPhoto = false;      
    } else {
      this.title = 'Edit Transaction';
      this.hasDataTransactionType = true;
      this.hasDataPayee = true;
      this.hasDataCategory = true;
      this.hasDataAmount = true;
      this.hasDataNotes = true;
      this.hasDataPhoto = true;
    }
  }

  ionViewWillEnter() {

    let referrer = this.transactionData.getReferrer();
    switch (referrer) {
      case 'TransactionsPage':
        this.transactionData.reset();
        break;
      case 'PickTransactionTypePage':
        // Transaction Type
        this.transaction.type = this.transactionData.getTransactionType();
        if (this.transaction.type != '') {
          this.hasDataTransactionType = true;
        }
        break;
      case 'PickPayeePage':
        // Payee
        this.transaction.payee = this.transactionData.getPayeeName();
        this.transaction.payeeid = this.transactionData.getPayeeID();
        if (this.transaction.payee != '') {
          this.hasDataPayee = true;
        }
    }

  }

  save(account) {
    if (this.transaction.mode === 'New') {
      this.userData.addAccount(account);
    } else {
      this.userData.updateAccount(account);
    }
    this.nav.pop();
  }

  pickTransactionType() {
    this.nav.push(PickTransactionTypePage);
  }

  pickPayee() {
    if (!this.hasDataTransactionType) {
      // Make sure a transaction type has been selected
      this.showValidationMessage = true;
      this.validationMessage = "Please select Transaction Type";
      return;
    }
    this.nav.push(PickPayeePage);
  }

  pickCategory() {
    if (!this.hasDataTransactionType) {
      // Make sure a transaction type has been selected
      this.showValidationMessage = true;
      this.validationMessage = "Please select Transaction Type";
      return;
    }
    this.nav.push(PickCategoryPage);
  }
  
}