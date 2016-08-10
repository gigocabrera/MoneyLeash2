import {Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {FirebaseService} from '../../../providers/firebaseService'

@Component({
  templateUrl: 'build/pages/mysettings/accounttypes/accounttypes.html'
})

export class AccountTypesPage {
  
  public items: FirebaseListObservable<any[]>;
  
  constructor(public nav: NavController, public db: FirebaseService, af: AngularFire) {    
    this.items = af.database.list('houses/-KNt_q97POfdtH4P2eyL/memberaccounttypes'); 
  }
  
}