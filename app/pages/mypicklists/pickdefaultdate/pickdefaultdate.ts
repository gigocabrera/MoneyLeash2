import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AccountsTransactionsPage} from '../../mysettings/accountstransactions/accountstransactions';
import {FirebaseService} from '../../../providers/firebaseService'

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
  
  constructor(private nav: NavController, private db: FirebaseService) {
    // Get list of default date options from shared service
    this.defaultDateOptions = db.getDefaultDateOptions();
  }
  
  pickPreference() {
    this.db.pickDefaultDateSelected(this.itemselected);
    this.nav.pop();
  }
  
  dismiss() {
    this.nav.pop();
  }
  
  onPageWillEnter() {
    this.itemselected = this.db.getDefaultDateSelected();
  }
    
}