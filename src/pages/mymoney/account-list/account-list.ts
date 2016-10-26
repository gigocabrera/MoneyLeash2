import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

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
          id: spanshot.key,
          accountname: account.accountname,
          accounttype: account.accounttype,
          BalanceClass: account.BalanceClass,
          balancecleared: account.balancecleared,
          balancetoday: account.balancetoday,
          dateopen: account.dateopen
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
    this.nav.push(AccountPage, {paramAccount: 'New'});
  }

  getnavbarcolor() {
    this.navbarcolor = this.userData.colors.navbar;
  }

  edit(slidingItem, account) {
    this.handleSlidingItems(slidingItem);
    this.nav.push(AccountPage, {paramAccount: account});
  }

  delete(slidingItem, account) {
    console.log(account);
    this.handleSlidingItems(slidingItem);
  }

  handleSlidingItems(slidingItem) {
    // Close any open sliding items when the page updates
    slidingItem.close();
  }
  
}