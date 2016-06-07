import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AccountsTransactionsPage} from '../../mysettings/accountstransactions/accountstransactions';
import {UserData} from '../../../providers/user-data';

@Component({
  templateUrl: 'build/pages/mypicklists/pickdefaultdate/pickdefaultdate.html'
})

export class PickDefaultDatePage {  
  
  defaultDateOptions: {
    description?: string,
    value?: string
  } = {};
  
  itemselected: {
    value?: string
  } = {};
  
  constructor(
      private nav: NavController,
      private userData: UserData) {
        // Get list of default date options from shared service
        this.defaultDateOptions = userData.getDefaultDateOptions();
      }
  
  pickPreference() {
    this.userData.pickDefaultDateSelected(this.itemselected);
    this.nav.pop();
  }
  
  dismiss() {
    this.nav.pop();
  }
  
  onPageWillEnter() {
    this.itemselected = this.userData.getDefaultDateSelected();
  }
    
}