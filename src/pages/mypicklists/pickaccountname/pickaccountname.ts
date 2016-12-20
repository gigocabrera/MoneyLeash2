import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

// services
import { AccountData } from '../../../providers/account-data';

@Component({
  templateUrl: 'pickaccountname.html'
})

export class PickAccountNamePage {
  
  accountname;
  validationMessage: string;
  showValidationMessage: boolean = false;
   
  constructor(
      public nav: NavController,
      public accountData: AccountData) {}

  ionViewDidLoad() {
    this.accountname = this.accountData.accountname;
  }

  pickPreference() {
    console.log(this.accountname);
    if (this.accountname === '' || this.accountname === undefined) {
      // Make sure an account name has been entered
      this.showValidationMessage = true;
      this.validationMessage = "Please enter an account name";
      return;
    }
    this.accountData.setReferrer('PickAccountNamePage');
    this.accountData.setAccountName(this.accountname);
    this.goBack();
  }

  goBack() {
    this.nav.pop();
  }

}