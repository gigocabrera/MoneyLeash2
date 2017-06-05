import { Component } from '@angular/core';

import { NavController, ModalController, NavParams } from 'ionic-angular';

import { AuthService } from '../../../providers/auth-service';

import { AccountData } from '../../../providers/account-data';

import { PickAccountTypePage } from '../../mypicklists/pickaccounttype/pickaccounttype';

import * as moment from 'moment';

@Component({
  templateUrl: 'account.html'
})

export class AccountPage {

  title: string;
  listheader: string;
  validationMessage: string;
  showValidationMessage: boolean = false;
  mode: string = '';
  key: string = '';
  displaydate: string;

  account: {
    BalanceClass: string, 
    accountname: string, 
    accounttype: string, 
    autoclear: string, 
    balancecleared: string, 
    balancecurrent: string, 
    balancetoday: string, 
    dateopen: number,
    totalclearedtransactions: string,
    totalpendingtransactions: string,
    totaltransactions: string
  } = {
    BalanceClass: '',
    accountname: '', 
    accounttype: '', 
    autoclear: '', 
    balancecleared: '', 
    balancecurrent: '', 
    balancetoday: '', 
    dateopen: 0,
    totalclearedtransactions: '',
    totalpendingtransactions: '',
    totaltransactions: ''
  }

  constructor(
      public nav: NavController,
      public modalController: ModalController,
      public navParams: NavParams,
      public auth: AuthService,
      public accountData: AccountData) {

    this.key = navParams.get('key');

    if (this.key === '0') {
      this.title = 'Create Account';
      this.listheader = 'Enter Account Details';
      this.accountData.reset();
      this.mode = 'New';
    } else {
      this.title = 'Edit Account';
      this.listheader = 'Edit Account Details';
      this.auth.getAccount(this.key).once('value').then(snapshot => {
        this.account = snapshot.val();
        this.title = 'Edit ' + ' ' + this.account.accountname;
        this.displaydate = moment(this.account.dateopen).format();
        this.mode = 'Edit';
      });
    }
  }

  ionViewWillEnter() {
    let referrer = this.accountData.getReferrer();
    switch (referrer) {
      case 'AccountsPage': {
        this.accountData.reset();
        break;
      }
      case 'PickAccountTypePage': {
        // Account Type
        let item: any = this.accountData.getAccountType();
        if (item != '') {
          this.account.accounttype = item.name;
        }
        break;
      }
    }
  }

  save() {

    // Validate form before saving
    if (!this.isValidName()) {
      return;
    }
    if (!this.isValidDate()) {
      return;
    }
    if (!this.isValidType()) {
      return;
    }

    // Format date
    let dt = moment(this.displaydate, moment.ISO_8601).valueOf();
    this.account.dateopen = dt
    
    if (this.mode === 'New') {
      this.auth.addAccount(this.account);
    } else {
      this.auth.updateAccount(this.account, this.key);
    }
    this.nav.pop();
  }

  pickAccountType() {
    if (!this.isValidName()) {
      return;
    }
    this.nav.push(PickAccountTypePage);
  }

  isValidName(): boolean {
    if (this.account.accountname === '') {
      this.showValidationMessage = true;
      this.validationMessage = "Please enter an account name";
      return false;
    } else {
      this.showValidationMessage = false;
      this.validationMessage = '';
      return true;
    }
  }

  isValidDate(): boolean {
    if (this.displaydate === undefined) {
      this.showValidationMessage = true;
      this.validationMessage = "Please select a date";
      return false;
    } else {
      this.showValidationMessage = false;
      this.validationMessage = '';
      return true;
    }
  }

  isValidType(): boolean {
    if (this.account.accounttype === '') {
      this.showValidationMessage = true;
      this.validationMessage = "Please select an account type";
      return false;
    } else {
      this.showValidationMessage = false;
      this.validationMessage = '';
      return true;
    }
  }

  resetValidation() {
    this.showValidationMessage = false;
    this.validationMessage = '';
  }
  
}