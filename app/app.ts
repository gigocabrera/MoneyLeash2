import {Component, ViewChild, NgZone} from '@angular/core';
import {ionicBootstrap, Events, Platform, Nav, MenuController, Alert} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

// Data
import {UserData} from './providers/user-data';

// Intro and Login pages
import {TutorialPage} from './pages/tutorial/tutorial';
import {LoginPage} from './pages/login/login';
import {LoginAutoPage} from './pages/loginauto/loginauto';
import {SignupPage} from './pages/signup/signup';
import {LogoutPage} from './pages/logout/logout';

// My Money pages
import {AccountListPage} from './pages/mymoney/account-list/account-list';
import {CategoryListPage} from './pages/mymoney/category-list/category-list';
import {BudgetListPage} from './pages/mymoney/budget-list/budget-list';
import {RecurringListPage} from './pages/mymoney/recurring-list/recurring-list';
import {PayeeListPage} from './pages/mymoney/payee-list/payee-list';
import {ReportListPage} from './pages/mymoney/report-list/report-list';

// Settings pages
import {SettingsPage} from './pages/mysettings/settings/settings';

// Firebase service
import {FirebaseService} from './providers/firebaseService';

declare var touchid: any;

interface PageObj {
  title: string;
  component: any;
  icon: string;
  color: string;
  index?: number;
}

@Component({
  templateUrl: 'build/app.html',
  providers:[FirebaseService],
})

class MoneyLeashApp {

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
  loggedInPages: PageObj[] = [
    { title: 'Logout', component: LogoutPage, icon: 'log-out', color: '#f53d3d', }
  ];
  loggedOutPages: PageObj[] = [
    { title: 'Login', component: LoginPage, icon: 'log-in', color: '', },
    { title: 'Signup', component: SignupPage, icon: 'person-add', color: '', }
  ];
  
  // Default root page
  rootPage: any = TutorialPage;
  loggedIn = false;
  enabletouchid = '';

  constructor(
    private ngZone: NgZone, 
    private events: Events,
    private userData: UserData,
    private menu: MenuController,
    platform: Platform
  ) {

    /*this.userData.getEnableTouchIDStorage().then((touchid) => {
      this.enabletouchid = touchid;
    });*/

    // Call any initial plugins when ready
    platform.ready().then(() => {
      StatusBar.styleLightContent();
      Splashscreen.hide();
      //
      // Check if TouchID has been selected
      if (this.userData.enabletouchid === 'true') {
        //
        // Check if TouchID is supported
        touchid.checkSupport(() => {
          touchid.authenticate((result) => {
              ngZone.run(() => {
                  this.nav.setRoot(LoginAutoPage);
              });
          }, (error) => {
              this.nav.present(Alert.create({
                  title: "Attention!",
                  subTitle: error,
                  buttons: ["Close"]
              }));
          }, "Please Authenticate");
        }, (error) => {
          this.nav.present(Alert.create({
              title: "Attention!",
              subTitle: "Touch ID is not supported",
              buttons: ["Close"]
          }));
        });
      } else {
        console.log('TouchID is NOT enabled!');
      }
    });

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === 'true');
    });
    this.listenToLoginEvents();
  }

  openPage(page: PageObj) {
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
        this.userData.logout();
      }, 1000);
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }
  
   signOut(): void {
    //this.auth.signOut();
  } 
}

// Pass the main App component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument, see the docs for
// more ways to configure your app:
// http://ionicframework.com/docs/v2/api/config/Config/
// Place the tabs on the bottom for all platforms
// See the theming docs for the default values:
// http://ionicframework.com/docs/v2/theming/platform-specific-styles/

ionicBootstrap(MoneyLeashApp, [UserData], {
  tabbarPlacement: 'bottom'
});