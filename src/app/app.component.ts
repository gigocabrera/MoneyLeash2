import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, TouchID } from 'ionic-native';

// intro and login pages
import { TutorialPage } from '../pages/tutorial/tutorial';
import { LoginAutoPage } from '../pages/loginauto/loginauto';
import { LogoutPage } from '../pages/logout/logout';

// app pages
import {AccountListPage } from '../pages/mymoney/account-list/account-list';
import {CategoryListPage } from '../pages/mymoney/category-list/category-list';
import {BudgetListPage } from '../pages/mymoney/budget-list/budget-list';
import {RecurringListPage } from '../pages/mymoney/recurring-list/recurring-list';
import {PayeeListPage } from '../pages/mymoney/payee-list/payee-list';
import {ReportListPage } from '../pages/mymoney/report-list/report-list';
import {SettingsPage } from '../pages/mysettings/settings/settings';

// services
import { UserData } from '../providers/user-data';

// firebase
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MoneyLeashApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TutorialPage;

  pages: Array<{title: string, component: any, icon: string, color: string}>;
  logoutpages: Array<{title: string, component: any, icon: string, color: string}>;

  constructor(
    public platform: Platform,
    public userData: UserData) {
    
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Accounts', component: AccountListPage, icon: 'ios-browsers-outline', color: '', },
      { title: 'Budgets', component: BudgetListPage, icon: 'ios-color-wand-outline', color: '', },
      { title: 'Categories', component: CategoryListPage, icon: 'ios-attach-outline', color: '', },
      { title: 'Payees', component: PayeeListPage, icon: 'ios-contacts-outline', color: '', },
      { title: 'Recurring', component: RecurringListPage, icon: 'ios-sync-outline', color: '', },
      { title: 'Reports', component: ReportListPage, icon: 'ios-trending-up-outline', color: '', },
      { title: 'Settings', component: SettingsPage, icon: 'ios-settings-outline', color: '', },
    ];
    this.logoutpages = [
      { title: 'Logout', component: LogoutPage, icon: 'md-log-out', color: '#f53d3d', }
    ];

  }

  initializeApp() {

    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      StatusBar.styleLightContent();
      Splashscreen.hide();
      //
      // Check if TouchID has been selected
      if (this.userData.enabletouchid === 'true') {
        //
        // Check if TouchID is supported
        TouchID.isAvailable()
        .then(
          res => {
            TouchID.verifyFingerprint('Scan your fingerprint please')
            .then(
              res => {
                this.nav.setRoot(LoginAutoPage);
              },
              err => {console.error('Error', err)}
            );
          },
          err => {
            console.error('TouchID is not available', err)
          }
        );
      } else {
        console.log('TouchID setting is NOT enabled!');
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.userData.logout();
    this.nav.setRoot(LogoutPage);
  }

}
