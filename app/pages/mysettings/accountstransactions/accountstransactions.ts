import {Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';
import {PickDefaultDatePage} from '../../mypicklists/pickdefaultdate/pickdefaultdate';
import {PickDefaultBalancePage} from '../../mypicklists/pickdefaultbalance/pickdefaultbalance';
import {MyInput} from '../../mydirectives/my-input/my-input';
import {FirebaseService} from '../../../providers/firebaseService'

@Component({
  templateUrl: 'build/pages/mysettings/accountstransactions/accountstransactions.html',
  directives: [MyInput]
})

export class AccountsTransactionsPage {
  
  defaultdate: string = '';
  defaultbalance: string = '';
  
  constructor(private nav: NavController, private db: FirebaseService) {}
  
  pickDefaultDate() {
    this.nav.push(PickDefaultDatePage);
  }
  
  pickDefaultBalance() {
    this.nav.push(PickDefaultBalancePage);
  }
  
  loadDefaults() {
    this.defaultdate = this.db.getDefaultDateSelected_Text();
    this.defaultbalance = this.db.getDefaultBalanceSelected_Text();
  }
  
  save() {
    this.db.savePreferences();
    this.nav.pop();
  }
  
  onPageWillEnter() {
    this.loadDefaults();
  }
  
}