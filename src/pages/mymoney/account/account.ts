import { Component } from '@angular/core';

import { NavController, ModalController, NavParams } from 'ionic-angular';

// app pages
import { PickAccountTypePage } from '../../mypicklists/pickaccounttype/pickaccounttype';

// services
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})

export class AccountPage {

  title: string;
  listheader: string;
  account: {accname?: string, date?: string, type?: string} = {};
  item: any;

  constructor(
      public nav: NavController,
      public modalController: ModalController,
      public navParams: NavParams,
      public userData: UserData) {

      this.item = this.navParams.data.paramAccount;
        if (this.item === 'New') {
          this.title = 'Create Account';
          this.listheader = 'Enter Account Details';
        } else {
          this.title = 'Edit Account';
          this.listheader = 'Edit Account Details';
        }
      }

  save(account) {
    //this.userData.save
    console.log(account);
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