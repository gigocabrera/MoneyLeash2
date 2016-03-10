import {App, IonicApp, Events} from 'ionic-angular';
import {ConferenceData} from './providers/conference-data';
import {UserData} from './providers/user-data';
import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';
import {SignupPage} from './pages/signup/signup';
import {TutorialPage} from './pages/tutorial/tutorial';
import {MyInfoPage} from './pages/myinfo/myinfo';
import {SettingsPage} from './pages/settings/settings';
import {LogoutPage} from './pages/logout/logout';

interface PageObj {
  title: string;
  component: any;
  icon: string;
  color: string;
  index?: number;
}

@App({
  templateUrl: 'build/app.html',
  providers: [ConferenceData, UserData],
  config: {
    platforms: {
      android: {
        tabbarLayout: 'icon-hide'
      }
    }
  }
})
class ConferenceApp {
  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageObj[] = [
    { title: 'Accounts', component: MyInfoPage, icon: 'ios-browsers-outline', color: '#f53d3d', },
    { title: 'Categories', component: MyInfoPage, icon: 'ios-attach-outline', color: '', },
    { title: 'Budgets', component: MyInfoPage, icon: 'ios-color-wand-outline', color: '', },
    { title: 'Recurring', component: MyInfoPage, icon: 'ios-sync-outline', color: '', },
    { title: 'Payees', component: MyInfoPage, icon: 'ios-contacts-outline', color: '', },
    { title: 'Reports', component: MyInfoPage, icon: 'ios-trending-up-outline', color: '', },
    { title: 'Settings', component: SettingsPage, icon: 'ios-settings-outline', color: '', },
  ];
  loggedInPages: PageObj[] = [
    { title: 'Logout', component: LogoutPage, icon: 'log-out', color: '#f53d3d', }
  ];
  loggedOutPages: PageObj[] = [
    { title: 'Login', component: LoginPage, icon: 'log-in', color: '', },
    { title: 'Signup', component: SignupPage, icon: 'person-add', color: '', }
  ];
  rootPage: any = TutorialPage;
  loggedIn = false;

  constructor(
    private app: IonicApp,
    private events: Events,
    private userData: UserData,
    confData: ConferenceData
  ) {
    // load the conference data
    confData.load();

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.loggedIn = (hasLoggedIn == 'true');
    });

    this.listenToLoginEvents();
  }

  openPage(page: PageObj) {
    // find the nav component and set what the root page should be
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    let nav = this.app.getComponent('nav');

    if (page.index) {
      nav.setRoot(page.component, {tabIndex: page.index});
    } else {
      nav.setRoot(page.component);
    }

    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
        //console.log(this.loggedIn);
      }, 1000);      
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.loggedIn = true;
    });

    this.events.subscribe('user:signup', () => {
      this.loggedIn = true;
    });

    this.events.subscribe('user:logout', () => {
      this.loggedIn = false;
    });
  }
}
