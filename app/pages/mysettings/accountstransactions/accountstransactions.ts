import {Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';
import {AuthService} from '../../../providers/auth-service';
import {PickDefaultDatePage} from '../../mypicklists/pickdefaultdate/pickdefaultdate';
import {PickDefaultBalancePage} from '../../mypicklists/pickdefaultbalance/pickdefaultbalance';
import {UserData} from '../../../providers/user-data';

@Component({
  templateUrl: 'build/pages/mysettings/accountstransactions/accountstransactions.html'
})

export class AccountsTransactionsPage {
  settings: {
    defaultdate?: string,
    defaultbalance?: string
  } = {};
  
  constructor(
      private nav: NavController,
      private auth: AuthService,
      private userData: UserData) {}
  
  pickDefaultDate() {
    this.nav.push(PickDefaultDatePage);
  }
  
  pickDefaultBalance() {
    this.nav.push(PickDefaultBalancePage);
  }
  
  loadDefaults() {
    this.settings.defaultdate = this.userData.getDefaultDateSelected_Text();
    this.settings.defaultbalance = this.userData.getDefaultBalanceSelected_Text();
  }
  
  save() {
    this.userData.SavePreferences();
    this.nav.pop();
  }
  
  onPageWillEnter() {
    this.loadDefaults();
  }
  
}