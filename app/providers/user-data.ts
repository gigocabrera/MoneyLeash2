// angular
import {Injectable} from '@angular/core';

// ionic
import {Storage, LocalStorage} from 'ionic-angular';

// firebase
declare var firebase: any;

@Injectable()
export class UserData {
  
  public storage = new Storage(LocalStorage);
  public username = '';
  public userpwd = '';
  public enabletouchid = '';
  public appversion = '';
  public userdata: any;
  public housedata: any;
  public profilepicdata: any;
  public userSettings: any;

  constructor() {

    this.userdata = firebase.database().ref('/users/');
    this.housedata = firebase.database().ref('/houses/');
    this.profilepicdata = firebase.storage().ref('/profilepics/');

    this.storage.get('enabletouchid').then((value) => {
      this.enabletouchid = value;
    });
    this.storage.get('username').then((value) => {
      this.username = value;
    });
    this.storage.get('userpwd').then((value) => {
      this.userpwd = value;
    });

  }

  saveLocalStorage(credentials) {
    this.setUsername(credentials.email);
    this.setUserPwd(credentials.password);
  }

  setUsername(username) {
    this.storage.set('username', username);
  }

  setUserPwd(pwd) {
    this.storage.set('userpwd', pwd);
  }

  setEnableTouchID(enabletouchid) {
    this.storage.set('enabletouchid', enabletouchid);
  }

  getUsernameStorage() {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  getPasswordStorage() {
    return this.storage.get('userpwd').then((value) => {
      return value;
    });
  }

  getEnableTouchIDStorage() {
    return this.storage.get('enabletouchid').then((value) => {
      return value;
    });
  }

  uid() {
    return firebase.auth().currentUser.uid;
  }

  currentUser() {
    return firebase.auth().currentUser
  }

  currentUserEmail() {
    return firebase.auth().currentUser.email;
  }

  logout() {
    return firebase.auth().signOut()
  }

  houseid() {
    return this.userSettings.houseid;
  }

  getUserData(): any {
    return this.userdata.child(firebase.auth().currentUser.uid);
  }

  getAccountTypes(paramHouseid): any {
    return this.housedata.child(paramHouseid + '/memberaccounttypes');
  }

  updateTouchID(ischecked: boolean): any {
    this.userdata.child(firebase.auth().currentUser.uid).update({'enabletouchid' : ischecked});
  }

  updateDefaultBalance(newdefaultbalance: string): any {
    this.userdata.child(firebase.auth().currentUser.uid).update({'defaultbalance' : newdefaultbalance});
  }

  updateDefaultDate(newdefaultdate: string): any {
    this.userdata.child(firebase.auth().currentUser.uid).update({'defaultdate' : newdefaultdate});
  }

  updateName(newname: string) {
    this.userdata.child(firebase.auth().currentUser.uid).update({'fullname' : newname});
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
    this.userdata.child(firebase.auth().currentUser.uid).remove();
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
    this.profilepicdata.child(firebase.auth().currentUser.uid).child('profilepicture.png')
      .put(pic).then((savedpicture) => {
        this.userdata.child(firebase.auth().currentUser.uid).update({'profilepic' : savedpicture.downloadURL});
      });
  }

  updateEmailNode(newemail): any {
    this.userdata.child(firebase.auth().currentUser.uid).update({'email' : newemail});
  }

  updateAccountType(houseid: string, item: any): any {
    this.housedata.child(houseid + '/memberaccounttypes/' + item.id).update(item);
  }
   
}