import {Page, NavController, ViewController} from 'ionic-angular';
import {AccountsTransactionsPage} from '../../mysettings/accountstransactions/accountstransactions';
import {UserData} from '../../../providers/user-data';

@Page({
  templateUrl: 'build/pages/mypicklists/pickdefaultbalance/pickdefaultbalance.html'
})

export class PickDefaultBalancePage {  
  
  defaultBalanceOptions: {
    description?: string,
    value?: string
  } = {};
  
  itemselected: {
    value?: string
  } = {};
   
  constructor(
      private nav: NavController,
      private user: UserData) {
        // Get list of default balance options from shared service
        this.defaultBalanceOptions = user.getDefaultBalanceOptions();
      }
  
  pickPreference() {
    this.user.pickDefaultBalanceSelected(this.itemselected);
    this.nav.pop();
  }
  
  dismiss() {
    this.nav.pop();
  }
  
  onPageWillEnter() {
    this.itemselected = this.user.getDefaultBalanceSelected();
  }
    
}