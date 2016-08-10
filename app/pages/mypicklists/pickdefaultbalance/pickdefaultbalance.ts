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
  
  itemselected: string;
   
  constructor(
      public nav: NavController,
      public db: FirebaseService) {
        this.defaultBalanceOptions = db.getDefaultBalanceOptions();
      }
  
  pickPreference() {
    this.db.pickDefaultBalanceSelected(this.itemselected);
    this.nav.pop();
  }
  
  dismiss() {
    this.nav.pop();
  }
  
  onPageWillEnter() {
    this.itemselected = this.db.getDefaultBalanceSelected();
  }
    
}