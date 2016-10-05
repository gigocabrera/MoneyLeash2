import { Component } from '@angular/core';

import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-pickdefaultdate',
  templateUrl: 'pickdefaultdate.html'
})

export class PickDefaultDatePage {  
  
  defaultDateOptions: {
    description?: string,
    value?: string
  } = {};
  
  itemselected: string;
  
  constructor(
    public nav: NavController, 
    public viewCtrl: ViewController, 
    public navParams: NavParams) {

    this.defaultDateOptions = [
          { text: 'No default date', value: 'None' },
          { text: 'Today\'s date', value: 'Today' },
          { text: 'Last date used', value: 'Last' }];
    
    this.itemselected = this.navParams.data.paramDate;

  }

  pickPreference(dateSelected) {
    this.dismiss(dateSelected);
  }

  dismiss(dateSelected) {
    this.viewCtrl.dismiss(dateSelected);
  }
    
}