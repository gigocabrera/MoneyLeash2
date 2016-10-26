import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

// services
import {UserData} from '../../../providers/user-data';

@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html'
})

export class TransactionsPage {

  accounts: {};
  networth: any;
  navbarcolor: string;

  constructor(
      public nav: NavController,
      public userData: UserData) {

        this.navbarcolor = this.userData.colors.navbar;

      }

  ionViewDidLoad() {

    /*this.userData.getAllAccounts().on('value', (accounts) => {
      
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

    });*/
  }

  newTransaction() {
    //this.nav.push(AccountPage, {paramAccount: 'New'});
  }

  getnavbarcolor() {
    this.navbarcolor = this.userData.colors.navbar;
  }

  edit(transaction) {

  }

  delete(transaction) {

  }
  
}