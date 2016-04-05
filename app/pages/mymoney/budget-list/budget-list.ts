import {Page, NavController, MenuController, Alert} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/mymoney/budget-list/budget-list.html'
})

export class BudgetListPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(
      private nav: NavController) {}
      
  private openAbout(): void {
    //this.nav.push(AboutPage);
    //console.log(this.auth.authenticated);
  }
  
}