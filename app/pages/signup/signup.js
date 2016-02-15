import {Page, NavController} from 'ionic/ionic';
import {TabsPage} from '../tabs/tabs';
import {UserData} from '../../providers/user-data';
import {Storage, LocalStorage, Events} from 'ionic/ionic';

@Page({
  templateUrl: 'build/pages/signup/signup.html'
})
export class SignupPage {
  constructor(nav: NavController, userData: UserData) {
    this.nav = nav;
    this.userData = userData;
    this.signup = {};
    this.submitted = false;
    
    this.storage = new Storage(LocalStorage);
    this.usernamesaved = '';
  }

  onSignup(form) {
    
    this.storage.get("username").then((value) => {
        this.usernamesaved = ("value", JSON.parse(value));
        console.log(this.usernamesaved);
    })
    
    //this.submitted = true;

    //console.log(form);

    //if (form.valid) {
    //  this.userData.signup();
    //  this.nav.push(TabsPage);
    //}
  }
}
