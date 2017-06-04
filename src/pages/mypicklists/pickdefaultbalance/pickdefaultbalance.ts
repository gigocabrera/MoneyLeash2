import { Component } from '@angular/core';

import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-pickdefaultbalance',
  templateUrl: 'pickdefaultbalance.html'
})

export class PickDefaultBalancePage {  
  
  defaultItems;
  itemselected: string;
   
  constructor(
    public nav: NavController, 
    public viewCtrl: ViewController, 
    public navParams: NavParams) {

    this.itemselected = navParams.get('balance');
    this.defaultItems = [
      { text: 'Current Balance', value: 'Current' },
      { text: 'Cleared Balance', value: 'Cleared' },
      { text: 'Today\'s Balance', value: 'Today' }
    ];

  }
  
  pickPreference(itemselected) {
    this.viewCtrl.dismiss(itemselected);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
    
}