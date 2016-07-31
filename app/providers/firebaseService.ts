import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

// myInfo model
import {MyInfo} from './myinfo.model';
import {MyHouse} from './myhouse.model';

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

  loginauto(useremail, userpwd) {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      firebase.auth().signInWithEmailAndPassword(useremail, userpwd)
      .then(function() {
        resolve();
      }).catch(function(error) {
        reject(error);
      });
    });
  }

  // CREATE INITIAL SETUP 
  //-----------------------------------------------------
  createInitialSetup(credentials) {

    // Create myinfo node in Firebase to hold user details
    var user = new MyInfo();
    user.namefirst = this.parseEmail(credentials.email);
    this.saveUserProfile(user);

    // Create default preferences for new user
    this.createDefaultPreferences();

    // House information under Users node in Firebase
    var house = new MyHouse();
    house.housenumber = this.RandomHouseCode();
    this.saveHouse(house);

    // Create new house under houses in Firebase for new user
    this.createHouse(credentials);
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
    firebase.database().ref('/users/' + this.uid() + '/mypreferences').once('value', snapshot => {
      this.myPreferences = snapshot.val();
    }).catch(function(error) {
        //console.log(error);
    });
  }

  saveMyPreferences() {
    firebase.database().ref('/users/' + this.uid() + '/mypreferences').update(this.myPreferences);
  }

  // HOUSE DATA
  //-----------------------------------------------------
  getHouse() {
    
  }

  saveHouse(house) {
    firebase.database().ref('/users/' + this.uid() + '/myhouse').update(house);
  }

  // HOUSE DATA
  //-----------------------------------------------------
  createHouse(credentials) {
    
    // Set basic house defaults
    var housemember = {
        isadmin: true,
        createdby: credentials.email,
        dateCreated: firebase.database['ServerValue']['TIMESTAMP'], 
    };

    // Create a new node under houses and get the key
    var key = firebase.database().ref('houses').push().key;

    // Save reference of new house key to the myhouses.houseid node 
    firebase.database().ref('/users/' + this.uid() + '/myhouse').update({houseid : key});

    // Save reference of new key to the myhouses.houseid node
    firebase.database().ref('/houses/' + key + "/housemembers/" + this.uid()).update(housemember);

    // Save default Account Types
    var refTypes = firebase.database().ref('/houses/' + key + "/memberaccounttypes/");
    refTypes.push({ name: 'Checking', icon: '0' });
    refTypes.push({ name: 'Savings', icon: '0' });
    refTypes.push({ name: 'Credit Card', icon: '0' });
    refTypes.push({ name: 'Debit Card', icon: '0' });
    refTypes.push({ name: 'Investment', icon: '0' });
    refTypes.push({ name: 'Brokerage', icon: '0' });

    // Save default categories
    var refCatIncome = firebase.database().ref('/houses/' + key + "/membercategories/Income");
    refCatIncome.push({ categoryname: 'Income', categoryparent: '', categorysort: 'Income', categorytype: 'Income' });
    refCatIncome.push({ categoryname: 'Beginning Balance', categoryparent: 'Income', categorysort: 'Income:Beginning Balance', categorytype: 'Income' });

    var refCatExpense = firebase.database().ref('/houses/' + key + "/membercategories/Expense");
    refCatExpense.push({ categoryname: 'Auto', categoryparent: '', categorysort: 'Auto', categorytype: 'Expense' });
    refCatExpense.push({ categoryname: 'Gasoline', categoryparent: 'Auto', categorysort: 'Auto:Gas', categorytype: 'Expense' });
    refCatExpense.push({ categoryname: 'Car Payment', categoryparent: 'Auto', categorysort: 'Auto:Car Payment', categorytype: 'Expense' });

    // Save default Payees
    var refPayee = firebase.database().ref('/houses/' + key + "/memberpayees");
    refPayee.push({ lastamount: '', lastcategory: '', lastcategoryid: '', payeename: 'Beginning Balance' });
  }

  getMember() {
    
  }

  saveMember(house) {
    //this.usersRef(this.uid() + "/myhouse").update(house);
  }

  // ACCOUNT TYPES
  //-----------------------------------------------------
  getMyAccountTypes() {
    
  }

  createDefaultAccountTypes() {
    var refTypes = firebase.database().ref('houses/' + this.uid() + "/mypreferences");
    refTypes.push({ name: 'Checking', icon: '0' });
    refTypes.push({ name: 'Savings', icon: '0' });
    refTypes.push({ name: 'Credit Card', icon: '0' });
    refTypes.push({ name: 'Debit Card', icon: '0' });
    refTypes.push({ name: 'Investment', icon: '0' });
    refTypes.push({ name: 'Brokerage', icon: '0' });
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
  getUserProfile() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/users/' + this.uid()).once('value', snapshot => {
          resolve(snapshot.val());
      })
    })
  }

  saveUserProfile(user) {
    firebase.database().ref('/users/' + this.uid() + "/myinfo").update(user);
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
  parseEmail(emailAddress) {
    return emailAddress.substring(0, emailAddress.indexOf("@"));
  }
  RandomHouseCode() {
      return Math.floor((Math.random() * 100000000) + 100);
  }

}