import { Component } from '@angular/core';

import { ViewController, NavParams } from 'ionic-angular';

// services
import { UserData } from '../../../providers/user-data';

@Component({
  templateUrl: 'pickaccounttype.html'
})

export class PickAccountTypePage {
  
  pickType: string;
  item: {name?: string, icon?: string, $key?: string} = {};
  items: any;
  itemselected;
   
  constructor(
    public viewCtrl: ViewController, 
    public navParams: NavParams,
    public userData: UserData) {
    
    this.loadAccountTypes();
    this.itemselected = {
      text: this.navParams.data.paramType
    }

  }
  
  save(item) {
    this.viewCtrl.dismiss(item);
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  loadAccountTypes() {
    this.items = this.userData.getAccountTypes();
  }
}