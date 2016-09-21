// angular
import {Component} from '@angular/core';

// ionic
import {NavController, MenuController, Alert} from 'ionic-angular';

// services
import {AccountsData} from '../../../providers/accounts-data';

@Component({
  templateUrl: 'build/pages/mymoney/account-list/account-list.html'
})

export class AccountPage {

  constructor(
      public nav: NavController) {}

  ionViewLoaded() {
    
  }
  
}