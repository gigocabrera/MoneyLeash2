import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

// app pages
import { AccountPage } from '../account/account';
import { TransactionsPage } from '../transaction-list/transaction-list';
/*import { TransactionsVirtualPage } from '../transaction-list-virtual/transaction-list-virtual';*/

// services
import { AuthService } from '../../../providers/auth-service';

// models
import { Account } from '../../../models/account.model';

@Component({
  selector: 'page-account-list',
  templateUrl: 'account-list.html'
})

export class AccountListPage {

  groupedAccounts = [];
  networth: any;

  constructor(
      public nav: NavController,
      public alertController: AlertController,
      public auth: AuthService) {}

  ionViewDidLoad() {

    this.auth.getAllAccounts().on('value', (accounts) => {

      var that = this;
      this.groupedAccounts = [];
      let currentAccounts = [];
      let currenttype;
      let clearedBal = 0;
      let netWorth = 0;

      accounts.forEach( spanshot => {

        var account = spanshot.val();

        let tempAccount = new Account(
          spanshot.key,
          account.BalanceClass,
          account.accountname,
          account.accounttype,
          account.autoclear,
          account.balancecleared,
          account.balancecurrent,
          account.balancetoday,
          account.dateopen,
          account.totalclearedtransactions,
          account.totalpendingtransactions,
          account.totaltransactions,
          "Edit"
        );

        // Calculate Net Worth
        tempAccount.BalanceClass = '';
        clearedBal = parseFloat(tempAccount.balancecleared);
        netWorth = netWorth + clearedBal;
        if (clearedBal > 0) {
          tempAccount.BalanceClass = 'textGreen';
        } else if (clearedBal < 0){
          tempAccount.BalanceClass = 'textRed';
        } else {
          tempAccount.BalanceClass = 'textBlack';
        }
        //
        // Add grouping functionality
        //
        if(tempAccount.accounttype != currenttype){
          currenttype = tempAccount.accounttype;
          let newGroup = {
            acctype: currenttype,
            accounts: []
          };
          currentAccounts = newGroup.accounts;
          that.groupedAccounts.push(newGroup);
        }
        currentAccounts.push(tempAccount);
      });
      this.auth.LoadingControllerDismiss();
    });

  }

  viewtransactions (account) {
    this.auth.LoadingControllerShow();
    this.nav.push(TransactionsPage, {paramAccount: account});
  }

  newAccount() {
    let tempAccount = new Account(null,null,null,null,null,null,null,null,null,null,null,null,"New");
    this.nav.push(AccountPage, {paramAccount: tempAccount});
  }

  edit(slidingItem, account) {
    this.handleSlidingItems(slidingItem);
    this.nav.push(AccountPage, {paramAccount: account});
  }

  delete(slidingItem, account) {
    this.handleSlidingItems(slidingItem);
    let alert = this.alertController.create({
      title: 'Delete Account',
      message: 'Are you sure you want to delete ' + account.accountname + ' and ALL the transactions?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            //console.log('Cancel RemoveUser clicked');
            slidingItem.close();
          }
        },
        {
          text: 'Delete',
          cssClass: 'alertDanger',
          handler: () => {
            this.auth.deleteAccount(account);
          }
        }
      ]
    });
    alert.present();
  }

  handleSlidingItems(slidingItem) {
    // Close any open sliding items when the page updates
    slidingItem.close();
  }

  syncCategoryData(account) {
    this.auth.LoadingControllerShow();
    this.auth.syncCategories(account);
  }

  syncPayeeData(account) {
    this.auth.LoadingControllerShow();
    this.auth.syncPayees(account);
  }

  syncPhotos(account) {
    this.auth.LoadingControllerShow();
    this.auth.syncPhotos(account);
  }
  
}