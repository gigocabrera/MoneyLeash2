import { Component } from '@angular/core';

import { NavController, ViewController, NavParams } from 'ionic-angular';

// services
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'page-pickdefaultdate',
  templateUrl: 'pickdefaultdate.html'
})

export class PickDefaultDatePage {  
  
  navbarcolor: string;
  dividercolor: string;
  defaultItems;
  itemselected: string;
  
  constructor(
    public nav: NavController, 
    public viewCtrl: ViewController, 
    public navParams: NavParams,
    public userData: UserData) {

      this.navbarcolor = this.userData.user.navbarcolor;
      this.dividercolor = this.userData.user.dividercolor;

    }

  ionViewDidLoad() {
    this.defaultItems = [
          { text: 'No default date', value: 'None' },
          { text: 'Today\'s date', value: 'Today' },
          { text: 'Last date used', value: 'Last' }];
    
    this.itemselected = this.navParams.data.paramDate;
  }

  pickPreference(dateSelected) {
    this.viewCtrl.dismiss(dateSelected);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
    
}