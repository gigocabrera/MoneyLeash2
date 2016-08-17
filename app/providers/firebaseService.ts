import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs/ReplaySubject';

// myInfo model
import {MyInfo} from './myinfo.model';
import {MyHouse} from './myhouse.model';

// Firebase
declare var firebase: any;

@Injectable()
export class FirebaseService {

  constructor() {}

  // Firebase User Properties
  //-----------------------------------------------------
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

  // CREATE INITIAL SETUP 
  //-----------------------------------------------------
  createInitialSetup(credentials) {

    // Create myinfo node in Firebase to hold user details
    var user = new MyInfo();
    user.fullname = credentials.fullname;
    user.email = this.currentUserEmail();
    this.saveUserProfile(user);

    // Create default preferences for new user
    this.createDefaultPreferences();

    // House information under Users node in Firebase
    var myhouse = new MyHouse();
    myhouse.housenumber = this.RandomHouseCode();
    this.saveMyHouse(myhouse);

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

  // MyHouse POINTER
  //-----------------------------------------------------
  myHousePointer = {
    houseid: '',
    housenumber: ''
  } 

  getMyHouse() {
    firebase.database().ref('/users/' + this.uid() + '/myhouse').once('value', snapshot => {
      this.myHousePointer = snapshot.val();
    }).catch(function(error) {
        //console.log(error);
    });
  }

  saveMyHouse(myhouse) {
    firebase.database().ref('/users/' + this.uid() + '/myhouse').update(myhouse);
  }

  // HOUSE MAIN DATA
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
    this.myHousePointer.houseid = key;

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
  myAccTypes = {
    name: '',
    icon: ''
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

  saveAccountType() {
    //firebase.database().ref('/users/' + this.uid() + '/mypreferences').update(this.myPreferences);
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