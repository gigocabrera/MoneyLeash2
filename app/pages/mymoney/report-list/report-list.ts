import {Page, NavController, MenuController, Alert} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/mymoney/report-list/report-list.html'
})

export class ReportListPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(
      private nav: NavController) {}
      
  private openAbout(): void {
    //this.nav.push(AboutPage);
    //console.log(this.auth.authenticated);
  }
  
}