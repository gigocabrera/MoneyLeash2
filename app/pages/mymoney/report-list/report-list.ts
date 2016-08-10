import {Component} from '@angular/core';
import {NavController, MenuController, Alert} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/mymoney/report-list/report-list.html'
})

export class ReportListPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(
      public nav: NavController) {}
      
  private openAbout(): void {
    //this.nav.push(AboutPage);
    //console.log(this.auth.authenticated);
  }
  
}