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
      /* Authenticate User with Firebase */
      var ref = this.userData.firebaseRef();
      ref.authWithPassword({
        email    : form.controls.username.value,
        password : form.controls.password.value
      }, this.authHandler);
    }
  }
  
  authHandler(error, authData) {
    if (error) {
        console.log("Login Failed!", error);
        let alert = Alert.create({
          title: 'Login Failed!',
          subTitle: error,
          buttons: ['Ok']
        });
        this.nav.present(alert);
    } else {
        console.log(authData);
        this.nav.push(TabsPage);
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
