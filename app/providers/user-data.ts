// angular
import {Injectable} from '@angular/core';

// ionic
import {Storage, LocalStorage, Events} from 'ionic-angular';

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

  constructor(private events: Events) {

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

  
  // Firebase methods 

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

  loadUserPreferences() {
    this.getUserData().on('value', (data) => {
      this.userSettings = data.val();
      this.houseid = this.userSettings.houseid;
    });
  }
   
}