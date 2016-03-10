import {Injectable} from 'angular2/core';
import {Storage, LocalStorage, Events} from 'ionic-angular';


@Injectable()
export class UserData {
  _favorites = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  storage = new Storage(LocalStorage);
  username = '';
  password = '';
  firebaseUrl = "https://brilliant-inferno-1044.firebaseio.com";
  authHandler = '';
  ref = '';

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

  login(username, password) {
    this.events.publish('user:login');
    this.storage.set(this.username, username);
    this.storage.set(this.password, password);
  }

  signup() {
    this.events.publish('user:signup');
  }

  logout() {
    this.events.publish('user:logout');
    this.ref.unauth();
  }

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value;
    });
  }
  
  // Firebase 
  firebaseRef() {
    this.ref = new Firebase(this.firebaseUrl);
    return this.ref;
  }
  
}
