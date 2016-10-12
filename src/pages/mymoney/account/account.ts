import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})

export class AccountPage {

  accountname: string = '';
  accountbegindate?: string;
  accounttype?: string;

  constructor(
      public nav: NavController) {}

  ionViewDidLoad() {
    
  }

  save() {
    
  }
  
}