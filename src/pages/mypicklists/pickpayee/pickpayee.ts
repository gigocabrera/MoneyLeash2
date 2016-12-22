import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

// services
import { UserData } from '../../../providers/user-data';
import { TransactionData } from '../../../providers/transaction-data';

@Component({
  templateUrl: 'pickpayee.html'
})

export class PickPayeePage {
  
  searchTerm: string = '';
  transaction;
  payeeList: any;
  loadedPayeeList: any;
   
  constructor(
      public nav: NavController,
      public userData: UserData,
      public transactionData: TransactionData) {}

  ionViewDidLoad() {
    this.userData.getAllPayees().on('value', (payees) => {
      let arrpayees = [];
      payees.forEach( spanshot => {
        let payee = spanshot.val();
        let tempPayee = ({
          $key: spanshot.key,
          payeename: payee.payeename
        });
        arrpayees.push(tempPayee);
      });
      this.payeeList = arrpayees;
      this.loadedPayeeList = arrpayees;
      if (this.transactionData.getPayeeName() != '') {
        this.searchTerm = this.transactionData.getPayeeName();
        this.doFilterList(this.searchTerm);
      }
      this.userData.LoadingControllerDismiss();
    });
  }

  initializeItems(){
    this.payeeList = this.loadedPayeeList;
  }

  getItems(searchbar) {
    
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;

    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.doFilterList(q);
  }

  doFilterList (q) {
    this.payeeList = this.payeeList.filter((v) => {
      if(v.payeename && q) {
        if (v.payeename.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  selectPayee(payee) {
    this.transactionData.setReferrer('PickPayeePage');
    this.transactionData.setPayeeName(payee.payeename);
    this.transactionData.setPayeeID(payee.$key);
    this.goBack();
  }

  goBack() {
    this.nav.pop();
  }

  savePayee() {
    console.log('saving new payee');
  }

}