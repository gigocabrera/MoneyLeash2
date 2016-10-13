import { Injectable } from '@angular/core';

import 'rxjs';

// firebase/angularfire
import { AngularFire } from 'angularfire2';

@Injectable()
export class UserData {
  
  enabletouchid = '';
  appversion = '';
  user;
  userauth;
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
      firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)     
      .then((authData) => {
        this.userauth = authData;
        this.user = credentials;
        this.createInitialSetup();
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /**
  * Creates a new user and then logs the user in (AngularFire2). This is so cumbersome as the 
  * plain vanilla SDK createUserWithEmailAndPassword function signs in the user automatically
  */
  createUser2(credentials) {
    var creds: any = { email: credentials.email, password: credentials.password };
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      this.af.auth.createUser(creds)     
      .then((newUser) => {
        this.af.auth.login({email: credentials.email,password: credentials.password})
        .then((authData) => {
          this.userauth = authData;
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
      this.af.auth.login({email: credentials.email,password: credentials.password})     
      .then((authData) => {
        this.userauth = authData;
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }

  createInitialSetup() {

    this.createUserProfile();
    this.createHouse();
    this.createDefaultAccountTypes();
    this.createDefaultCategoriesIncome();
    this.createDefaultCategoriesExpense();
    this.createDefaultPayees();

  }

  createUserProfile() {

    // Set basic user profile defaults
    var profile = {
      datecreated: firebase.database['ServerValue']['TIMESTAMP'],
      defaultbalance: 'Current',
      defaultdate: 'None',
      email: this.user.email,
      enabletouchid: 'false',
      fullname: this.user.fullname,
      housenumber: this.RandomHouseCode(),
      profilepic: 'http://www.gravatar.com/avatar?d=mm&s=140'
    };
    this.user.defaultbalance = profile.defaultbalance;
    this.user.defaultdate = profile.defaultdate;
    this.user.enabletouchid = profile.enabletouchid;
    this.user.profilepic = profile.profilepic;

    
    // Save user profile
    this.userdata.child(this.userauth.uid).update(profile);

  }

  createHouse() {

    // Set basic house defaults
    var housemember = {
        isadmin: true,
        createdby: this.user.email,
        dateCreated: firebase.database['ServerValue']['TIMESTAMP'],
    };

    // Create node under houses and get the key
    this.user.housekey = this.housedata.push().key;

    // Save key into the user->houseid node 
    this.userdata.child(this.userauth.uid).update({houseid : this.user.housekey});

    // Add member to housemembers node under Houses
    this.housedata.child(this.user.housekey + "/housemembers/" + this.userauth.uid).update(housemember);

  }

  createDefaultAccountTypes() {

    // default account types
    var refTypes = this.housedata.child(this.user.housekey + "/memberaccounttypes/");
    refTypes.push({ name: 'Checking', icon: 'ios-cash-outline' });
    refTypes.push({ name: 'Savings', icon: 'ios-cash-outline' });
    refTypes.push({ name: 'Credit Card', icon: 'ios-cash-outline' });
    refTypes.push({ name: 'Debit Card', icon: 'ios-cash-outline' });
    refTypes.push({ name: 'Investment', icon: 'ios-cash-outline' });
    refTypes.push({ name: 'Brokerage', icon: 'ios-cash-outline' });

  }

  createDefaultCategoriesIncome() {

    // default income categories
    var refCatIncome = this.housedata.child(this.user.housekey + "/membercategories/Income");
    refCatIncome.push({ categoryname: 'Income', categoryparent: '', categorysort: 'Income', categorytype: 'Income' });
    refCatIncome.push({ categoryname: 'Beginning Balance', categoryparent: 'Income', categorysort: 'Income:Beginning Balance', categorytype: 'Income' });

  }

  createDefaultCategoriesExpense() {

    // default expense categories
    var refCatExpense = this.housedata.child(this.user.housekey + "/membercategories/Expense");
    refCatExpense.push({ categoryname: 'Auto', categoryparent: '', categorysort: 'Auto', categorytype: 'Expense' });
    refCatExpense.push({ categoryname: 'Gasoline', categoryparent: 'Auto', categorysort: 'Auto:Gas', categorytype: 'Expense' });
    refCatExpense.push({ categoryname: 'Car Payment', categoryparent: 'Auto', categorysort: 'Auto:Car Payment', categorytype: 'Expense' });

  }

  createDefaultPayees() {

    // default payees
    var refPayee = this.housedata.child(this.user.housekey + "/memberpayees");
    refPayee.push({ lastamount: '', lastcategory: '', lastcategoryid: '', payeename: 'Beginning Balance' });

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
    return firebase.auth().signOut();
  }

  houseid() {
    return this.userSettings.houseid;
  }

  getUserData() {
    var snapProfile = this.af.database.object('/users/' + this.userauth.uid, { preserveSnapshot: true });
    snapProfile.subscribe(snapshot => {
      this.userSettings = snapshot.val();
    })
  }

  getAccountTypes(paramHouseid) {
    return this.housedata.child(paramHouseid + '/memberaccounttypes');
  }

  updateTouchID(ischecked: boolean) {
    this.af.database.object('/users/' + this.userauth.uid).update({'enabletouchid' : ischecked});
  }

  updateDefaultBalance(newdefaultbalance: string) {
    this.userSettings.defaultbalance = newdefaultbalance;
    this.af.database.object('/users/' + this.userauth.uid).update({'defaultbalance' : newdefaultbalance});
  }

  updateDefaultDate(newdefaultdate: string) {
    this.userSettings.defaultdate = newdefaultdate;
    this.af.database.object('/users/' + this.userauth.uid).update({'defaultdate' : newdefaultdate});
  }

  updateName(newname: string) {
    this.userSettings.fullname = newname;
    this.af.database.object('/users/' + this.userauth.uid).update({'fullname' : newname});
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