import {Component} from '@angular/core';
import {NavController, MenuController, Alert} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/mymoney/payee-list/payee-list.html'
})

export class PayeeListPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(
      private nav: NavController) {}
      
  private openAbout(): void {
    //this.nav.push(AboutPage);
    //console.log(this.auth.authenticated);
  }
  
}