import {ViewChild} from 'angular2/core';
import {App, Events, Platform, Nav, MenuController} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

/* Original ionic-conference-app pages */
import {ConferenceData} from './providers/conference-data';
import {UserData} from './providers/user-data';
import {TabsPage} from './pages/tabs/tabs';

/* Intro and Login pages */
import {TutorialPage} from './pages/tutorial/tutorial';
import {LoginPage} from './pages/login/login';
import {SignupPage} from './pages/signup/signup';
import {LogoutPage} from './pages/logout/logout';

/* My Money pages */
import {AccountListPage} from './pages/mymoney/account-list/account-list';
import {CategoryListPage} from './pages/mymoney/category-list/category-list';
import {BudgetListPage} from './pages/mymoney/budget-list/budget-list';
import {RecurringListPage} from './pages/mymoney/recurring-list/recurring-list';
import {PayeeListPage} from './pages/mymoney/payee-list/payee-list';
import {ReportListPage} from './pages/mymoney/report-list/report-list';

/* Settings pages */
import {SettingsPage} from './pages/settings/settings';

/* Firebase providers */
import {AuthProvider} from './providers/auth-provider';
import {AuthService} from './providers/auth-service';

interface PageObj {
  title: string;
  component: any;
  icon: string;
  color: string;
  index?: number;
}

@App({
  templateUrl: 'build/app.html',
  providers: [
    ConferenceData, 
    UserData,
    AuthProvider
  ],
  // Set any config for your app here, see the docs for
  // more ways to configure your app:
  // http://ionicframework.com/docs/v2/api/config/Config/
  config: {
    // Place the tabs on the bottom for all platforms
    // See the theming docs for the default values:
    // http://ionicframework.com/docs/v2/theming/platform-specific-styles/
    tabbarPlacement: "bottom"
  }
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

  constructor(
    private events: Events,
    private userData: UserData,
    private auth: AuthService,
    private menu: MenuController,
    platform: Platform,
    confData: ConferenceData
  ) {
    // Call any initial plugins when ready
    platform.ready().then(() => {
      StatusBar.styleLightContent();
      Splashscreen.hide();
    });

    // load the conference data
    confData.load();

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn == 'true');
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
      this.nav.setRoot(page.component, {}, {animate: true, direction: 'forward'});
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
    this.menu.enable(loggedIn, "loggedInMenu");
    this.menu.enable(!loggedIn, "loggedOutMenu");
  }
  
   signOut(): void {
    this.auth.signOut();
  }
  
}