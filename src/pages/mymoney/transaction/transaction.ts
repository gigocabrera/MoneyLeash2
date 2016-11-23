import { Component } from '@angular/core';

import { NavController, ModalController, NavParams } from 'ionic-angular';

// app pages
import { PickTransactionTypePage } from '../../mypicklists/picktransactiontype/picktransactiontype';
import { PickPayeePage } from '../../mypicklists/pickpayee/pickpayee';
import { PickCategoryPage } from '../../mypicklists/pickcategory/pickcategory';

// services
import { UserData } from '../../../providers/user-data';

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
  hasDataCategory: boolean
  title: string;
  transaction: ITransaction;

  constructor(
      public nav: NavController,
      public modalController: ModalController,
      public navParams: NavParams,
      public userData: UserData) {

    this.transaction = this.navParams.data.paramTransaction;
    if (this.transaction.mode === 'New') {
      this.title = 'Create Transaction';
      this.hasDataTransactionType = false;
      this.hasDataPayee = false;
    } else {
      this.title = 'Edit Transaction';
      this.hasDataTransactionType = true;
      this.hasDataPayee = true;
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

  // Transaction type
  //------------------------------------------
  pickTransactionType() {
    let modal = this.modalController.create(PickTransactionTypePage, {paramTransactionType: this.transaction.type});
    modal.present(modal);
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.onPickAccountType(data);
      }
    });
  }

  onPickAccountType(item) {
    this.transaction.type = item.value;
    this.hasDataTransactionType = true;
    this.showValidationMessage = false;
  }

  // Payee
  //------------------------------------------
  pickPayee() {
    
    // Make sure a transaction type has been selected
    if (!this.hasDataTransactionType) {
      this.showValidationMessage = true;
      this.validationMessage = "Please select Transaction Type";
      return;
    }

    let modal = this.modalController.create(PickPayeePage);
    modal.present(modal);
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.onPickPayee(data);
      }
    });
  }

  onPickPayee(item) {
    this.transaction.payee = item.value;
    this.hasDataPayee = true;
  }

  // Category
  //------------------------------------------
  pickCategory() {
    
    // Make sure a transaction type has been selected
    if (!this.hasDataTransactionType) {
      this.showValidationMessage = true;
      this.validationMessage = "Please select Transaction Type";
      return;
    }

    let modal = this.modalController.create(PickCategoryPage);
    modal.present(modal);
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.onPickCategory(data);
      }
    });
  }

  onPickCategory(item) {
    this.transaction.category = item.value;
    this.hasDataCategory = true;
  }
  
}