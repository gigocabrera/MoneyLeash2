import { Component } from '@angular/core';

import { NavController, ViewController, NavParams } from 'ionic-angular';

// services
import { AuthService } from '../../../providers/auth-service';

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
    public auth: AuthService) {

      this.navbarcolor = this.auth.user.navbarcolor;
      this.dividercolor = this.auth.user.dividercolor;

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