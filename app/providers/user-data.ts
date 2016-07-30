import {Injectable} from '@angular/core';
import {Storage, LocalStorage, Events} from 'ionic-angular';

@Injectable()
export class UserData {
  
  _favorites = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  storage = new Storage(LocalStorage);
  username = '';
  userpwd = '';
  enabletouchid = '';

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

  autoLoginLocalStorage() {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.events.publish('user:login');
  }

  saveLocalStorage(credentials) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(credentials.email);
    this.setUserPwd(credentials.password);
    this.events.publish('user:login');
  }

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.events.publish('user:logout');
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

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value;
    });
  }
   
}