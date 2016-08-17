import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {AngularFire, FirebaseObjectObservable} from 'angularfire2';
import {ISettings} from '../models/settings-model';

@Injectable()
export class SettingsData {

  public settingsData: any;
  public currentUser: any;

  constructor(public af: AngularFire) {
    this.currentUser = firebase.auth().currentUser;
    this.settingsData = firebase.database().ref('/users/');
  }

  getSettingsData(): any {
    return this.settingsData.child(this.currentUser.uid);
  }

  updateDefaultBalance(newdefaultbalance: string): any {
    this.settingsData.child(this.currentUser.uid).update({'defaultbalance' : newdefaultbalance});
  }

  updateDefaultDate(newdefaultdate: string): any {
    this.settingsData.child(this.currentUser.uid).update({'defaultdate' : newdefaultdate});
  }

  updateTouchID(ischecked: boolean): any {
    this.settingsData.child(this.currentUser.uid).update({'enabletouchid' : ischecked});
  }

}

