import { Component } from '@angular/core';

import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-pickdefaultdate',
  templateUrl: 'pickdefaultdate.html'
})

export class PickDefaultDatePage {  
  
  defaultItems;
  itemselected: string;
  
  constructor(
    public nav: NavController, 
    public viewCtrl: ViewController, 
    public navParams: NavParams) {

    this.itemselected = navParams.get('date');
    this.defaultItems = [
      { text: 'No default date', value: 'None' },
      { text: 'Today\'s date', value: 'Today' },
      { text: 'Last date used', value: 'Last' }
    ];

  }

  pickPreference(dateSelected) {
    this.viewCtrl.dismiss(dateSelected);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
    
}