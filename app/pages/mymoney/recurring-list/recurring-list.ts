import {Component} from '@angular/core';
import {NavController, MenuController, Alert} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/mymoney/recurring-list/recurring-list.html'
})

export class RecurringListPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(
      private nav: NavController) {}
      
  private openAbout(): void {
    //this.nav.push(AboutPage);
    //console.log(this.auth.authenticated);
  }
  
}