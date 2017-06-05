import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

// app pages
import { AccountPage } from '../account/account';
import { TransactionsPage } from '../transaction-list/transaction-list';

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
      public navCtrl: NavController,
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

  viewItemDetails(item) {
    this.auth.LoadingControllerShow();
    this.navCtrl.push(TransactionsPage, { paramAccount: item });
  }

  addItem() {
    this.navCtrl.push(AccountPage, { key: '0' });
  }

  editItem(slidingItem, item) {
    this.handleSlidingItems(slidingItem);
    this.navCtrl.push(AccountPage, { key: item.$key });
  }

  deleteItem(slidingItem, item) {
    this.handleSlidingItems(slidingItem);
    let alert = this.alertController.create({
      title: 'Delete Account',
      message: 'Are you sure you want to delete ' + item.accountname + ' and ALL the transactions?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            slidingItem.close();
          }
        },
        {
          text: 'Delete',
          cssClass: 'alertDanger',
          handler: () => {
            this.auth.deleteAccount(item);
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
  
}