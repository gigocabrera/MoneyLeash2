import { Component } from '@angular/core';

import { NavController, ModalController, NavParams } from 'ionic-angular';

// app pages
import { PickAccountTypePage } from '../../mypicklists/pickaccounttype/pickaccounttype';
import { PickAccountNamePage } from '../../mypicklists/pickaccountname/pickaccountname';

// services
import { AuthService } from '../../../providers/auth-service';
import { AccountData } from '../../../providers/account-data';

// models
import { IAccount } from '../../../models/account.model';

import * as moment from 'moment';

@Component({
  templateUrl: 'account.html'
})

export class AccountPage {

  validationMessage: string;
  showValidationMessage: boolean = false;
  hasDataAccountName: boolean = false;
  hasDataAccountType: boolean = false;
  title: string;
  listheader: string;
  account: IAccount;
  displaydate: string;

  constructor(
      public nav: NavController,
      public modalController: ModalController,
      public navParams: NavParams,
      public auth: AuthService,
      public accountData: AccountData) {

    this.account = this.navParams.data.paramAccount;
    if (this.account.mode === 'New') {
      this.title = 'Create Account';
      this.listheader = 'Enter Account Details';
      this.hasDataAccountName = false;
      this.hasDataAccountType = false;
    } else {
      this.title = 'Edit Account';
      this.listheader = 'Edit Account Details';
      this.hasDataAccountName = true;
      this.hasDataAccountType = true;

      // Format date
      this.displaydate = moment(this.account.dateopen).format();
    }
  }

  ionViewWillEnter() {
    let referrer = this.accountData.getReferrer();
    switch (referrer) {
      case 'AccountsPage': {
        this.accountData.reset();
        break;
      }
      case 'PickAccountNamePage': {
        // Account name
        this.account.accountname = this.accountData.getAccountName();
        if (this.account.accountname != '') {
          this.hasDataAccountName = true;
        }
        break;
      }
      case 'PickAccountTypePage': {
        // Account Type
        let item: any = this.accountData.getAccountType();
        if (item != '') {
          this.account.accounttype = item.name;
          this.hasDataAccountType = true;
        }
        break;
      }
    }
  }

  save() {

    // Format date
    let dt = moment(this.displaydate, moment.ISO_8601).valueOf();
    this.account.dateopen = dt
    
    if (this.account.mode === 'New') {
      this.auth.addAccount(this.account);
    } else {
      this.auth.updateAccount(this.account);
    }
    this.nav.pop();
  }

  pickAccountName() {
    this.showValidationMessage = false;
    this.nav.push(PickAccountNamePage);
  }

  pickAccountType() {
    if (!this.hasDataAccountName) {
      // Make sure the account name has been entered
      this.showValidationMessage = true;
      this.validationMessage = "Please enter account name";
      return;
    }
    this.nav.push(PickAccountTypePage);
  }
  
}