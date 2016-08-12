import {Component} from '@angular/core';
import {NavController, Modal, NavParams} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  templateUrl: 'build/pages/mysettings/accounttypes/accounttypes.html'
})

export class AccountTypesPage {
  
  public items: FirebaseListObservable<any[]>;
  
  constructor(public nav: NavController, af: AngularFire, public navParams: NavParams) {

    this.items = af.database.list('houses/' + this.navParams.data.paramHouseid + '/memberaccounttypes');

  }
  
}