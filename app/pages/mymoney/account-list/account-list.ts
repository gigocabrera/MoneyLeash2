// angular
import {Component} from '@angular/core';

// ionic
import {NavController, NavParams} from 'ionic-angular';

// pages
import {AccountPage} from '../../mymoney/account/account';

// services
import {AccountsData} from '../../../providers/accounts-data';
import {UserData} from '../../../providers/user-data';

@Component({
  templateUrl: 'build/pages/mymoney/account-list/account-list.html',
  providers: [AccountsData, UserData]
})

export class AccountListPage {

  public accounts: {};
  public networth: any;

  constructor(
      public nav: NavController,
      public navParams: NavParams,
      public accountsData: AccountsData,
      public userData: UserData) {}

  ionViewLoaded() {

    console.log(this.userData.houseid());

    this.accountsData.getAllAccounts(this.userData.houseid()).on('value', (accounts) => {
      
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
          id: account.key,
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
    console.log('edit here');
    //this.nav.push(AccountPage, {paramSettings: this.userSettings});
  }
  
}