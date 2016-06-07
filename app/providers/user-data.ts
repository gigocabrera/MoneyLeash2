import {Injectable} from '@angular/core';
import {Storage, LocalStorage, Events} from 'ionic-angular';
import {AuthService} from '../providers/auth-service';

@Injectable()
export class UserData {
  
  _favorites = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  storage = new Storage(LocalStorage);
  email = '';
  password = '';

  constructor(private events: Events,
  private auth: AuthService) {
    
    this.loadPreferences();
    
  }

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

  login(username) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:login');
  }

  signup(username) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:signup');
  }

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
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
  
  /* GLOBAL */
  /* -------------------------------------------- */
  getText(valueKey, arr) {
    for (var i=0; i < arr.length; i++) {
      if (arr[i].value === valueKey) {
        return arr[i].text;
      }
    }
  }
  
  /* PREFERENCES */
  /* -------------------------------------------- */
  myPreferences: {
    defaultdate?: string, 
    defaultbalance?: string,
    usetouchid?: string
  } = {};
  
  loadPreferences() {
    this.auth.getPreferences(this.auth.id).then(thisPreferences => {
      this.myPreferences = thisPreferences;
    })
  }
  SavePreferences () {
    this.auth.savePreferences(this.myPreferences);
  }
  
  /* DEFAULT DATE PREFERENCES */
  /* -------------------------------------------- */
  defaultDateOptions = [
          { text: 'No default date', value: 'none' },
          { text: 'Today\'s date', value: 'today' },
          { text: 'Last date used', value: 'last' }];
  
  getDefaultDateOptions() {
    return this.defaultDateOptions;
  }
  getDefaultDateText(valueKey) {
    return this.getText(valueKey,this.defaultDateOptions);
  }  
  getDefaultDateSelected() {
    return this.myPreferences.defaultdate;
  }
  getDefaultDateSelected_Text() {
    return this.getDefaultDateText(this.myPreferences.defaultdate);
  }
  pickDefaultDateSelected(valueKey) {
    this.myPreferences.defaultdate = valueKey;
  }
  
  /* DEFAULT BALANCE PREFERENCES */
  /* -------------------------------------------- */
  defaultBalanceOptions = [
          { text: 'Current Balance', value: 'current' },
          { text: 'Cleared Balance', value: 'clear' },
          { text: 'Today\'s Balance', value: 'today' }];
  
  getDefaultBalanceOptions() {
    return this.defaultBalanceOptions;
  }
  getDefaultBalanceText(valueKey) {
    return this.getText(valueKey,this.defaultBalanceOptions);
  }  
  getDefaultBalanceSelected() {
    return this.myPreferences.defaultbalance;
  }
  getDefaultBalanceSelected_Text() {
    return this.getDefaultBalanceText(this.myPreferences.defaultbalance);
  }  
  pickDefaultBalanceSelected(valueKey) {
    this.myPreferences.defaultbalance = valueKey;
  }
  
  /* DEFAULT SECURITY PREFERENCES */
  /* -------------------------------------------- */
  getDefaultSecuritySelected() {
    return this.myPreferences.usetouchid;
  }
  pickDefaultSecuritySelected(valueKey) {
    this.myPreferences.usetouchid = valueKey;
  } 
}