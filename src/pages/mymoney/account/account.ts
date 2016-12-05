import { Component } from '@angular/core';

import { NavController, ModalController, NavParams } from 'ionic-angular';

// app pages
import { PickAccountTypePage } from '../../mypicklists/pickaccounttype/pickaccounttype';
import { PickAccountNamePage } from '../../mypicklists/pickaccountname/pickaccountname';

// services
import { UserData } from '../../../providers/user-data';
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

  constructor(
      public nav: NavController,
      public modalController: ModalController,
      public navParams: NavParams,
      public userData: UserData,
      public accountData: AccountData) {

    this.account = this.navParams.data.paramAccount;
    if (this.account.mode === 'New') {
      this.title = 'Create Account';
      this.listheader = 'Enter Account Details';
      this.hasDataAccountName = false;
      this.hasDataAccountType = false;
    } else {
      this.title = 'Edit Account';
      this.account.displaydateopen = moment(this.account.dateopen).format('MMMM D, YYYY');
      this.listheader = 'Edit Account Details';
      this.hasDataAccountName = true;
      this.hasDataAccountType = true;
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

  save(account) {

    // Format date
    console.log(account.dateopen);
    let dt = moment(account.dateopen, 'MMMM D, YYYY').valueOf();
    account.dateopen = dt;
    
    console.log(dt);
    
    /*if (this.account.mode === 'New') {
      this.userData.addAccount(account);
    } else {
      this.userData.updateAccount(account);
    }
    this.nav.pop();*/
  }

  pickAccountName() {
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