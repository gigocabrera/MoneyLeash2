import { Component, ViewChild } from '@angular/core';

import { Platform, Nav, AlertController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import {Deploy} from '@ionic/cloud-angular';

import { StatusBar, Splashscreen, TouchID } from 'ionic-native';

import { TranslateService } from 'ng2-translate/ng2-translate';

// services
import { AuthService } from '../providers/auth-service';

// intro and login pages
import { FirstRunPage } from '../pages/pages';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { LoginAutoPage } from '../pages/loginauto/loginauto';
import { LogoutPage } from '../pages/logout/logout';

// app pages
import { AccountListPage } from '../pages/mymoney/account-list/account-list';
import { CategoryListPage } from '../pages/mymoney/category-list/category-list';
import { BudgetListPage } from '../pages/mymoney/budget-list/budget-list';
import { RecurringListPage } from '../pages/mymoney/recurring-list/recurring-list';
import { PayeeListPage } from '../pages/mymoney/payee-list/payee-list';
import { ReportListPage } from '../pages/mymoney/report-list/report-list';
import { SettingsPage } from '../pages/mysettings/settings/settings';

@Component({
  templateUrl: 'app.html'
})

export class MoneyLeashApp {
  
  rootPage = FirstRunPage;
  isTouchId: boolean = false;
  pages: Array<{title: string, component: any, icon: string, color: string, showloader: boolean}>;
  logoutpages: Array<{title: string, component: any, icon: string, color: string}>;

  @ViewChild(Nav) nav: Nav;

  constructor(
    translate: TranslateService, 
    platform: Platform,
    public deploy: Deploy,
    public alertCtrl: AlertController,
    public storage: Storage,
    public auth: AuthService) {

    // Set the default language for translation strings, and the current language
    translate.setDefaultLang('en');
    translate.use('en')

    // App menu navigation
    this.pages = [
      { title: 'Accounts', component: AccountListPage, icon: 'ios-browsers-outline', color: '', showloader: false },
      { title: 'Budgets', component: BudgetListPage, icon: 'ios-color-wand-outline', color: '', showloader: false  },
      { title: 'Categories', component: CategoryListPage, icon: 'ios-attach-outline', color: '', showloader: true  },
      { title: 'Payees', component: PayeeListPage, icon: 'ios-contacts-outline', color: '', showloader: true  },
      { title: 'Recurring', component: RecurringListPage, icon: 'ios-sync-outline', color: '', showloader: false  },
      { title: 'Reports', component: ReportListPage, icon: 'ios-trending-up-outline', color: '', showloader: false  },
      { title: 'Settings', component: SettingsPage, icon: 'ios-settings-outline', color: '', showloader: false  },
    ];
    this.logoutpages = [
      { title: 'Logout', component: LogoutPage, icon: 'md-log-out', color: '#f53d3d', }
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleLightContent();
      Splashscreen.hide();

      // Get local storage saved settings
      storage.ready().then(() => {
        this.storage.get('option1').then( touchid => {
          this.isTouchId = touchid;
          if (this.isTouchId) {
            console.log('try touchid');
            this.signInWithTouchID();
          } else {
            console.log('touchid not enabled');
          }
        })      
      });
    });

  }

  signInWithTouchID() {
    //
    // Check if TouchID is supported
    console.log('signin touchid');
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
    // testing
    // this.nav.setRoot(LoginAutoPage);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    let alert = this.alertCtrl.create({
      title: 'Sign Out',
      message: 'Are you sure you want to sign out?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            //console.log('Cancel RemoveUser clicked');
          }
        },
        {
          text: 'Sign Out',
          handler: () => {
            try {
              this.auth.signOut();
            } catch(error){
              console.log(error);
            }            
            this.nav.setRoot(FirstRunPage, {}, {animate: true, direction: 'forward'});
          }
        }
      ]
    });
    alert.present();
  }
  
}
