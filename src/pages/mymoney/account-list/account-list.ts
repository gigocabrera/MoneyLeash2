import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

// app pages
import { AccountPage } from '../account/account';
import { TransactionsPage } from '../transactions/transactions';

// services
import {UserData} from '../../../providers/user-data';

@Component({
  selector: 'page-account-list',
  templateUrl: 'account-list.html'
})

export class AccountListPage {

  accounts: {};
  networth: any;
  navbarcolor: string;

  constructor(
      public nav: NavController,
      public alertController: AlertController,
      public userData: UserData) {

        this.navbarcolor = this.userData.colors.navbar;

      }

  ionViewDidLoad() {

    this.userData.getAllAccounts().on('value', (accounts) => {
      
      let rawList= [];
      var clearedBal = 0;
      var netWorth = 0;

      accounts.forEach( spanshot => {

        var account = spanshot.val();

        // Calculate Net Worth
        account.BalanceClass = '';
        clearedBal = parseFloat(account.balancecleared);
        netWorth = netWorth + clearedBal;
        if (clearedBal > 0) {
          account.BalanceClass = 'textGreen';
        } else if (clearedBal < 0){
          account.BalanceClass = 'textRed';
        } else {
          account.BalanceClass = 'textBlack';
        }

        // Build account array
        rawList.push({
          $key: spanshot.key,
          accountname: account.accountname,
          accounttype: account.accounttype,
          BalanceClass: account.BalanceClass,
          balancecleared: account.balancecleared,
          balancetoday: account.balancetoday,
          dateopen: account.dateopen,
          mode: 'Edit'
        });
      })

      this.accounts = rawList;
      this.networth = netWorth.toFixed(2);

    });
  }

  viewtransactions (account) {
    this.nav.push(TransactionsPage, {paramAccount: account});
  }

  newAccount() {
    var account = {
          '$key': '',
          'accountname': '',
          'accounttype': '',
          'BalanceClass': '',
          'balancecleared': '',
          'balancetoday': '',
          'dateopen': '',
          'mode': 'New'
        }
    this.nav.push(AccountPage, {paramAccount: account});
  }

  getnavbarcolor() {
    this.navbarcolor = this.userData.colors.navbar;
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
          handler: () => {
            this.userData.deleteAccount(account);
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
  
}