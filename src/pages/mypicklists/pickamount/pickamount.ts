import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

// services
import { UserData } from '../../../providers/user-data';
import { TransactionData } from '../../../providers/transaction-data';

@Component({
  selector: 'page-pickamount',
  templateUrl: 'pickamount.html'
})

export class PickAmountPage {
  
  transaction;
  displayValue = 0;
  clearValue;
  periodEntered: boolean = false;
  decimals = 0;
   
  constructor(
      public nav: NavController,
      public userData: UserData,
      public transactionData: TransactionData) {}

  ionViewDidLoad() {

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

  digitClicked(digit) {

    switch (digit) {
      case 'C': {
        this.displayValue = 0;
        this.clearValue = true;
        this.periodEntered = false;
        this.decimals = 0;
        break;
      }
      case '.': {
        this.periodEntered = true;
        this.displayValue = this.displayValue + digit;
        break;
      }
      case 'B': {
        let amt = this.displayValue.toString();
        this.displayValue = parseFloat(amt.substring(0, amt.length - 1));
        this.clearValue = false;
        if (this.periodEntered) {
          this.decimals--;
        }
        break;
      }
      case 'D': {
        this.transactionData.setAmount(this.displayValue.toString());
        this.goBack();
        break;
      }
      default: {
        if (this.periodEntered && this.decimals < 2) {
          this.displayValue = this.displayValue + digit;
          this.decimals++;
        } else {
          if (this.displayValue === 0) {
            this.displayValue = digit;
          } else {
            this.displayValue = this.displayValue + digit;
          }
        }
      }
    }
  }

}