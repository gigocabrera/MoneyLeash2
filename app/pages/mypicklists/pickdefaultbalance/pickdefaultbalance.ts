import {Page, NavController, ViewController} from 'ionic-angular';
import {AccountsTransactionsPage} from '../../mysettings/accountstransactions/accountstransactions';
import {UserData} from '../../../providers/user-data';

@Page({
  templateUrl: 'build/pages/mypicklists/pickdefaultbalance/pickdefaultbalance.html'
})

export class PickDefaultBalancePage {
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
          { text: 'Current Balance', value: 'current' },
          { text: 'Cleared Balance', value: 'cleared' },
          { text: 'Both', value: 'both' }];
      }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  pickPreference(data) {
    this.viewCtrl.dismiss(data);
  }
    
}