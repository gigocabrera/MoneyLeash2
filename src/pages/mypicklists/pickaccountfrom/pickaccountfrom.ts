import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Subject } from 'rxjs/Subject';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// firebase
import { FirebaseListObservable } from 'angularfire2/database';

// services
import { AuthService } from '../../../providers/auth-service';
import { TransactionData } from '../../../providers/transaction-data';

@Component({
  selector: 'page-pickaccountfrom',
  templateUrl: 'pickaccountfrom.html'
})

export class PickAccountFromPage {
  
  accounts: FirebaseListObservable<any>;
  itemselected: string;
  equalToSubject: Subject<any>;
  orderByChild: Subject<any>;
  startTime;
  elapsedTime;
   
  constructor(
      public nav: NavController,
      public auth: AuthService,
      public transactionData: TransactionData) {}

  ionViewDidLoad() {

    this.equalToSubject = new BehaviorSubject(null);
    this.orderByChild = new BehaviorSubject('accounttype');
    this.accounts = this.auth.getAccounts(this.orderByChild, this.equalToSubject);
    this.accounts.first().subscribe(snapshots => {
      this.auth.LoadingControllerDismiss();
      this.itemselected = this.transactionData.getAccountFrom();
      this.elapsedTime = Date.now() - this.startTime;
      //console.log(this.elapsedTime);
    });

  }
  
  pickPreference(account) {
    this.transactionData.setReferrer('PickAccountFromPage');
    this.transactionData.setAccountFrom(account.accountname);
    this.transactionData.setAccountFromId(account.$key);
    this.goBack();
  }

  goBack() {
    this.nav.pop();
  }
}