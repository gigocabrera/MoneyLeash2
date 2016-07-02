import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {AccountsTransactionsPage} from '../../mysettings/accountstransactions/accountstransactions';
import {FirebaseService} from '../../../providers/firebaseService'

@Component({
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
      private fbservice: FirebaseService) {
        this.defaultBalanceOptions = fbservice.getDefaultBalanceOptions();
      }
  
  pickPreference() {
    this.fbservice.pickDefaultBalanceSelected(this.itemselected);
    this.nav.pop();
  }
  
  dismiss() {
    this.nav.pop();
  }
  
  onPageWillEnter() {
    this.itemselected = this.fbservice.getDefaultBalanceSelected();
  }
    
}