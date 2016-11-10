import { Component } from '@angular/core';

import { NavController, ModalController, NavParams } from 'ionic-angular';

// app pages
import { PickAccountTypePage } from '../../mypicklists/pickaccounttype/pickaccounttype';

// services
import { UserData } from '../../../providers/user-data';

@Component({
  templateUrl: 'account.html'
})

export class AccountPage {

  title: string;
  listheader: string;
  account: any;

  constructor(
      public nav: NavController,
      public modalController: ModalController,
      public navParams: NavParams,
      public userData: UserData) {

    this.account = this.navParams.data.paramAccount;
    if (this.account.mode === 'New') {
      this.title = 'Create Account';
      this.listheader = 'Enter Account Details';
    } else {
      this.title = 'Edit Account';
      this.listheader = 'Edit Account Details';
    }
  }

  save(account) {
    if (this.account.mode === 'New') {
      this.userData.addAccount(account);
    } else {
      this.userData.updateAccount(account);
    }
    this.nav.pop();
  }

  pickAccountType() {
    let modal = this.modalController.create(PickAccountTypePage, {paramType: this.account.type});
    modal.present(modal);
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.onPickAccountType(data);
      }
    });
  }

  onPickAccountType(item) {
    this.account.type = item.name;
  }
  
}