import {App, IonicApp, Page, Events} from 'ionic-angular';
import {Inject} from 'angular2/core';
import {UserData} from '../../providers/user-data';
import {MyInfoPage} from '../myinfo/myinfo';

interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@Page({
  templateUrl: 'build/pages/settings/settings.html'
})
export class SettingsPage {
  
  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  settingsPages: PageObj[] = [
    { title: 'My Info', component: MyInfoPage, icon: 'ios-contact-outline' },
      { title: 'Accounts / Transactions', component: MyInfoPage, icon: 'ios-construct-outline' },
      { title: 'Security', component: MyInfoPage, icon: 'ios-lock-outline' },
      { title: 'Report a Bug', component: MyInfoPage, icon: 'ios-bug-outline' },
      { title: 'Suggest a Feature', component: MyInfoPage, icon: 'ios-bulb-outline' },
      { title: 'Write a Review', component: MyInfoPage, icon: 'ios-heart-outline' },
      { title: 'Contact Support', component: MyInfoPage, icon: 'ios-help-circle-outline' },
      { title: 'About', component: MyInfoPage, icon: 'ios-pin-outline' }
  ];
  
  constructor(
    private app: IonicApp,
    private events: Events
  ) {
    
  }
  
  openPage(page: PageObj) {
    let nav = this.app.getComponent('nav');
    nav.push(page.component);
  }
  
}