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

onAuthStateChanged(_function) {
  return firebase.auth().onAuthStateChanged((_currentUser) => {
    if (_currentUser) {
      console.log("User " + _currentUser.uid + " is logged in with " + _currentUser.provider);
      _function(_currentUser);
    } else {
      console.log("User is logged out");
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

logout() {
  return firebase.auth().signOut()
}

createUser(credentials) {
  return new Observable(observer => {
      return firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then((authData) => {
            //console.log("User created successfully with payload-", authData);
            observer.next(authData)
        }).catch((_error) => {
            console.log("Login Failed!", _error);
            observer.error(_error)
        })
    });
  }

  login(credentials) {
    var that = this
    return new Observable(observer => {
      return firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(function (authData) {
            //console.log("Authenticated successfully with payload-", authData);
            observer.next(authData)
        }).catch(function (_error) {
            console.log("Login Failed!", _error);
            observer.error(_error)
        })
    });
  }

  // PERSONAL PROFILE
  getUserProfile() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('members/' + this.uid()).once('value', snapshot => {
          resolve(snapshot.val());
      })
    })
  }

  saveUserProfile(user) {
    /*firebase.database().child('members').child(firebase.User.uid).update(user);*/
  }

  // PREFERENCES
  createPreferences() {
    /*var refPref = firebase.database().child("members").child(firebase.User.uid).child("mypreferences");
    refPref.update({defaultdate: 'none'});
    refPref.update({defaultbalance: 'current'});*/
  }  
  
  loadPreferences() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/members/' + this.uid() + '/mypreferences').once('value', snapshot => {
          resolve(snapshot.val());
      })
    })
  }  

  // GLOBAL
  getText(valueKey, arr) {
    for (var i=0; i < arr.length; i++) {
      if (arr[i].value === valueKey) {
        return arr[i].text;
      }
    }
  }
  
  // PREFERENCES
  myPreferences: {
    defaultdate?: string, 
    defaultbalance?: string,
    usetouchid?: string
  } = {};
  
  savePreferences() {
    /*firebase.database().child('members').child(firebase.User.uid).child("mypreferences").update(pref);*/
  }

  // DEFAULT DATE PREFERENCES
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
  
  // DEFAULT BALANCE PREFERENCES
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
  
  // DEFAULT SECURITY PREFERENCES
  getDefaultSecuritySelected() {
    return this.myPreferences.usetouchid;
  }
  pickDefaultSecuritySelected(valueKey) {
    this.myPreferences.usetouchid = valueKey;
  }

  // PERSONAL PROFILE
  loadGlobalData() {
    this.loadPreferences().then(thisPreferences => {
      this.myPreferences = thisPreferences;
    });
  }

}
