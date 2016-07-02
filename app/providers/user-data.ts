import {Injectable} from '@angular/core';
import {Storage, LocalStorage, Events} from 'ionic-angular';

@Injectable()
export class UserData {
  
  _favorites = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  storage = new Storage(LocalStorage);
  email = '';
  password = '';

  constructor(private events: Events) {}

  hasFavorite(sessionName) {
    return (this._favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName) {
    this._favorites.push(sessionName);
  }

  removeFavorite(sessionName) {
    let index = this._favorites.indexOf(sessionName)
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  }

  handleLogin(credentials) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(credentials.email);
    this.setUserPwd(credentials.password);
    this.events.publish('user:login');
  }

  handleSignup(credentials) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(credentials.email);
    this.setUserPwd(credentials.password);
    this.events.publish('user:signup');
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

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value;
    });
  }
   
}