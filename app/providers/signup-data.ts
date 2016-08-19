import {Injectable} from '@angular/core';

declare var firebase: any;

@Injectable()
export class SignUpData {

  public user: any;
  public userdata: any;
  public housedata: any;

  constructor() {
    this.userdata = firebase.database().ref('/users/');
    this.housedata = firebase.database().ref('/houses/');
  }

  createUser(credentials) {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
    firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((user) => {
        this.user = user;
        resolve();
      }).catch(function(error) {
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
      email: credentials.email,
      enabletouchid: 'false',
      fullname: credentials.fullname,
      housenumber: this.RandomHouseCode(),
      profilepic: 'http://www.gravatar.com/avatar?d=mm&s=140'
    };

    // Save user profile
    this.userdata.child(this.user.uid).update(profile);

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

    // Save key into the user->houseid node 
    this.userdata.child(this.user.uid).update({houseid : key});

    // Add member to housemembers node under Houses
    this.housedata.child(key + "/housemembers/" + this.user.uid).update(housemember);

    // Save default Account Types
    var refTypes = this.housedata.child(key + "/memberaccounttypes/");
    refTypes.push({ name: 'Checking', icon: '0' });
    refTypes.push({ name: 'Savings', icon: '0' });
    refTypes.push({ name: 'Credit Card', icon: '0' });
    refTypes.push({ name: 'Debit Card', icon: '0' });
    refTypes.push({ name: 'Investment', icon: '0' });
    refTypes.push({ name: 'Brokerage', icon: '0' });

    // Save default categories
    var refCatIncome = this.housedata.child(key + "/membercategories/Income");
    refCatIncome.push({ categoryname: 'Income', categoryparent: '', categorysort: 'Income', categorytype: 'Income' });
    refCatIncome.push({ categoryname: 'Beginning Balance', categoryparent: 'Income', categorysort: 'Income:Beginning Balance', categorytype: 'Income' });

    var refCatExpense = this.housedata.child(key + "/membercategories/Expense");
    refCatExpense.push({ categoryname: 'Auto', categoryparent: '', categorysort: 'Auto', categorytype: 'Expense' });
    refCatExpense.push({ categoryname: 'Gasoline', categoryparent: 'Auto', categorysort: 'Auto:Gas', categorytype: 'Expense' });
    refCatExpense.push({ categoryname: 'Car Payment', categoryparent: 'Auto', categorysort: 'Auto:Car Payment', categorytype: 'Expense' });

    // Save default Payees
    var refPayee = this.housedata.child(key + "/memberpayees");
    refPayee.push({ lastamount: '', lastcategory: '', lastcategoryid: '', payeename: 'Beginning Balance' });
  }

  RandomHouseCode() {
      return Math.floor((Math.random() * 100000000) + 100);
  }
  
}