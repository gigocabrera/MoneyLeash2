import {Injectable} from '@angular/core';
import {Storage, LocalStorage, Events} from 'ionic-angular';

@Injectable()
export class UserData {
  
  storage = new Storage(LocalStorage);
  username = '';
  userpwd = '';
  enabletouchid = '';
  appversion = '';

  constructor(private events: Events) {
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
   
}