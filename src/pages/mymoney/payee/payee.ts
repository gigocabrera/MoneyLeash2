import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../../providers/auth-service';

@Component({
  templateUrl: 'payee.html'
})

export class PayeePage {

  title: string;
  listheader: string;
  validationMessage: string;
  showValidationMessage: boolean = false;
  mode: string = '';
  key: string = '';
  payee: {payeename: string, payeesort: string} = {
    payeename: '',
    payeesort: ''
  }

  constructor(
      public nav: NavController,
      public navParams: NavParams,
      public auth: AuthService) {

    this.key = navParams.get('key');
    if (this.key === '0') {
      this.title = 'Create Payee';
      this.listheader = 'Enter Payee Details';
      this.mode = "New";
    } else {
      this.title = 'Edit Payee';
      this.listheader = 'Edit Payee Details';
      this.auth.getPayee(this.key).once('value').then(snapshot => {
        this.payee = snapshot.val();
        this.title = "Edit " + ' ' + this.payee.payeename;
        this.mode = "Edit";
      });
    }
    
  }

  save() {

    // Validate form before saving
    if (!this.isValidName()) {
      return;
    }

    // Handle category sort
    this.payee.payeesort = this.payee.payeename.toLowerCase();

    // Save category 
    if (this.mode === 'New') {
      this.auth.addPayee(this.payee);
    } else {
      this.auth.updatePayee(this.payee, this.key);
    }
    this.nav.pop();
  }

  isValidName(): boolean {
    if (this.payee.payeename === '') {
      this.showValidationMessage = true;
      this.validationMessage = "Please enter a payee name";
      return false;
    } else {
      this.showValidationMessage = false;
      this.validationMessage = '';
      return true;
    }
  }
  
}