import { Injectable } from '@angular/core';

import {AngularFire, FirebaseObjectObservable} from 'angularfire2';
import {ISettings} from '../models/settings-model';

@Injectable()
export class SettingsData {

  public settingsData: any;
  public user: any;

  constructor(public af: AngularFire) {
    this.user = firebase.auth().currentUser;
    this.settingsData = firebase.database().ref('/users/');
  }

  getSettingsData(): any {
    return this.settingsData.child(this.user.uid);
  }

  updateDefaultBalance(newdefaultbalance: string): any {
    this.settingsData.child(this.user.uid).update({'defaultbalance' : newdefaultbalance});
  }

  updateDefaultDate(newdefaultdate: string): any {
    this.settingsData.child(this.user.uid).update({'defaultdate' : newdefaultdate});
  }

  updateTouchID(ischecked: boolean): any {
    this.settingsData.child(this.user.uid).update({'enabletouchid' : ischecked});
  }

  updateEmail(newEmail: string) {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      let user = firebase.auth().currentUser;
      user.updateEmail(newEmail)
      .then(function() {
        resolve();
      }).catch(error => {
        return error;
      });
    });
  }

  updatePassword(newPassword: string) {    
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      let user = firebase.auth().currentUser;
      user.updatePassword(newPassword)
      .then(function() {
        resolve();
      }).catch(function(error) {
        return error;
      });
    });
  }

  deleteUser() {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      let user = firebase.auth().currentUser;
      user.delete()
      .then(function() {
        resolve();
      }).catch(function(error) {
        return error;
      });
    });
  }

}

