import {Page, NavController, Modal} from 'ionic-angular';
import {AuthService} from '../../../providers/auth-service';
import {PickDefaultDatePage} from '../../mypicklists/pickdefaultdate/pickdefaultdate';
import {PickDefaultBalancePage} from '../../mypicklists/pickdefaultbalance/pickdefaultbalance';
import {UserData} from '../../../providers/user-data';

@Page({
  templateUrl: 'build/pages/mysettings/accountstransactions/accountstransactions.html'
})

export class AccountsTransactionsPage {
  settings: {
    defaultdate?: string,
    defaultdatedisplay?: string,
    defaultbalance?: string,
    defaultbalancedisplay?: string
  } = {};
  
  constructor(
      private nav: NavController,
      private auth: AuthService,
      private userData: UserData) {}
  
  pickDefaultDate_Modal() {
    let modal = Modal.create(PickDefaultDatePage);
    this.nav.present(modal);
    modal.onDismiss((defaultdate: {text?: string, value?: string} = {}) => {
      if (defaultdate) {
        this.settings.defaultdate = defaultdate.value;
        this.settings.defaultdatedisplay = defaultdate.text;
      }
    });
  }
  
  pickDefaultBalance_Modal() {
    let modal = Modal.create(PickDefaultBalancePage);
    this.nav.present(modal);
    modal.onDismiss((defaultbalance: {text?: string, value?: string} = {}) => {
      if (defaultbalance) {
        this.settings.defaultbalance = defaultbalance.value;
        this.settings.defaultbalancedisplay = defaultbalance.text;
      }
    });
  }
  
  pickDefaultDate() {
    this.nav.push(PickDefaultDatePage);
  }
  
  pickDefaultBalance() {
    this.nav.push(PickDefaultBalancePage);
  }
  
  loadDefaults() {
    //
    // TODO: THERE SHOULD BE ONE COMMON LOAD METHOD IN THE SERVICE CLASS
    //
    // Default date
    this.settings.defaultdate = this.userData.globalSettings.defaultdate;
    this.settings.defaultdatedisplay = this.userData.globalSettings.defaultdatedisplay;
    // Default balance
    this.settings.defaultbalance = this.userData.globalSettings.defaultbalance;
    this.settings.defaultbalancedisplay = this.userData.globalSettings.defaultbalancedisplay;
  }
  
  save() {
    //
    // TODO: THERE SHOULD BE ONE COMMON SAVE METHOD IN THE SERVICE CLASS
    //
    this.userData.globalSettings.defaultdate = this.settings.defaultdate;
    this.userData.globalSettings.defaultdatedisplay = this.settings.defaultdatedisplay;
    this.userData.globalSettings.defaultbalance = this.settings.defaultbalance;
    this.userData.globalSettings.defaultbalancedisplay = this.settings.defaultbalancedisplay;
    this.nav.pop();
  }
  
  onPageWillEnter() {
    this.loadDefaults();
  }
  
}