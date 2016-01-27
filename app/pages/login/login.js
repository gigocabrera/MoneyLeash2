import {IonicApp, Page, NavController} from 'ionic/ionic';
import {TabsPage} from '../tabs/tabs';
import {SignupPage} from '../signup/signup';
import {UserData} from '../../providers/user-data';


@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {    
  constructor(nav: NavController, userData: UserData) {
    this.nav = nav;
    this.userData = userData;
    this.login = {};
    this.submitted = false;
    
    this.firebaseUrl = "https://brilliant-inferno-1044.firebaseio.com";
    this.authHandler();
    
  }

  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login();
      //this.nav.push(TabsPage);
      
      /* Authenticate User */ 
      var ref = new Firebase(this.firebaseUrl);
      ref.authWithPassword({
        email    : form.controls.username.value,
        password : form.controls.password.value
      }, this.authHandler);
      
    }
  }

  onSignup() {
    this.nav.push(SignupPage);
  }
  
  authHandler(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }

}
