// angular
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

declare var firebase: any;

@Injectable()
export class SettingsData {

  public user: any;
  public userdata: any;
  public housedata: any;
  public profilepicdata: any;
  public userSettings: any;

  constructor() {
    this.user = firebase.auth().currentUser;
    this.userdata = firebase.database().ref('/users/');
    this.housedata = firebase.database().ref('/houses/');
    this.profilepicdata = firebase.storage().ref('/profilepics/');
  }

  getUserData(): any {
    return this.userdata.child(this.user.uid);
  }

  getAccountTypes(paramHouseid): any {
    return this.housedata.child(paramHouseid + '/memberaccounttypes');
  }

  updateDefaultBalance(newdefaultbalance: string): any {
    this.userdata.child(this.user.uid).update({'defaultbalance' : newdefaultbalance});
  }

  updateDefaultDate(newdefaultdate: string): any {
    this.userdata.child(this.user.uid).update({'defaultdate' : newdefaultdate});
  }

  updateTouchID(ischecked: boolean): any {
    this.userdata.child(this.user.uid).update({'enabletouchid' : ischecked});
  }

  updateEmailNode(newemail): any {
    this.userdata.child(this.user.uid).update({'email' : newemail});
  }

  updateName(newname: string) {
    this.userdata.child(this.user.uid).update({'fullname' : newname});
  }

  updateAccountType(houseid: string, item: any): any {
    this.housedata.child(houseid + '/memberaccounttypes/' + item.id).update(item);
  }

  updateEmail(newEmail: string) {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      let user = firebase.auth().currentUser;
      user.updateEmail(newEmail)
      .then(function() {
        resolve();
      }).catch(error => {
        reject(error);
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
        reject(error);
      });
    });
  }

  deleteData(houseid) {
    //
    // Delete ALL user data
    this.housedata.child(houseid).remove();
    this.userdata.child(this.user.uid).remove();
  }

  deleteUser() {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      let user = firebase.auth().currentUser;
      user.delete()
      .then(function() {
        resolve();
      }).catch(function(error) {
        reject(error);
      });
    });
  }

  savePicture(pic): any {
    this.profilepicdata.child(this.user.uid).child('profilepicture.png')
      .put(pic).then((savedpicture) => {
        this.userdata.child(this.user.uid).update({'profilepic' : savedpicture.downloadURL});
      });
  }

}