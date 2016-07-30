import {Component, Injectable} from '@angular/core';
import {NavController} from 'ionic-angular';
import {UserData} from '../../../providers/user-data';
import {AboutPage} from '../../../pages/about/about';
import {PersonalProfilePage} from '../../myinfo/personalprofile/personalprofile';
import {AccountsTransactionsPage} from '../../mysettings/accountstransactions/accountstransactions';
import {AccountTypesPage} from '../../mysettings/accounttypes/accounttypes';
import {SecurityPage} from '../../mysettings/security/security';

interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@Component({
  templateUrl: 'build/pages/mysettings/settings/settings.html'
})
export class SettingsPage {
  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  settingsPages: PageObj[] = [
    { title: 'Personal Profile', component: PersonalProfilePage, icon: 'ios-contact-outline' },
      { title: 'Accounts and Transactions', component: AccountsTransactionsPage, icon: 'ios-construct-outline' },
      { title: 'Accounts Types', component: AccountTypesPage, icon: 'ios-list-box-outline' },
      { title: 'Security', component: SecurityPage, icon: 'ios-lock-outline' },
      { title: 'Report a Bug', component: '', icon: 'ios-bug-outline' },
      { title: 'Suggest a Feature', component: '', icon: 'ios-bulb-outline' },
      { title: 'Write a Review', component: '', icon: 'ios-heart-outline' },
      { title: 'Contact Support', component: '', icon: 'ios-help-circle-outline' },
      { title: 'About', component: AboutPage, icon: 'ios-pin-outline' }
  ];
  
  constructor(private nav: NavController) {    
  }
  
  openPage(page: PageObj) {
    this.nav.push(page.component);
  }
  
}