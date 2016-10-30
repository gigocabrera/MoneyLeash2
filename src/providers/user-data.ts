import { Injectable } from '@angular/core';

import 'rxjs';

// firebase/angularfire
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

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
  colors;

  constructor(public af: AngularFire) {

    this.userdata = firebase.database().ref('/users/');
    this.housedata = firebase.database().ref('/houses/');
    this.profilepicdata = firebase.storage().ref('/profilepics/');

    //this.colors = {'navbar': "energized"};
    this.colors = {'navbar': ""};

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

  login(credentials) {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      this.af.auth.login({email: credentials.email,password: credentials.password})
      .then((authData) => {
        this.userauth = authData;
        this.getUserData();
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
      profilepic: 'http://www.gravatar.com/avatar?d=mm&s=140',
      accounttypescount: '6'
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
    this.user.houseid = this.housedata.push().key;

    // Save key into the user->houseid node 
    this.userdata.child(this.userauth.uid).update({houseid : this.user.houseid});

    // Add member to housemembers node under Houses
    this.housedata.child(this.user.houseid + "/housemembers/" + this.userauth.uid).update(housemember);

  }

  createDefaultAccountTypes() {

    // default account types
    var refTypes = this.housedata.child(this.user.houseid + "/memberaccounttypes/");
    refTypes.push({ name: 'Checking', icon: 'ios-cash-outline' });
    refTypes.push({ name: 'Savings', icon: 'ios-cash-outline' });
    refTypes.push({ name: 'Credit Card', icon: 'ios-cash-outline' });
    refTypes.push({ name: 'Debit Card', icon: 'ios-cash-outline' });
    refTypes.push({ name: 'Investment', icon: 'ios-cash-outline' });
    refTypes.push({ name: 'Brokerage', icon: 'ios-cash-outline' });

  }

  createDefaultCategoriesIncome() {

    // default income categories
    var refCatIncome = this.housedata.child(this.user.houseid + "/membercategories/Income");
    refCatIncome.push({ categoryname: 'Income', categoryparent: '', categorysort: 'Income', categorytype: 'Income' });
    refCatIncome.push({ categoryname: 'Beginning Balance', categoryparent: 'Income', categorysort: 'Income:Beginning Balance', categorytype: 'Income' });

  }

  createDefaultCategoriesExpense() {

    // default expense categories
    var refCatExpense = this.housedata.child(this.user.houseid + "/membercategories/Expense");
    refCatExpense.push({ categoryname: 'Auto', categoryparent: '', categorysort: 'Auto', categorytype: 'Expense' });
    refCatExpense.push({ categoryname: 'Gasoline', categoryparent: 'Auto', categorysort: 'Auto:Gas', categorytype: 'Expense' });
    refCatExpense.push({ categoryname: 'Car Payment', categoryparent: 'Auto', categorysort: 'Auto:Car Payment', categorytype: 'Expense' });

  }

  createDefaultPayees() {

    // default payees
    var refPayee = this.housedata.child(this.user.houseid + "/memberpayees");
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

  getUserData() { 
    const thisuser$ : FirebaseObjectObservable<any> = this.af.database.object('/users/' + this.userauth.uid); 
    thisuser$.subscribe((val) => {
      this.user = val;
    });
  }

  getAccountTypes(): FirebaseListObservable<any[]> {
    return this.af.database.list('/houses/' + this.user.houseid + '/memberaccounttypes');
  }

  updateTouchID(ischecked: boolean) {
    this.userdata.child(this.userauth.uid).update({'enabletouchid' : ischecked});
  }

  updateDefaultBalance(newdefaultbalance: string) {
    this.userdata.child(this.userauth.uid).update({'defaultbalance' : newdefaultbalance});
  }

  updateDefaultDate(newdefaultdate: string) {
    this.userdata.child(this.userauth.uid).update({'defaultdate' : newdefaultdate});
  }

  updateName(newname: string) {
    this.userdata.child(this.userauth.uid).update({'fullname' : newname});
  }

  updateAccountTypesCounter(operation: string) {
    var count = parseInt(this.user.accounttypescount);
    if (operation === 'add') {
      count++;
    } else {
      count--;
    }
    this.userdata.child(this.userauth.uid).update({'accounttypescount' : count});
  }

  updateEmail(newEmail: string) {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      let user = firebase.auth().currentUser;
      user.updateEmail(newEmail)
      .then(function() {
        this.user.email = newEmail;
        this.updateEmailNode(newEmail);
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

  deleteData() {
    //
    // Delete ALL user data
    this.housedata.child(this.user.houseid).remove();
    this.userdata.child(firebase.auth().currentUser.uid).remove();
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
    this.userdata.child(this.userauth.uid).update({'email' : newemail});
  }

  addAccountType(item) {
    this.housedata.child(this.user.houseid + "/memberaccounttypes/").push({ name: item.name, icon: item.icon });
    this.updateAccountTypesCounter('add');
  }

  deleteAccountType(item) {
    this.housedata.child(this.user.houseid + '/memberaccounttypes/' + item.$key).remove();
    this.updateAccountTypesCounter('delete');
  }

  updateAccountType(item) {
    this.housedata.child(this.user.houseid + '/memberaccounttypes/' + item.$key).update({ 'name' : item.name, 'icon' : item.icon });
  }

  handleData(snap)
  {
    try {
      // Firebase stores everything as an object, but we want an array.
      var keys = Object.keys(snap.val);
      console.log('keys: ', keys, snap.val);
      // variable to store the todos added
      var data = [];
      // Loop through the keys and push the todos into an array
      for( var i = 0; i < keys.length; ++i)
      {
        data.push(snap.val()[keys[i]]);
      }
      console.log(data);
    }
    catch (error) {
      console.log('catching', error);
    }
  }

  //
  // ACCOUNTS
  //
  getAllAccounts() {
    return this.housedata.child(this.user.houseid + '/memberaccounts');
  }

  addAccount(account) {
    var newACcount = {
        'accountname': account.accname,
        'accounttype': account.type,
        'autoclear': 'false',
        'balancecleared': '0',
        'balancecurrent': '0',
        'balancetoday': '0',
        'dateopen': account.date,
        'transactionid': '',
        'balanceclass': 'textRed'
    }
    this.housedata.child(this.user.houseid + "/memberaccounts/").push(newACcount);
  }

  updateAccount(account) {
    this.housedata.child(this.user.houseid + '/memberaccounts/' + account.$key).update({ 'accountname' : account.accountname, 'accounttype' : account.accounttype, 'dateopen' : account.dateopen });
  }

  deleteAccount(account) {
    this.housedata.child(this.user.houseid + '/memberaccounts/' + account.$key).remove();
  }

  //
  // CATEGORIES
  //
  getAllCategories() {
    return this.af.database.list('/houses/' + this.user.houseid + '/membercategories', { preserveSnapshot: true});
  }

  addCategory(category) {
    var newCategory = {
        'accountname': category.accname,
        'accounttype': category.type,
        'autoclear': 'false',
        'balancecleared': '0',
        'balancecurrent': '0',
        'balancetoday': '0',
        'dateopen': category.date,
        'transactionid': '',
        'balanceclass': 'textRed'
    }
    this.housedata.child(this.user.houseid + "/membercategories/").push(newCategory);
  }

  updateCategory(category) {
    //this.housedata.child(this.user.houseid + '/membercategories/' + category.$key).update({ 'accountname' : category.accountname, 'accounttype' : category.accounttype, 'dateopen' : category.dateopen });
  }

  deleteCategory(category) {
    //this.housedata.child(this.user.houseid + '/membercategories/' + category.$key).remove();
  }

  /*
  // Find an item in the array
  //http://stackoverflow.com/questions/2713599/how-do-i-select-an-item-out-of-a-javascript-array-when-i-only-know-a-value-for-o
  find_in_array(arr, name, value) {
    for (var i = 0, len = arr.length; i<len; i++) {
        if (name in arr[i] && arr[i][name] == value) return i;
    };
    return false;
  }
  var id = find_in_array(measurements.page[0].line, 'lineid', 22);
  */
   
}