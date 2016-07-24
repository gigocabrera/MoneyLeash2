import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

// Firebase
declare var firebase: any;

@Injectable()
export class FirebaseService {

  authCallback: any;

  constructor() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAjiJc9cXvd3bzl-aW0wbQC6sajr6RH5hg",
        authDomain: "brilliant-inferno-1044.firebaseapp.com",
        databaseURL: "https://brilliant-inferno-1044.firebaseio.com",
        storageBucket: "brilliant-inferno-1044.appspot.com",
    };
    firebase.initializeApp(config);
  }

  // Firebase User Properties
  //-----------------------------------------------------
  onAuthStateChanged(_function) {
    return firebase.auth().onAuthStateChanged((_currentUser) => {
      if (_currentUser) {
        _function(_currentUser);
      } else {
        _function(null)
      }
    })
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

  /*createUserObservable(credentials) {
    return new Observable(observer => {
      return firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((authData) => {
          observer.next(authData)
      }).catch((_error) => {
          observer.error(_error)
      })
    });
  }*/

  createUser(credentials) {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(function() {
        resolve();
      }).catch(function(error) {
        reject(error);
      });
    });
  }

  /*loginObservable(credentials) {
    var that = this
    return new Observable(observer => {
      return firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(function (authData) {
            observer.next(authData)
        }).catch(function (_error) {
            observer.error(_error)
        })
    });
  }*/

  login(credentials) {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(function() {
        resolve();
      }).catch(function(error) {
        reject(error);
      });
    });
  }

  // PREFERENCES
  //-----------------------------------------------------
  myPreferences = {
    defaultbalance: '',
    defaultdate: '',
    usetouchid: ''
  } 
  
  createDefaultPreferences() {
    // After a user signs up we want to create some basic defaults
    this.myPreferences.defaultdate = 'none';
    this.myPreferences.defaultbalance = 'current';
    this.myPreferences.usetouchid = 'false';
    this.saveMyPreferences();
  }  

  getMyPreferences() {
    firebase.database().ref('/members/' + this.uid() + '/mypreferences').once('value', snapshot => {
      this.myPreferences = snapshot.val();
    }).catch(function(error) {
        //console.log(error);
    });
  }

  saveMyPreferences() {
    firebase.database().ref('members/' + this.uid() + "/mypreferences").update(this.myPreferences);
  }

  // DEFAULT DATE PREFERENCES
  //-----------------------------------------------------
  defaultDateOptions = [
          { text: 'No default date', value: 'none' },
          { text: 'Today\'s date', value: 'today' },
          { text: 'Last date used', value: 'last' }];

  getDefaultDateOptions() {
    return this.defaultDateOptions;
  }
  getDefaultDateText(valueKey: string) {
    return this.getText(valueKey,this.defaultDateOptions);
  }
  getDefaultDateSelected() {
    return this.myPreferences.defaultdate;
  }
  getDefaultDateSelected_Text() {
    return this.getDefaultDateText(this.myPreferences.defaultdate);
  }
  pickDefaultDateSelected(valueKey: string) {
    this.myPreferences.defaultdate = valueKey;
  }

  // DEFAULT BALANCE PREFERENCES
  //-----------------------------------------------------
  defaultBalanceOptions = [
          { text: 'Current Balance', value: 'current' },
          { text: 'Cleared Balance', value: 'clear' },
          { text: 'Today\'s Balance', value: 'today' }];

  getDefaultBalanceOptions() {
    return this.defaultBalanceOptions;
  }
  getDefaultBalanceText(valueKey: string) {
    return this.getText(valueKey,this.defaultBalanceOptions);
  }  
  getDefaultBalanceSelected() {
    return this.myPreferences.defaultbalance;
  }
  getDefaultBalanceSelected_Text() {
    return this.getDefaultBalanceText(this.myPreferences.defaultbalance);
  }  
  pickDefaultBalanceSelected(valueKey: string) {
    this.myPreferences.defaultbalance = valueKey;
  }

  // DEFAULT SECURITY PREFERENCES
  //-----------------------------------------------------
  getDefaultSecuritySelected() {
    return this.myPreferences.usetouchid;
  }
  pickDefaultSecuritySelected(valueKey: string) {
    this.myPreferences.usetouchid = valueKey;
  }
  
  // PERSONAL PROFILE
  //-----------------------------------------------------
  myInfo = {
    'datecreated': '',
    'dateupdated': '',
    'email': '',
    'firstname': '',
    'lastname': '',
    'groupadmin': '',
    'groupname': '',
    'groupnumber': '',
    'groupjoincode': '',
    'groupid': ''
  }

  getUserProfile() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('members/' + this.uid()).once('value', snapshot => {
          resolve(snapshot.val());
      })
    })
  }

  saveUserProfile(user) {
    firebase.database().ref('members/' + this.uid() + "/myinfo").update(this.myInfo);
  }

  updateEmail(newEmail: string) {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      let user = firebase.auth().currentUser;
      user.updateEmail(newEmail)
      .then(function() {
        resolve();
      }).catch(function(error) {
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

  // GLOBAL
  //-----------------------------------------------------
  getText(valueKey: string, arr) {
    if (valueKey === undefined || valueKey === '') {
      return '';
    } else {
      for (var i=0; i < arr.length; i++) {
        if (arr[i].value === valueKey) {
          return arr[i].text;
        }
      }
    }
  }

}