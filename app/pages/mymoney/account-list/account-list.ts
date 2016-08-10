import {Component} from '@angular/core';
import {NavController, MenuController, Alert} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/mymoney/account-list/account-list.html'
})

export class AccountListPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(
      public nav: NavController) {}
      
  private openAbout(): void {
    //this.nav.push(AboutPage);
    //console.log(this.auth.authenticated);
  }
  
}