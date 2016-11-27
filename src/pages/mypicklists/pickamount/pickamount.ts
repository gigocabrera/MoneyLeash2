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
    let amtDisplay = parseFloat(this.transactionData.getAmount());
    if (amtDisplay.toString() === 'NaN' || amtDisplay.toString() === '0') {
      this.reset();
    } else {
      this.periodEntered = true;
      this.decimals = 2;
      this.displayValue = amtDisplay; 
    }
  }

  goBack() {
    this.nav.pop();
  }

  digitClicked(digit) {
    switch (digit) {
      case 'C': {
        this.reset();
        break;
      }
      case '.': {
        this.periodEntered = true;
        this.displayValue = this.displayValue + digit;
        break;
      }
      case 'B': {
        let amt = this.displayValue.toString();
        let amtDisplay = parseFloat(amt.substring(0, amt.length - 1));
        if (amtDisplay.toString() === 'NaN') {
          this.reset();
        } else {
          this.displayValue = amtDisplay;
        }
        this.clearValue = false;
        if (this.periodEntered) {
          this.decimals--;
        }
        break;
      }
      case 'D': {
        // User selected Done.
        let amt = Number(this.displayValue).toFixed(2);
        this.transactionData.setReferrer('PickAmountPage');
        this.transactionData.setAmount(amt.toString());
        this.goBack();
        break;
      }
      default: {
        if (this.periodEntered) {
          if (this.decimals < 2) {
            this.displayValue = this.displayValue + digit;
            this.decimals++;
          }
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

  reset() {
    this.displayValue = 0;
    this.clearValue = true;
    this.periodEntered = false;
    this.decimals = 0;
  }

}