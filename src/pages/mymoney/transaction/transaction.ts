import { Component } from '@angular/core';

import { NavController, ModalController, NavParams } from 'ionic-angular';

// app pages
//import { PickAccountTypePage } from '../../mypicklists/pickaccounttype/pickaccounttype';

// services
import { UserData } from '../../../providers/user-data';

// models
import { ITransaction } from '../../../models/transaction.model';

@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html'
})

export class TransactionPage {

  navbarcolor: string;
  dividercolor: string;
  title: string;
  transaction: ITransaction;

  constructor(
      public nav: NavController,
      public modalController: ModalController,
      public navParams: NavParams,
      public userData: UserData) {

    this.navbarcolor = this.userData.user.navbarcolor;
    this.dividercolor = this.userData.user.dividercolor;

    this.transaction = this.navParams.data.paramTransaction;
    if (this.transaction.mode === 'New') {
      this.title = 'Create Transaction';
    } else {
      this.title = 'Edit Transaction';
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

  pickAccountType() {
    /*let modal = this.modalController.create(PickAccountTypePage, {paramType: this.transaction.type});
    modal.present(modal);
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.onPickAccountType(data);
      }
    });*/
  }

  onPickAccountType(item) {
    //this.transaction.type = item.name;
  }
  
}