import { Injectable } from '@angular/core';

import { LoadingController } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';

import 'rxjs';
import * as moment from 'moment';

// firebase/angularfire
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { Account, IAccount } from '../models/account.model';
import { Transaction, ITransaction } from '../models/transaction.model';

@Injectable()
export class UserData {
  
  loading: any;
  storagetouchid = '';
  storageemail = '';
  storagepwd = '';
  appversion = '';
  user;
  userauth;
  userdata;
  housedata;
  profilepicdata;
  userSettings;

  constructor(
    public af: AngularFire,
    public loadingCtrl: LoadingController) {

    this.userdata = firebase.database().ref('/users/');
    this.housedata = firebase.database().ref('/houses/');
    this.profilepicdata = firebase.storage().ref('/profilepics/');

  }

  LoadingControllerShow() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Please wait...',
    });
    this.loading.present();
  }

  LoadingControllerDismiss() {
    this.loading.dismiss();
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
        this.saveLocalStorage(credentials);
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
        this.saveLocalStorage(credentials);
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }

  logout() {
    return firebase.auth().signOut();
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
    var refTypes = this.housedata.child(this.user.houseid + "/accounttypes/");
    refTypes.push({ name: 'Checking', icon: 'ios-cash-outline' });
    refTypes.push({ name: 'Savings', icon: 'ios-cash-outline' });
    refTypes.push({ name: 'Credit Card', icon: 'ios-cash-outline' });
    refTypes.push({ name: 'Debit Card', icon: 'ios-cash-outline' });
    refTypes.push({ name: 'Investment', icon: 'ios-cash-outline' });
    refTypes.push({ name: 'Brokerage', icon: 'ios-cash-outline' });

  }

  createDefaultCategoriesIncome() {

    // default income categories
    var refCatIncome = this.housedata.child(this.user.houseid + "/categories/Income");
    refCatIncome.push({ categoryname: 'Income', categoryparent: '', categorysort: 'Income', categorytype: 'Income' });
    refCatIncome.push({ categoryname: 'Beginning Balance', categoryparent: 'Income', categorysort: 'Income:Beginning Balance', categorytype: 'Income' });

  }

  createDefaultCategoriesExpense() {

    // default expense categories
    var refCatExpense = this.housedata.child(this.user.houseid + "/categories/Expense");
    refCatExpense.push({ categoryname: 'Auto', categoryparent: '', categorysort: 'Auto', categorytype: 'Expense' });
    refCatExpense.push({ categoryname: 'Gasoline', categoryparent: 'Auto', categorysort: 'Auto:Gas', categorytype: 'Expense' });
    refCatExpense.push({ categoryname: 'Car Payment', categoryparent: 'Auto', categorysort: 'Auto:Car Payment', categorytype: 'Expense' });

  }

  createDefaultPayees() {

    // default payees
    var refPayee = this.housedata.child(this.user.houseid + "/payees");
    refPayee.push({ lastamount: '', lastcategory: '', lastcategoryid: '', payeename: 'Beginning Balance' });

  }

  RandomHouseCode() {
    return Math.floor((Math.random() * 100000000) + 100);
  }

  //
  // NATIVE STORAGE
  //-----------------------------------------------------------------------
  saveLocalStorage(credentials) {
    this.setUserEmail(credentials.email);
    this.setUserPwd(credentials.password);
  }

  setUserEmail(email) {
    NativeStorage.setItem('storageemail', {property: email})
    .then(
      () => console.log('Stored item!'),
      error => console.error('Error storing item', error)
    );
  }
  getStorageEmail() {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      NativeStorage.getItem('storageemail')
      .then((data) => {
        this.storageemail = data.property;
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }
  setUserPwd(pwd) {
    NativeStorage.setItem('storagepwd', {property: pwd})
    .then(
      () => console.log('Stored item!'),
      error => console.error('Error storing item', error)
    );
  }
  getStoragePwd() {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      NativeStorage.getItem('storagepwd')
      .then((data) => {
        this.storagepwd = data.property;
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }
  setUserTouchID(touchid) {
    NativeStorage.setItem('storagetouchid', {property: touchid})
    .then(
      () => console.log('Stored item!'),
      error => console.error('Error storing item', error)
    );
  }
  getStorageTouchID() {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      NativeStorage.getItem('storagetouchid')
      .then((data) => {
        this.storagetouchid = data.property;
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }
  clearNativeStorage() {
    NativeStorage.clear();
  }

  //
  // PERSONAL PROFILE
  //-----------------------------------------------------------------------

  getUserData() { 
    const thisuser$ : FirebaseObjectObservable<any> = this.af.database.object('/users/' + this.userauth.uid); 
    thisuser$.subscribe((val) => {
      this.user = val;
    });
  }

  updateTouchID(ischecked: boolean) {
    this.setUserTouchID(ischecked);
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
    this.profilepicdata.child(firebase.auth().currentUser.uid).child('profilepicture.png')
    .putString(pic, 'base64', {contentType: 'image/png'}).then((savedpicture) => {
      this.userdata.child(firebase.auth().currentUser.uid).update({'profilepic' : savedpicture.downloadURL});
    });
  }

  updateEmailNode(newemail) {
    this.userdata.child(this.userauth.uid).update({'email' : newemail});
  }

  //
  // ACCOUNT TYPES
  //-----------------------------------------------------------------------

  getAccountTypes(): FirebaseListObservable<any[]> {
    return this.af.database.list('/houses/' + this.user.houseid + '/accounttypes');
  }

  addAccountType(item) {
    this.housedata.child(this.user.houseid + "/accounttypes/").push({ name: item.name, icon: item.icon });
    this.updateAccountTypesCounter('add');
  }

  deleteAccountType(item) {
    this.housedata.child(this.user.houseid + '/accounttypes/' + item.$key).remove();
    this.updateAccountTypesCounter('delete');
  }

  updateAccountType(item) {
    this.housedata.child(this.user.houseid + '/accounttypes/' + item.$key).update({ 'name' : item.name, 'icon' : item.icon });
  }

  //
  // ACCOUNTS
  //-----------------------------------------------------------------------

  getAccounts() {
    // DO NOT USE:
    // this method produces a weird result where the list is returned sorted (as expected) the first time
    // you visit the page, but is not sorted every subsequent time you visit the page and multiplies the list
    return this.af.database.list('/houses/' + this.user.houseid + '/accounts', {
      query: {
        orderByChild: 'accounttype'
      }
    });
  }

  getAllAccounts() {
    return this.housedata.child(this.user.houseid + '/accounts').orderByChild('accounttype');
  }

  addAccount(account) {
    var newACcount = {
        'accountname': account.accountname,
        'accounttype': account.accounttype,
        'autoclear': 'false',
        'balancecleared': '0',
        'balancecurrent': '0',
        'balancetoday': '0',
        'dateopen': account.dateopen,
        'transactionid': '',
        'balanceclass': 'textRed'
    }
    this.housedata.child(this.user.houseid + "/accounts/").push(newACcount);
  }

  updateAccount(account) {
    this.housedata.child(this.user.houseid + '/accounts/' + account.$key).update({ 'accountname' : account.accountname, 'accounttype' : account.accounttype, 'dateopen' : account.dateopen });
  }

  deleteAccount(account) {
    this.housedata.child(this.user.houseid + '/accounts/' + account.$key).remove();
  }

  //
  // TRANSACTIONS
  //-----------------------------------------------------------------------

  getAllTransactionsByDate(account) {
    return this.housedata.child(this.user.houseid + '/transactions/' + account.$key).orderByChild('date');
  }
  getTransactionsByDate(account) {
    return this.housedata.child(this.user.houseid + '/transactions/' + account.$key).orderByChild('date').limitToLast(50);
  }
  getTransactionsByDateCustom(account, limit) {
    return this.housedata.child(this.user.houseid + '/transactions/' + account.$key).orderByChild('date').limitToLast(limit);
  }

  addTransaction(transaction, account) {
    var newTransaction = {
      'ClearedClass': transaction.ClearedClass,
      'accountFrom': transaction.accountFrom,
      'accountFromId': transaction.accountFromId,
      'accountTo': transaction.accountTo,
      'accountToId': transaction.accountToId,
      'addedby': transaction.addedby,
      'amount': transaction.amount,
      'category': transaction.category,
      'categoryid': transaction.categoryid,
      'clearedBal': transaction.clearedBal,
      'date': transaction.date,
      'iscleared': transaction.iscleared,
      'isphoto': transaction.isphoto,
      'isrecurring': transaction.isrecurring,
      'istransfer': transaction.istransfer,
      'notes': transaction.notes,
      'payee': transaction.payee,
      'payeeid': transaction.payeeid,
      'photo': transaction.photo,
      'runningbal': transaction.runningbal,
      'type': transaction.type,
      'typedisplay': transaction.typedisplay,
      'mode': transaction.mode,
      'checked': transaction.checked 
    }
    this.housedata.child(this.user.houseid + '/transactions/' + account.$key + "/").push(newTransaction);
  }

  updateTransaction(transaction, account) {

    this.housedata.child(this.user.houseid + '/transactions/' + account.$key + "/" + transaction.$key).update({ 
      'ClearedClass': transaction.ClearedClass,
      'accountFrom': transaction.accountFrom,
      'accountFromId': transaction.accountFromId,
      'accountTo': transaction.accountTo,
      'accountToId': transaction.accountToId,
      'addedby': transaction.addedby,
      'amount': transaction.amount,
      'category': transaction.category,
      'categoryid': transaction.categoryid,
      'clearedBal': transaction.clearedBal,
      'date': transaction.date,
      'iscleared': transaction.iscleared,
      'isphoto': transaction.isphoto,
      'isrecurring': transaction.isrecurring,
      'istransfer': transaction.istransfer,
      'notes': transaction.notes,
      'payee': transaction.payee,
      'payeeid': transaction.payeeid,
      'photo': transaction.photo,
      'runningbal': transaction.runningbal,
      'type': transaction.type,
      'typedisplay': transaction.typedisplay,
      'mode': transaction.mode,
      'checked': transaction.checked 
    });
  }

  deleteTransaction(transaction) {
    //this.housedata.child(this.user.houseid + '/accounts/' + account.$key).remove();
  }

  updateTransactionAndBalances(account: IAccount, transaction: ITransaction) {
    this.housedata.child(this.user.houseid + '/transactions/' + account.$key + '/' + transaction.$key).update({ 'runningbal' : transaction.runningbal, 'clearedBal' : transaction.clearedBal, 'iscleared' : transaction.iscleared });
  }

  updateAccountWithTotals(account: IAccount) {
    
    // Update account with totals
    var refAccount = this.housedata.child(this.user.houseid + '/accounts/' + account.$key);
    refAccount.update({
      'balancecleared' : account.balancecleared,
      'balancecurrent' : account.balancecurrent,
      'balancetoday' : account.balancetoday,
      'totaltransactions' : account.totaltransactions,
      'totalclearedtransactions' : account.totalclearedtransactions,
      'totalpendingtransactions' : account.totalpendingtransactions
    });
    
  }

  //
  // CATEGORIES
  //-----------------------------------------------------------------------
  
  getAllCategories() {
    return this.af.database.list('/houses/' + this.user.houseid + '/categories', { preserveSnapshot: true});
  }
  getIncomeCategories() {
    return this.housedata.child(this.user.houseid + '/categories/Income').orderByChild('categorysort');
  }
  getExpenseCategories() {
    return this.housedata.child(this.user.houseid + '/categories/Expense').orderByChild('categorysort');
  }
  getParentCategories(type) {
    return this.housedata.child(this.user.houseid + '/categories/' + type).orderByChild('categorysort');
  }

  addCategory(category) {
    var newCategory = {
        'categoryname': category.categoryname,
        'categorytype': category.categorytype,
        'categoryparent': category.categoryparent,
        'categorysort': category.categorysort
    }
    this.housedata.child(this.user.houseid + "/categories/" + category.categorytype).push(newCategory);
  }

  updateCategory(category) {
    this.housedata.child(this.user.houseid + '/categories/' +  category.categorytype + '/' + category.$key).update({ 'categoryname' : category.categoryname, 'categorytype' : category.categorytype, 'categoryparent' : category.categoryparent, 'categorysort' : category.categorysort });
  }

  deleteCategory(category) {
    this.housedata.child(this.user.houseid + '/categories/' +  category.categorytype + '/' + category.$key).remove();
  }

  //
  // PAYEES
  //-----------------------------------------------------------------------
  
  getPayees() {
    // DO NOT USE:
    // this method produces a weird result where the list is returned sorted (as expected) the first time
    // you visit the page, but is not sorted every subsequent time you visit the page and multiplies the list
    return this.af.database.list('/houses/' + this.user.houseid + '/payees', {
      query: {
        orderByChild: 'payeename'
      }
    });
  }

  getAllPayees() {
    return this.housedata.child(this.user.houseid + '/payees').orderByChild('payeename');
  }

  addPayee(payee) {
    var newPayee = {
        'lastamount': '',
        'lastcategory': '',
        'lastcategoryid': '',
        'payeename': payee.payeename
    }
    this.housedata.child(this.user.houseid + "/payees").push(newPayee);
  }

  updatePayee(payee) {
    this.housedata.child(this.user.houseid + '/payees/' +  payee.$key).update({ 'lastamount' : payee.lastamount, 'lastcategory' : payee.lastcategory, 'lastcategoryid' : payee.lastcategory, 'payeename' : payee.payeename });
  }

  deletePayee(payee) {
    this.housedata.child(this.user.houseid + '/payees/' +  payee.$key).remove();
  }

  //
  // MISCELANEOUS
  //-----------------------------------------------------------------------

  handleData(snapshot)
  {
    try {
      // Firebase stores everything as an object, but we want an array.
      var keys = Object.keys(snapshot.val);
      console.log('keys: ', keys, snapshot.val);
      // variable to store the todos added
      var data = [];
      // Loop through the keys and push the todos into an array
      for( var i = 0; i < keys.length; ++i)
      {
        data.push(snapshot.val()[keys[i]]);
      }
      console.log(data);
    }
    catch (error) {
      console.log('catching', error);
    }
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


  //
  // DATA MAINTENANCE
  //-----------------------------------------------------------------------

  houseMember() {
    
  }
  upgradeData() {
    this.copyAccounts();
    this.copyAccountTypes();
    this.copyCategories();
    this.copyPayees();
    this.copyTransactions();
    this.LoadingControllerDismiss();
  }
  copyAccounts() {
    this.copyFbRecord(this.housedata.child(this.user.houseid + '/memberaccounts'), this.housedata.child(this.user.houseid + '/accounts'));
  }
  copyAccountTypes() {
    this.copyFbRecord(this.housedata.child(this.user.houseid + '/memberaccounttypes'), this.housedata.child(this.user.houseid + '/accounttypes'));
  }
  copyCategories() {
    this.copyFbRecord(this.housedata.child(this.user.houseid + '/membercategories'), this.housedata.child(this.user.houseid + '/categories'));
  }
  copyPayees() {
    this.copyFbRecord(this.housedata.child(this.user.houseid + '/memberpayees'), this.housedata.child(this.user.houseid + '/payees'));
  }
  copyTransactions() {
    this.copyFbRecord(this.housedata.child(this.user.houseid + '/membertransactions'), this.housedata.child(this.user.houseid + '/transactions'));
  }

  // Move or copy a Firebase path to a new location
  // https://gist.github.com/katowulf/6099042
  copyFbRecord(oldRef, newRef) {
    oldRef.once('value', function(snap) {
      newRef.set( snap.val(), function(error) {
        if( error && typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
      });
    });
  }
  moveFbRecord(oldRef, newRef) {
    oldRef.once('value', function(snap) {
      newRef.set( snap.val(), function(error) {
        if( !error ) {  oldRef.remove(); }
        else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
      });
    });
  }

  syncAccountData(account) {
    
    var totalTransactions = 0;
    var totalClearedTransactions = 0;
    var runningBal = 0;
    var clearedBal = 0;
    var todayBal = 0;

    var ref = this.housedata.child(this.user.houseid + '/transactions/' + account.$key);
    var query = ref.orderByChild('date');

    query.once('value', (transactions) => {
      
      transactions.forEach( snapshot => {

        var transaction = snapshot.val();
        //
        // Handle Balances
        //
        totalTransactions++;
        transaction.ClearedClass = '';
        if (transaction.iscleared === true) {
          transaction.ClearedClass = 'transactionIsCleared';
          totalClearedTransactions++;
          if (transaction.type === "Income") {
            if (!isNaN(transaction.amount)) {
              clearedBal = clearedBal + parseFloat(transaction.amount);
            }
          } else if (transaction.type === "Expense") {
            if (!isNaN(transaction.amount)) {
              clearedBal = clearedBal - parseFloat(transaction.amount);
            }
          }
          transaction.clearedBal = clearedBal.toFixed(2);
        }
        if (transaction.type === "Income") {
          if (!isNaN(transaction.amount)) {
            runningBal = runningBal + parseFloat(transaction.amount);
            transaction.runningbal = runningBal.toFixed(2);
          }
        } else if (transaction.type === "Expense") {
          if (!isNaN(transaction.amount)) {
            runningBal = runningBal - parseFloat(transaction.amount);
            transaction.runningbal = runningBal.toFixed(2);
          }
        }
        //
        // Handle Notes
        //
        transaction.notes = transaction.note;
        //
        // Get today's balance
        // 
        var tranDate = moment(transaction.date)
        var now = moment();
        if (tranDate <= now) {
          todayBal = runningBal;
        }
        //
        // Update running balance for this transaction
        //
        ref.child(snapshot.key).update({runningbal : runningBal.toFixed(2)});
        //
        // Update cleared balance for this transaction
        //
        ref.child(snapshot.key).update({clearedBal : clearedBal.toFixed(2)});

      });

      var pendingTransactions = totalTransactions - totalClearedTransactions;
      console.log('total transactions: ' + totalTransactions.toFixed(0));
      console.log('total cleared transactions: ' + totalClearedTransactions.toFixed(0));
      console.log('total pending transactions: ' + pendingTransactions.toFixed(0));
      console.log('Balance cleared: ' + clearedBal.toFixed(2));
      console.log('Balance running: ' + runningBal.toFixed(2));
      console.log('Balance today: ' + todayBal.toFixed(2));

      // Update account with totals
      var refAccount = this.housedata.child(this.user.houseid + '/accounts/' + account.$key);
      refAccount.update({ 
        'balancecleared' : clearedBal.toFixed(2), 
        'balancecurrent' : runningBal.toFixed(2), 
        'balancetoday' : todayBal.toFixed(2),
        'totaltransactions' : totalTransactions.toFixed(0),
        'totalclearedtransactions' : totalClearedTransactions.toFixed(0),
        'totalpendingtransactions' : pendingTransactions.toFixed(0)
      });

    });
    this.LoadingControllerDismiss();
  }

  syncCategories(account) {
    //
    // Get all the transactions from this account 
    // and verify that a category exists in the categories node
    // If not, create it
    //
    var ref = this.housedata.child(this.user.houseid + '/transactions/' + account.$key);
    var query = ref.orderByChild('date');

    var refIncome = this.housedata.child(this.user.houseid + '/categories/Income');
    var refExpense = this.housedata.child(this.user.houseid + '/categories/Expense');

    var catsort: any;

    query.once('value', (transactions) => {
      transactions.forEach( snapshot => {
        var transaction = snapshot.val();
        //
        // Handle categories
        //
        if (transaction.type === 'Income') {          
          refIncome.child(transaction.categoryid).once('value', (snapshot) => {
            var cat = snapshot.val();
            if (cat === null) {
              catsort = transaction.category.toUpperCase();
              this.housedata.child(this.user.houseid + '/categories/Income/' + transaction.categoryid).update({ 'categoryname' : transaction.category, 'categorytype' : 'Income', 'categoryparent' : '', 'categorysort' : catsort });
            }
          });
        } else if (transaction.type === 'Expense') {
          refExpense.child(transaction.categoryid).once('value', (snapshot) => {
            var cat = snapshot.val();
            if (cat === null) {
              catsort = transaction.category.toUpperCase();
              this.housedata.child(this.user.houseid + '/categories/Expense/' + transaction.categoryid).update({ 'categoryname' : transaction.category, 'categorytype' : 'Income', 'categoryparent' : '', 'categorysort' : catsort });
            }
          });
        } else {
          console.log('missing category');
        }
      });
    });
    this.LoadingControllerDismiss();
  }

  syncPayees(account) {
    //
    // Get all the transactions from this account 
    // and verify that a category exists in the categories node
    // If not, create it
    //
    var ref = this.housedata.child(this.user.houseid + '/transactions/' + account.$key);
    var query = ref.orderByChild('date');

    var refPayee = this.housedata.child(this.user.houseid + '/payees');

    query.once('value', (transactions) => {
      transactions.forEach( snapshot => {
        var transaction = snapshot.val();
        //
        // Handle categories
        //
        refPayee.child(transaction.payeeid).once('value', (snapshot) => {
          var payee = snapshot.val();
          if (payee === null) {
            this.housedata.child(this.user.houseid + '/payees/' + transaction.payeeid).update({ 'payeename' : transaction.payee });
          }
        });
      });
    });
    this.LoadingControllerDismiss();
  }

}