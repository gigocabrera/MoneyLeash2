import {Page, NavController} from 'ionic-angular';
import {AccountsTransactionsPage} from '../../mysettings/accountstransactions/accountstransactions';
import {UserData} from '../../../providers/user-data';

@Page({
  templateUrl: 'build/pages/mypicklists/pickdefaultdate/pickdefaultdate.html'
})

export class PickDefaultDatePage {  
  defaultitems: {
    text?: string,
    value?: string
  } = {};
  
  constructor(
      private nav: NavController,
      private userData: UserData) {
        this.defaultitems = [
          { text: 'No default date', value: 'none' },
          { text: 'Today\'s date', value: 'today' },
          { text: 'Last date used', value: 'last' }];
  }
  
  dismiss() {
    this.nav.pop();
  }
  
  pickPreference(item) {
    this.userData.globalSettings.defaultdate = item.value;
    this.userData.globalSettings.defaultdatedisplay = item.text;
    this.nav.pop();
  }
    
}