import {Component} from '@angular/core';
import {NavController, MenuController, Alert} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/mymoney/budget-list/budget-list.html'
})

export class BudgetListPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(
      public nav: NavController) {}
      
  private openAbout(): void {
    //this.nav.push(AboutPage);
    //console.log(this.auth.authenticated);
  }
  
}