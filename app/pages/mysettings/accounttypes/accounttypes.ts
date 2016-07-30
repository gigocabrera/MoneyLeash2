import {Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';
import {PickDefaultDatePage} from '../../mypicklists/pickdefaultdate/pickdefaultdate';
import {PickDefaultBalancePage} from '../../mypicklists/pickdefaultbalance/pickdefaultbalance';
import {FirebaseService} from '../../../providers/firebaseService'

@Component({
  templateUrl: 'build/pages/mysettings/accounttypes/accounttypes.html'
})

export class AccountTypesPage {
  
  defaultdate: string = '';
  defaultbalance: string = '';
  
  constructor(private nav: NavController, private db: FirebaseService) {}
  
  onPageWillEnter() {
    //this.loadDefaults();
  }
  
}