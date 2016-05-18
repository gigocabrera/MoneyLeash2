import {Page, NavController, ViewController} from 'ionic-angular';
import {AccountsTransactionsPage} from '../../mysettings/accountstransactions/accountstransactions';
import {UserData} from '../../../providers/user-data';

@Page({
  templateUrl: 'build/pages/mypicklists/pickdefaultdate/pickdefaultdate.html'
})

export class PickDefaultDatePage {  
  defaultitem: {
    text?: string,
    value?: string
  } = {};
  
  constructor(
      private nav: NavController,
      private viewCtrl: ViewController,
      private userData: UserData) {
        
        //console.log(userData.globalSettings.defaultdate);
        
        this.defaultitem = [
          { text: 'No default date', value: 'none' },
          { text: 'Today\'s date', value: 'today' },
          { text: 'Last date used', value: 'last' }];
      }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  pickPreference(data) {
    this.viewCtrl.dismiss(data);
  }
    
}