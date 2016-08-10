import {Component, Injectable} from '@angular/core';
import {NavController} from 'ionic-angular';
import {UserData} from '../../../providers/user-data';
import {AboutPage} from '../../../pages/about/about';
import {PersonalProfilePage} from '../../myinfo/personalprofile/personalprofile';
import {AccountsTransactionsPage} from '../../mysettings/accountstransactions/accountstransactions';
import {AccountTypesPage} from '../../mysettings/accounttypes/accounttypes';
import {SecurityPage} from '../../mysettings/security/security';

@Component({
  templateUrl: 'build/pages/mysettings/settings/settings.html'
})
export class SettingsPage {

  pages: Array<{title: string, component: any, icon: string}>;
  
  constructor(public nav: NavController) {

    // List of pages that can be navigated to from the left menu
    // the left menu only works after login
    // the login page disables the left menu
    this.pages = [
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

  }
  
  openPersonalProfile() {
    this.nav.push(PersonalProfilePage);
  }
  
}