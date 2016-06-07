import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Injectable} from '@angular/core';
import {UserData} from '../../providers/user-data';
import {TabsPage} from '../tabs/tabs';
import {PersonalProfilePage} from '../myinfo/personalprofile/personalprofile';
import {AccountsTransactionsPage} from '../mysettings/accountstransactions/accountstransactions';
import {SecurityPage} from '../mysettings/security/security';
import {AccountPage} from '../../pages/account/account';

interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@Component({
  templateUrl: 'build/pages/settings/settings.html'
})
export class SettingsPage {
  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  settingsPages: PageObj[] = [
    { title: 'Personal Profile', component: PersonalProfilePage, icon: 'ios-contact-outline' },
      { title: 'Accounts / Transactions', component: AccountsTransactionsPage, icon: 'ios-construct-outline' },
      { title: 'Security', component: SecurityPage, icon: 'ios-lock-outline' },
      { title: 'Report a Bug', component: PersonalProfilePage, icon: 'ios-bug-outline' },
      { title: 'Suggest a Feature', component: PersonalProfilePage, icon: 'ios-bulb-outline' },
      { title: 'Write a Review', component: PersonalProfilePage, icon: 'ios-heart-outline' },
      { title: 'Contact Support', component: PersonalProfilePage, icon: 'ios-help-circle-outline' },
      { title: 'About', component: TabsPage, icon: 'ios-pin-outline' },
      { title: 'Account', component: AccountPage, icon: 'ios-pin-outline' }
  ];
  
  constructor(private nav: NavController) {    
  }
  
  openPage(page: PageObj) {
    this.nav.push(page.component);
  }
  
}