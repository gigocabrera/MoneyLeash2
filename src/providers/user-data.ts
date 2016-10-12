import { Injectable } from '@angular/core';

import 'rxjs';

// firebase/angularfire
import { AngularFire } from 'angularfire2';

@Injectable()
export class UserData {
  
  username = '';
  userpwd = '';
  enabletouchid = '';
  appversion = '';
  currentuser;
  userdata;
  housedata;
  profilepicdata;
  userSettings;

  constructor(public af: AngularFire) {

    this.userdata = firebase.database().ref('/users/');
    this.housedata = firebase.database().ref('/houses/');
    this.profilepicdata = firebase.storage().ref('/profilepics/');

  }

  /**
  * Creates a new user using the plain vanilla Firebase SDK
  */
  createUser(credentials) {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      firebase.auth().createUserWithEmailAndPassword(credentials.username, credentials.password)     
      .then((authData) => {
        this.currentuser = authData;
        this.createInitialSetup(credentials);
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  }

  /**
  * Creates a new user and then logs the user in (AngularFire2). This is so cumbersome as the 
  * plain vanilla SDK createUserWithEmailAndPassword function signs in the user automatically
  */
  createUser2(credentials) {
    var creds: any = { email: credentials.username, password: credentials.password };
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      this.af.auth.createUser(creds)     
      .then((newUser) => {
        this.af.auth.login({email: credentials.username,password: credentials.password})
        .then((authData) => {
          this.currentuser = authData;
          resolve();
        })
      }).catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  login(credentials) {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      this.af.auth.login({email: credentials.username,password: credentials.password})     
      .then((authData) => {
        this.currentuser = authData;
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }

  createInitialSetup(credentials) {
    
    // Set basic user profile defaults
    var profile = {
      datecreated: firebase.database['ServerValue']['TIMESTAMP'],
      defaultbalance: 'Current',
      defaultdate: 'None',
      email: credentials.username,
      enabletouchid: 'false',
      fullname: credentials.fullname,
      housenumber: this.RandomHouseCode(),
      profilepic: 'http://www.gravatar.com/avatar?d=mm&s=140'
    };
    
    // Save user profile
    this.userdata.child(this.currentuser.uid).update(profile);

    // Create House node
    this.createHouse(credentials);
  }

  createHouse(credentials) {

    // Set basic house defaults
    var housemember = {
        isadmin: true,
        createdby: credentials.email,
        dateCreated: firebase.database['ServerValue']['TIMESTAMP'],
    };

    // Create node under houses and get the key
    var key = this.housedata.push().key;

    console.log(key);

    // Save key into the user->houseid node 
    this.userdata.child(this.currentuser.uid).update({houseid : key});

    console.log('key 0');
    console.log(this.housedata);
    console.log(this.currentuser.uid);
    console.log(housemember);

    // Add member to housemembers node under Houses
    this.af.database.object('/houses/' + key + '/housemembers/' + this.currentuser.uid).update(housemember);
    //this.housedata.child(key + "/housemembers/" + this.currentuser.uid).update(housemember);

    console.log('key 1');

    // Save default Account Types
    var refTypes = this.housedata.child(key + "/memberaccounttypes/");
    refTypes.push({ name: 'Checking', icon: 'fa fa-university' });
    refTypes.push({ name: 'Savings', icon: 'fa fa-life-ring' });
    refTypes.push({ name: 'Credit Card', icon: 'fa fa-credit-card' });
    refTypes.push({ name: 'Debit Card', icon: 'fa fa-credit-card' });
    refTypes.push({ name: 'Investment', icon: 'fa fa-suitcase' });
    refTypes.push({ name: 'Brokerage', icon: 'fa fa-suitcase' });

    console.log('key 2');

    // Save default categories
    var refCatIncome = this.housedata.child(key + "/membercategories/Income");
    refCatIncome.push({ categoryname: 'Income', categoryparent: '', categorysort: 'Income', categorytype: 'Income' });
    refCatIncome.push({ categoryname: 'Beginning Balance', categoryparent: 'Income', categorysort: 'Income:Beginning Balance', categorytype: 'Income' });

    console.log('key 3');

    var refCatExpense = this.housedata.child(key + "/membercategories/Expense");
    refCatExpense.push({ categoryname: 'Auto', categoryparent: '', categorysort: 'Auto', categorytype: 'Expense' });
    refCatExpense.push({ categoryname: 'Gasoline', categoryparent: 'Auto', categorysort: 'Auto:Gas', categorytype: 'Expense' });
    refCatExpense.push({ categoryname: 'Car Payment', categoryparent: 'Auto', categorysort: 'Auto:Car Payment', categorytype: 'Expense' });

    console.log('key 4');

    // Save default Payees
    var refPayee = this.housedata.child(key + "/memberpayees");
    refPayee.push({ lastamount: '', lastcategory: '', lastcategoryid: '', payeename: 'Beginning Balance' });

    console.log('key 5');

  }

  RandomHouseCode() {
      return Math.floor((Math.random() * 100000000) + 100);
  }

  saveLocalStorage(credentials) {
    this.setUsername(credentials.email);
    this.setUserPwd(credentials.password);
  }

  setUsername(username) {
    //this.storage.set('username', username);
  }

  setUserPwd(pwd) {
    //this.storage.set('userpwd', pwd);
  }

  setEnableTouchID(enabletouchid) {
    //this.storage.set('enabletouchid', enabletouchid);
  }

  getUsernameStorage() {
    /*return this.storage.get('username').then((value) => {
      return value;
    });*/
  }

  getPasswordStorage() {
    /*return this.storage.get('userpwd').then((value) => {
      return value;
    });*/
  }

  getEnableTouchIDStorage() {
    /*return this.storage.get('enabletouchid').then((value) => {
      return value;
    });*/
  }

  logout() {
    //return firebase.auth().signOut()
  }

  houseid() {
    return this.userSettings.houseid;
  }

  getUserData() {
    var snapProfile = this.af.database.object('/users/' + this.currentuser.uid, { preserveSnapshot: true });
    snapProfile.subscribe(snapshot => {
      this.userSettings = snapshot.val();
    })
  }

  getAccountTypes(paramHouseid) {
    return this.housedata.child(paramHouseid + '/memberaccounttypes');
  }

  updateTouchID(ischecked: boolean) {
    this.af.database.object('/users/' + this.currentuser.uid).update({'enabletouchid' : ischecked});
  }

  updateDefaultBalance(newdefaultbalance: string) {
    this.userSettings.defaultbalance = newdefaultbalance;
    this.af.database.object('/users/' + this.currentuser.uid).update({'defaultbalance' : newdefaultbalance});
  }

  updateDefaultDate(newdefaultdate: string) {
    this.userSettings.defaultdate = newdefaultdate;
    this.af.database.object('/users/' + this.currentuser.uid).update({'defaultdate' : newdefaultdate});
  }

  updateName(newname: string) {
    this.userSettings.fullname = newname;
    this.af.database.object('/users/' + this.currentuser.uid).update({'fullname' : newname});
  }

  updateEmail(newEmail: string) {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      let user = firebase.auth().currentUser;
      user.updateEmail(newEmail)
      .then(function() {
        resolve();
      }).catch(error => {
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

  deleteData(houseid) {
    //
    // Delete ALL user data
    /*this.housedata.child(houseid).remove();
    this.userdata.child(firebase.auth().currentUser.uid).remove();*/
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

  savePicture(pic) {
    /*this.profilepicdata.child(firebase.auth().currentUser.uid).child('profilepicture.png')
      .put(pic).then((savedpicture) => {
        this.userdata.child(firebase.auth().currentUser.uid).update({'profilepic' : savedpicture.downloadURL});
      });*/
  }

  updateEmailNode(newemail) {
    //this.userdata.child(firebase.auth().currentUser.uid).update({'email' : newemail});
  }

  updateAccountType(houseid: string, item) {
    //this.housedata.child(houseid + '/memberaccounttypes/' + item.id).update(item);
  }
   
}