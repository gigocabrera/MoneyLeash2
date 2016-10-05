import { Component } from '@angular/core';

import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-pickdefaultbalance',
  templateUrl: 'pickdefaultbalance.html'
})

export class PickDefaultBalancePage {  
  
  defaultBalanceOptions: {
    description?: string,
    value?: string
  } = {};
  
  itemselected: string;
   
  constructor(public nav: NavController, public viewCtrl: ViewController, public navParams: NavParams) {

    this.defaultBalanceOptions = [
          { text: 'Current Balance', value: 'Current' },
          { text: 'Cleared Balance', value: 'Clear' },
          { text: 'Today\'s Balance', value: 'Today' }];

    this.itemselected = this.navParams.data.paramBalance;
  }
  
  pickPreference(balanceSelected) {
    this.dismiss(balanceSelected);
  }

  dismiss(balanceSelected) {
    this.viewCtrl.dismiss(balanceSelected);
  }
    
}