import { Component, ViewChild } from '@angular/core';

// ionic
import { Events, Platform, Nav, MenuController } from 'ionic-angular';
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

declare var touchid: any;

export interface PageObj {
  title: string;
  component: any;
  icon: string;
  color: string;
  index?: number;
}

@Component({
  templateUrl: 'app.template.html'
})
export class MoneyLeashApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageObj[] = [
    { title: 'Accounts', component: AccountListPage, icon: 'ios-browsers-outline', color: '', },
    { title: 'Budgets', component: BudgetListPage, icon: 'ios-color-wand-outline', color: '', },
    { title: 'Categories', component: CategoryListPage, icon: 'ios-attach-outline', color: '', },
    { title: 'Payees', component: PayeeListPage, icon: 'ios-contacts-outline', color: '', },
    { title: 'Recurring', component: RecurringListPage, icon: 'ios-sync-outline', color: '', },
    { title: 'Reports', component: ReportListPage, icon: 'ios-trending-up-outline', color: '', },
    { title: 'Settings', component: SettingsPage, icon: 'ios-settings-outline', color: '', },
  ];
  logoutPage: PageObj[] = [
    { title: 'Logout', component: LogoutPage, icon: 'md-log-out', color: '#f53d3d', }
  ];
  rootPage: any = TutorialPage;
  
  // variables
  enabletouchid = '';

  constructor( 
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    platform: Platform
  ) {
    // Call any initial plugins when ready
    platform.ready().then(() => {
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
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});
    } else {
      this.nav.setRoot(page.component);
    }

    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.signOut();
      }, 1000);
    }
  }
  
   signOut(): void {
    //this.fireAuth.signOut();
    this.nav.setRoot(LogoutPage);
  } 
}