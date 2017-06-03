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
  selector: 'page-pickaccountto',
  templateUrl: 'pickaccountto.html'
})

export class PickAccountToPage {
  
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
      this.itemselected = this.transactionData.getAccountTo();
      this.elapsedTime = Date.now() - this.startTime;
      //console.log(this.elapsedTime);
    });

  }
  
  pickPreference(account) {
    this.transactionData.setReferrer('PickAccountToPage');
    this.transactionData.setAccountTo(account.accountname);
    this.transactionData.setAccountToId(account.$key);
    this.goBack();
  }

  goBack() {
    this.nav.pop();
  }
}