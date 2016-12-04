import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

// services
import { AccountData } from '../../../providers/account-data';

@Component({
  templateUrl: 'pickaccountname.html'
})

export class PickAccountNamePage {
  
  accountname;
   
  constructor(
      public nav: NavController,
      public accountData: AccountData) {}

  ionViewDidLoad() {

  }

  pickPreference(name) {
    this.accountData.setReferrer('PickAccountNamePage');
    this.accountData.setAccountName(name);
    this.goBack();
  }

  goBack() {
    this.nav.pop();
  }

}