import {IonicApp, Page, NavController, MenuController, Alert} from 'ionic/ionic';
import {TabsPage} from '../tabs/tabs';
import {SignupPage} from '../signup/signup';
import {UserData} from '../../providers/user-data';

@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  constructor(nav: NavController, userData: UserData, menu: MenuController) {
    this.nav = nav;
    this.userData = userData;
    this.login = {};
    this.submitted = false;
    this.menu = menu;
  }

  onLogin(form) {
    this.submitted = true;
    if (form.valid) {
        this.userData.login();
        // Authenticate with Firebase
        var ref = this.userData.firebaseRef();
        ref.authWithPassword({
          "email"     : form.controls.username.value,
          "password"  : form.controls.password.value
        }, (error, authData) => {
        if (error) {            
            let alert = Alert.create({
              title: 'Login Failed',
              subTitle: 'Please check your username and/or password and try again',
              buttons: ['Ok']
            });
            this.nav.present(alert);
        } else {
            //console.log("Authenticated successfully with payload:", authData);
            this.nav.push(TabsPage);
        }
      });
    }
  }
  
  onSignup() {
    console.log("testing signup");
    this.nav.push(SignupPage);
  }
  
  onPageDidEnter() {
    // the left menu should be disabled on the tutorial page
    this.menu.enable(false);
    this.menu.swipeEnable(false);
  }

  onPageDidLeave() {
    // enable the left menu when leaving the tutorial page
    this.menu.enable(true);
    this.menu.swipeEnable(true);
  }
  
}
