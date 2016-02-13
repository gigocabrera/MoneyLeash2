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
  }

  onLogin(form) {
    //console.log(this.userData.firebaseUrl);
    this.submitted = true;
    if (form.valid) {
      this.userData.login();
      
      /* Authenticate User */
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
    } else {
        //this.nav.push(TabsPage);
        console.log(authData);
    }
  }
  
  onSignup() {
    //this.nav.push(SignupPage);
    console.log("testing signup");
  }
}
